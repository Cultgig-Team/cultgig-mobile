import {
  APPWRITE_CONFIG,
  client,
  databases,
  ID,
  Query,
  storage,
} from "@/services/appwrite";
import * as FileSystem from "expo-file-system/legacy";
import {
  ConversationDocument,
  MessageDocument,
  SendMessagePayload,
  UserProfileDocument,
} from "@/types/chat-type";

export function chatUtilityFunc() {
  async function getConversation(
    userId: string,
  ): Promise<ConversationDocument[]> {
    const queries = [
      Query.contains("participant_ids", userId),
      Query.orderDesc("last_message_at"),
      Query.limit(50),
    ];
    //@ts-ignore - Appwrite SDK 0.34.0 codegen warning
    const response = await databases.listDocuments<ConversationDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
      queries,
    );
    const conversation = response.documents;
    const userIdSet = new Set<string>();
    conversation.forEach((conv) =>
      conv.participant_ids.forEach((id) => userIdSet.add(id)),
    );

    const userRecord = await databases.listDocuments<UserProfileDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.USERS_COLLECTION_ID,
      [Query.equal("$id", Array.from(userIdSet))],
    );

    const userDocs = userRecord.documents;
    const userMap = new Map<string, UserProfileDocument>();
    userDocs.forEach((user) => userMap.set(user.$id, user));
    return conversation.map((item) => ({
      ...item,
      participants: item.participant_ids
        .map((id) => userMap.get(id))
        .filter(Boolean),
    })) as ConversationDocument[];
  }

  async function isChatExistingOrNew(targetUser: string, currentUser: string) {
    const userConversation =
      await databases.listDocuments<ConversationDocument>(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
        [Query.contains("participant_ids", currentUser)],
      );
    const doesChatExists = userConversation.documents.find((conv) => {
      const participantsIds = conv.participant_ids || [];
      return participantsIds.includes(targetUser);
    });
    if (doesChatExists) return doesChatExists;
    const newChat = await databases.createDocument<ConversationDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
      ID.unique(),
      {
        participants: [currentUser, targetUser],
        participant_ids: [currentUser, targetUser],
        last_message: null,
        last_message_at: new Date().toISOString(),
        unread_by: [],
        cleared_at: null,
      },
    );
    const populatedChat = await databases.getDocument<ConversationDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
      newChat.$id,
    );
    return populatedChat;
  }

  function getChatPartner(
    conversation: ConversationDocument,
    currentUserId: string,
  ): UserProfileDocument | undefined {
    if (!Array.isArray(conversation.participants)) return;
    return conversation.participants.find(
      (item): item is UserProfileDocument =>
        typeof item !== "string" && item.$id !== currentUserId,
    );
  }

  async function getMessages(
    conversationId: string,
    limit = 30,
    cursor?: string,
  ): Promise<MessageDocument[]> {
    const queries = [
      Query.equal("conversation_id", conversationId),
      Query.orderDesc("$createdAt"),
      Query.limit(limit),
    ];

    if (cursor) queries.push(Query.cursorAfter(cursor));
    const response = await databases.listDocuments<MessageDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.MESSAGES_COLLECTION_ID,
      queries,
    );
    return response.documents;
  }

  async function sendMessage(payload: SendMessagePayload) {
    const now = new Date().toISOString();
    const message = await databases.createDocument<MessageDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.MESSAGES_COLLECTION_ID,
      ID.unique(),
      {
        conversation_id: payload.conversationId,
        sender_id: payload.senderId,
        receiver_id: payload.receiverId,
        text: payload.text ?? "",
        type: payload.type ?? "text",
        file_id: payload.fileId ?? null,
        file_name: payload.fileName ?? null,
        file_size: payload.fileSize ?? null,
        mime_type: payload.mimeType ?? null,
        link_metadata: payload.linkMetadata ?? null,
        deleted_for: [],
        is_deleted_everyone: false,
      },
    );
    await databases.updateDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
      payload.conversationId,
      {
        last_message: payload.text || `[${payload?.type?.toUpperCase()}]`,
        last_message_at: now,
        unread_by: [payload.receiverId],
      },
    );
    return message;
  }

  async function uploadFile(file: {
    uri: string;
    type: string;
    name: string;
    size: number;
  }) {
    const endpoint = `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID}/files`;

    try {
      const uploadedResponse = await FileSystem.uploadAsync(
        endpoint,
        file.uri,
        {
          headers: {
            "X-Appwrite-Project": process.env
              .EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
          },
          httpMethod: "POST",
          uploadType: 1,
          fieldName: "file",
          parameters: {
            fileId: "unique()",
          },
        },
      );
      const res = JSON.parse(uploadedResponse.body);
      if (uploadedResponse.status >= 400)
        throw new Error(res.message || "Appwrite API Error");
      return res.$id;
    } catch (error) {
      console.error("error in uploading ", error);
      throw error;
    }
  }

  function getFilePreviewUrl(fileId: string): string {
    return `${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_CONFIG.STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`;
  }

  function getFileDownloadUrl(fileId: string) {
    return storage
      .getFileDownload(APPWRITE_CONFIG.STORAGE_BUCKET_ID, fileId)
      .toString();
  }

  async function markAsRead(
    conversationId: string,
    userId: string,
    currentUnread: string[] = [],
  ) {
    const updatedRead = currentUnread.filter((id) => id !== userId);
    return await databases.updateDocument(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.CONVERSATIONS_COLLECTION_ID,
      conversationId,
      {
        unread_by: updatedRead,
      },
    );
  }

  function subscribeToMessages(
    conversationId: string,
    callback: (event: any) => void,
  ) {
    const channel = `databases.${APPWRITE_CONFIG.DATABASE_ID}.collections.${APPWRITE_CONFIG.MESSAGES_COLLECTION_ID}.documents`;
    return client.subscribe(channel, (response) => {
      const payload = response.payload as MessageDocument;
      if (payload.conversation_id === conversationId) callback(response);
    });
  }

  async function getUserProfile(userId: string) {
    return await databases.getDocument<UserProfileDocument>(
      APPWRITE_CONFIG.DATABASE_ID,
      APPWRITE_CONFIG.USERS_COLLECTION_ID,
      userId,
    );
  }

  return {
    markAsRead,
    subscribeToMessages,
    getChatPartner,
    getConversation,
    getFileDownloadUrl,
    getFilePreviewUrl,
    getMessages,
    uploadFile,
    sendMessage,
    isChatExistingOrNew,
    getUserProfile,
  };
}
