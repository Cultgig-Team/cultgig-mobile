import { Models } from "react-native-appwrite";

export type MessageType = "text" | "image" | "file" | "link";
export interface UserProfileDocument extends Models.Document {
  name?: string;
  email?: string;
  avatar_url?: string;
  role?: string;
}

export interface ConversationDocument extends Models.Document {
  last_message?: string | null;
  last_message_at?: string | null;
  unread_by?: string[] | null;
  cleared_at?: string | null;
  participants: UserProfileDocument[] | string[];
  participant_ids: string[];
}

export interface MessageDocument extends Models.Document {
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  text?: string | null;
  type: MessageType;
  file_id?: string | null;
  file_name?: string | null;
  file_size?: number | null;
  mime_type?: string | null;
  link_metadata?: Record<string, any> | string | null;
  deleted_for?: string[] | null;
  is_deleted_everyone: boolean;
}

export interface SendMessagePayload {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  type?: MessageType;
  fileId?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
  linkMetadata?: Record<string, any> | string | null;
}

export interface sendDocumentPayload {
  conversationId: string;
  senderId: string;
  receiverId: string;
  file: {
    uri: string;
    type: string;
    name: string;
    size: number;
  };
  mediaType: "image" | "file";
}
export interface ChatRoomInterface {
  conversationId: string;
  chatParticipant: UserProfileDocument | undefined;
  myUserId: string;
}
