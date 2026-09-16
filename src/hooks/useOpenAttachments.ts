import { UserProfileDocument } from "@/types/chat-type";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { ActionSheetIOS, Alert, Platform } from "react-native";
import { useUploadFile } from "./use-chat";

export const useAttachmentsUploadToChat = (
  conversationId: string,
  userId: string,
  chatParticipant: UserProfileDocument | undefined,
) => {
  const { mutate: sendAttachment, isPending: isUploading } = useUploadFile();
  async function uploadDocs() {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled && result.assets[0] && chatParticipant) {
      const assets = result.assets[0];
      sendAttachment({
        conversationId,
        receiverId: chatParticipant.$id,
        senderId: userId,
        file: {
          uri: assets.uri,
          name: assets.name || `image_${new Date().toISOString()}.pdf`,
          type: assets.mimeType || "application/octet-stream",
          size: assets.size || 1024,
        },
        mediaType: "file",
      });
    }
  }
  async function uploadImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow gallery access to send photos.",
      );
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      mediaTypes: ["images"],
    });
    if (!result.canceled && result.assets[0] && chatParticipant) {
      const assets = result.assets[0];
      sendAttachment({
        conversationId,
        receiverId: chatParticipant.$id,
        senderId: userId,
        file: {
          uri: assets.uri,
          name: assets.fileName || `image_${new Date().toISOString()}.jpg`,
          type: assets.mimeType || "image/jpeg",
          size: assets.fileSize || 1024,
        },
        mediaType: "image",
      });
    }
  }
  function openAttachments() {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Photo Library 📸", "Document / PDF 📄"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) uploadDocs();
          if (buttonIndex === 2) uploadImage();
        },
      );
    } else {
      Alert.alert("Send attachments", "Choose an option!", [
        { text: "Photo Library", onPress: uploadImage },
        { text: "Document / PDF", onPress: uploadDocs },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  }

  return { openAttachments, isUploading };
};
