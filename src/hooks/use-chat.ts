import { chatUtilityFunc } from "@/services/chat.service";
import {
  MessageDocument,
  sendDocumentPayload,
  SendMessagePayload,
} from "@/types/chat-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const {
  getConversation,
  isChatExistingOrNew,
  getMessages,
  sendMessage,
  getUserProfile,
  uploadFile,
} = chatUtilityFunc();

export function useGetConvesation(userId: string) {
  return useQuery({
    queryKey: ["get-conversation", userId],
    enabled: !!userId,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    queryFn: () => getConversation(userId),
  });
}

export function createChatIfNot() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      targetUserId,
      myUserId,
    }: {
      targetUserId: string;
      myUserId: string;
    }) => isChatExistingOrNew(targetUserId, myUserId),
    onSuccess: (_, populatedChat) => {
      queryClient.invalidateQueries({
        queryKey: ["get-conversation"],
      });
      return populatedChat;
    },
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
    // Add this to see what's actually happening! 👇
    throwOnError: (error) => {
      return false;
    },
  });
}

// includes optimistic updates
export function useSendMessages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SendMessagePayload) => sendMessage(payload),
    onMutate: async (payload: SendMessagePayload) => {
      const queryKey = ["messages", payload.conversationId];
      await queryClient.cancelQueries({ queryKey });
      const previousMessages =
        queryClient.getQueryData<MessageDocument[]>(queryKey); // for backup
      const createMessage: MessageDocument = {
        $id: `temp-${new Date().toISOString()}`,
        conversation_id: payload.conversationId,
        sender_id: payload.senderId,
        receiver_id: payload.receiverId,
        text: payload.text,
        type: payload.type ?? "text",
        file_id: null,
        file_name: null,
        file_size: null,
        mime_type: null,
        link_metadata: null,
        deleted_for: null,
        is_deleted_everyone: false,
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        $databaseId: "",
        $sequence: "",
        $collectionId: "",
      };
      queryClient.setQueryData<MessageDocument[]>(queryKey, (old = []) => [
        createMessage,
        ...old,
      ]);
      return { previousMessages, queryKey };
    },
    onError: (_error, _variables, _context) => {
      if (_context?.previousMessages)
        queryClient.setQueryData(_context.queryKey, _context.previousMessages);
    },
    onSettled: (_data, _error, _variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", _variables.conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-conversation", _variables.senderId],
      });
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variable.conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-conversation"],
      });
    },
  });
}

export function useGetMyProfiileDetails(userId: string) {
  return useQuery({
    queryKey: ["get-my-profile", userId],
    enabled: !!userId,
    queryFn: () => getUserProfile(userId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      senderId,
      receiverId,
      file,
      mediaType,
    }: sendDocumentPayload) => {
      const fileId = await uploadFile(file);
      const msg = await sendMessage({
        conversationId,
        senderId,
        receiverId,
        fileId,
        fileName: file.name,
        fileSize: file.size,
        type: mediaType,
        text: file.type === "image" ? "Image" : `${file.name}`,
        mimeType: file.type,
      });
      return msg;
    },
    onError: (error) => {
      console.error("Appwrite Upload Failed 🚨:", error);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variable.conversationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-conversation"],
      });
    },
  });
}
