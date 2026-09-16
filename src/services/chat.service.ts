import {
  ConversationDocument,
  MessageDocument,
  SendMessagePayload,
  UserProfileDocument,
} from "@/types/chat-type";

const mockUsers: Record<string, UserProfileDocument> = {
  "6a8f327800175a53acc0": {
    $id: "6a8f327800175a53acc0",
    name: "You",
    email: "you@example.com",
    avatar_url: "",
    role: "user",
  },
  "user-2": {
    $id: "user-2",
    name: "Maya Chen",
    email: "maya@example.com",
    avatar_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    role: "artist",
  },
  "user-3": {
    $id: "user-3",
    name: "Theo Brooks",
    email: "theo@example.com",
    avatar_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    role: "organizer",
  },
};

const mockConversations: ConversationDocument[] = [
  {
    $id: "conv-1",
    $createdAt: "2026-09-15T10:00:00.000Z",
    $updatedAt: "2026-09-15T11:00:00.000Z",
    participant_ids: ["6a8f327800175a53acc0", "user-2"],
    participants: [mockUsers["6a8f327800175a53acc0"], mockUsers["user-2"]],
    last_message: "Looking forward to the session!",
    last_message_at: "2026-09-15T11:00:00.000Z",
    unread_by: ["6a8f327800175a53acc0"],
    cleared_at: null,
  },
  {
    $id: "conv-2",
    $createdAt: "2026-09-14T09:00:00.000Z",
    $updatedAt: "2026-09-14T09:20:00.000Z",
    participant_ids: ["6a8f327800175a53acc0", "user-3"],
    participants: [mockUsers["6a8f327800175a53acc0"], mockUsers["user-3"]],
    last_message: "Venue details are confirmed.",
    last_message_at: "2026-09-14T09:20:00.000Z",
    unread_by: [],
    cleared_at: null,
  },
];

const mockMessages: Record<string, MessageDocument[]> = {
  "conv-1": [
    {
      $id: "msg-1",
      $createdAt: "2026-09-15T10:30:00.000Z",
      $updatedAt: "2026-09-15T10:30:00.000Z",
      conversation_id: "conv-1",
      sender_id: "user-2",
      receiver_id: "6a8f327800175a53acc0",
      text: "Hey! I saw your event brief. Can we chat about the setup?",
      type: "text",
      deleted_for: [],
      is_deleted_everyone: false,
    },
    {
      $id: "msg-2",
      $createdAt: "2026-09-15T11:00:00.000Z",
      $updatedAt: "2026-09-15T11:00:00.000Z",
      conversation_id: "conv-1",
      sender_id: "6a8f327800175a53acc0",
      receiver_id: "user-2",
      text: "Looking forward to the session!",
      type: "text",
      deleted_for: [],
      is_deleted_everyone: false,
    },
  ],
  "conv-2": [
    {
      $id: "msg-3",
      $createdAt: "2026-09-14T09:00:00.000Z",
      $updatedAt: "2026-09-14T09:00:00.000Z",
      conversation_id: "conv-2",
      sender_id: "user-3",
      receiver_id: "6a8f327800175a53acc0",
      text: "Venue details are confirmed.",
      type: "text",
      deleted_for: [],
      is_deleted_everyone: false,
    },
  ],
};

export function chatUtilityFunc() {
  async function getConversation(
    userId: string,
  ): Promise<ConversationDocument[]> {
    return mockConversations
      .filter((conversation) => conversation.participant_ids.includes(userId))
      .sort(
        (a, b) =>
          new Date(b.last_message_at ?? 0).getTime() -
          new Date(a.last_message_at ?? 0).getTime(),
      )
      .map((conversation) => ({
        ...conversation,
        participants: conversation.participant_ids
          .map((id) => mockUsers[id])
          .filter(Boolean),
      }));
  }

  async function isChatExistingOrNew(targetUser: string, currentUser: string) {
    const existing = mockConversations.find(
      (conversation) =>
        conversation.participant_ids.includes(currentUser) &&
        conversation.participant_ids.includes(targetUser),
    );

    if (existing) return existing;

    const newConversation: ConversationDocument = {
      $id: `conv-${Date.now()}`,
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      participants: [
        mockUsers[currentUser] ?? { $id: currentUser, name: "You" },
        mockUsers[targetUser] ?? { $id: targetUser, name: "New user" },
      ],
      participant_ids: [currentUser, targetUser],
      last_message: null,
      last_message_at: new Date().toISOString(),
      unread_by: [],
      cleared_at: null,
    };

    mockConversations.unshift(newConversation);
    mockMessages[newConversation.$id] = [];
    return newConversation;
  }

  function getChatPartner(
    conversation: ConversationDocument,
    currentUserId: string,
  ): UserProfileDocument | undefined {
    const partner = conversation.participant_ids.find(
      (participantId) => participantId !== currentUserId,
    );

    if (!partner) return undefined;
    return mockUsers[partner] ?? { $id: partner, name: "Unknown user" };
  }

  async function getMessages(
    conversationId: string,
    limit = 30,
    _cursor?: string,
  ): Promise<MessageDocument[]> {
    const messages = mockMessages[conversationId] ?? [];
    return [...messages]
      .sort(
        (a, b) =>
          new Date(b.$createdAt ?? 0).getTime() -
          new Date(a.$createdAt ?? 0).getTime(),
      )
      .slice(0, limit);
  }

  async function sendMessage(payload: SendMessagePayload) {
    const now = new Date().toISOString();
    const message: MessageDocument = {
      $id: `msg-${Date.now()}`,
      $createdAt: now,
      $updatedAt: now,
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
    };

    const conversation = mockConversations.find(
      (item) => item.$id === payload.conversationId,
    );

    if (conversation) {
      conversation.last_message =
        payload.text || `[${payload.type?.toUpperCase() ?? "TEXT"}]`;
      conversation.last_message_at = now;
      conversation.unread_by = [payload.receiverId];
    }

    const list = mockMessages[payload.conversationId] ?? [];
    mockMessages[payload.conversationId] = [message, ...list];
    return message;
  }

  async function uploadFile(file: {
    uri: string;
    type: string;
    name: string;
    size: number;
  }) {
    return `local-${Date.now()}-${file.name}`;
  }

  function getFilePreviewUrl(fileId: string): string {
    if (fileId.startsWith("local-")) {
      return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";
    }
    return `https://example.com/files/${fileId}`;
  }

  function getFileDownloadUrl(fileId: string) {
    return getFilePreviewUrl(fileId);
  }

  async function markAsRead(
    conversationId: string,
    userId: string,
    currentUnread: string[] = [],
  ) {
    const conversation = mockConversations.find(
      (item) => item.$id === conversationId,
    );
    if (!conversation) return null;

    conversation.unread_by = currentUnread.filter((id) => id !== userId);
    return conversation;
  }

  function subscribeToMessages(
    _conversationId: string,
    _callback: (event: any) => void,
  ) {
    return () => undefined;
  }

  async function getUserProfile(userId: string) {
    return mockUsers[userId] ?? { $id: userId, name: "Unknown user" };
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
