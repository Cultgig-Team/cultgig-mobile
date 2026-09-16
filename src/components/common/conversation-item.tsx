import { ConversationDocument, UserProfileDocument } from "@/types/chat-type";
import { formatDateTimeStamp } from "@/utils/formate-date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { View, Text, Image, Pressable } from "react-native";

interface ConversationItemType {
  conversation: ConversationDocument;
  myUserId: string;
  chatParticipant: UserProfileDocument | undefined;
}
export const ConversationItem = ({
  conversation,
  myUserId,
  chatParticipant,
}: ConversationItemType) => {
  const isUnread = conversation.unread_by?.includes(myUserId);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  function navigateToInbox() {
    navigation.navigate("ChatRoom", {
      conversationId: conversation.$id,
      chatParticipant,
      myUserId,
    });
  }
  return (
    chatParticipant && (
      <Pressable
        className="flex-row items-center px-6 py-4 border-b border-neutral-100 active:bg-neutral-50"
        onPress={navigateToInbox}
      >
        {/* Avatar Container */}
        <View className="w-12 h-12 rounded-full bg-neutral-200 items-center justify-center mr-4 overflow-hidden">
          {chatParticipant.avatar_url ? (
            <Image
              source={{ uri: chatParticipant.avatar_url }}
              resizeMode="cover"
              className="w-full h-full"
            />
          ) : (
            <Text className="text-base font-bold text-neutral-600">
              {chatParticipant.name?.charAt(0)?.toUpperCase() || "?"}
            </Text>
          )}
        </View>

        {/* Details Container */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-base font-semibold text-neutral-800">
              {chatParticipant.name}
            </Text>
            {conversation?.last_message_at && (
              <Text className="text-sm font-medium">
                {formatDateTimeStamp(conversation.last_message_at)}
              </Text>
            )}
          </View>

          {conversation?.last_message &&
            conversation.last_message.length > 0 && (
              <Text
                numberOfLines={1}
                className={`text-sm ${
                  isUnread
                    ? "font-semibold text-neutral-800 truncate"
                    : "text-neutral-500 font-normal"
                }`}
              >
                {conversation.last_message}
              </Text>
            )}
        </View>

        {/* Unread Indicator */}
        {isUnread && (
          <View className="w-2.5 h-2.5 rounded-full bg-[#6B2D5C] ml-2" />
        )}
      </Pressable>
    )
  );
};
