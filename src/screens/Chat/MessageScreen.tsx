import { CustomHeader } from "@/components/common/custom-header";
import { useMessages, useSendMessages } from "@/hooks/use-chat";
import { ChatRoomInterface } from "@/types/chat-type";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeft, Plus, Send } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RenderMessage } from "./RenderMessage";
import { useAttachmentsUploadToChat } from "@/hooks/useOpenAttachments";

type ChatRoomParams = {
  ChatRoom: ChatRoomInterface;
};
export const MessageScreen = () => {
  const route = useRoute<RouteProp<ChatRoomParams, "ChatRoom">>();
  const navigate = useNavigation();
  const { conversationId, chatParticipant, myUserId } = route.params;
  const { data: messages = [], isLoading } = useMessages(conversationId);
  const [text, setText] = useState("");
  const { mutate: sendMsg, isPending: isSending } = useSendMessages();
  const { openAttachments, isUploading } = useAttachmentsUploadToChat(
    conversationId,
    myUserId,
    chatParticipant,
  );
  function handleSendMsg() {
    if (!text.trim() || !chatParticipant) return;
    sendMsg({
      conversationId,
      receiverId: chatParticipant.$id,
      senderId: myUserId,
      type: "text",
      text: text,
    });
    setText("");
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }} // 🌟 Bypass Nativewind and force flex: 1 natively
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }} // 🌟 Force flex: 1 here too
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* 🏷️ Custom Header */}
        <CustomHeader
          header={chatParticipant?.name ?? ""}
          image={chatParticipant?.avatar_url ?? ""}
        />

        {/* 💬 Chat History List Wrapper */}
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="#6B2D5C" />
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <RenderMessage
                  item={item}
                  userId={myUserId}
                  participant={chatParticipant ?? null}
                />
              )}
              inverted
              // 🌟 flexGrow: 1 ensures inverted lists behave properly when empty
              contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* ⌨️ Input Area */}
        <View className="flex-row items-center px-4 py-3 border-t border-neutral-100 bg-white">
          <Pressable
            className="p-2 mr-2"
            onPress={openAttachments}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator size="large" color="#6B2D5C" />
            ) : (
              <Plus size={24} color="#171717" />
            )}
          </Pressable>
          <View className="flex-1 bg-neutral-100 rounded-full px-4 py-2.5 flex-row items-center">
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base text-neutral-900"
              multiline
              maxLength={500}
            />
          </View>
          <Pressable
            onPress={handleSendMsg}
            disabled={!text.trim() || isSending}
            className={`p-3 ml-2 rounded-full ${text.trim() ? "opacity-100" : "opacity-50"}`}
          >
            <Send size={24} color={text.trim() ? "#6B2D5C" : "#9ca3af"} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
