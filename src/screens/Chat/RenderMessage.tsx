import { Text } from "@/components/ui/text";
import { chatUtilityFunc } from "@/services/chat.service";
import { MessageDocument, UserProfileDocument } from "@/types/chat-type";
import { FileText } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

interface RenderMessageInterface {
  item: MessageDocument;
  userId: string;
  participant: UserProfileDocument | null;
}
export const RenderMessage = ({
  item,
  userId,
  participant,
}: RenderMessageInterface) => {
  const isitMe = item.sender_id === userId;
  const isPending = item?.$id.startsWith("temp");
  const { getFilePreviewUrl } = chatUtilityFunc();
  function handleDownloadFile() {}
  function renderCondtionally() {
    switch (item.type) {
      case "image":
        return (
          <View className="p-1">
            {item.file_id ? (
              <Image
                className="w-60 h-60 rounded-xl"
                // 🌟 Pass item.file_id only when it's guaranteed to be a string
                source={{ uri: getFilePreviewUrl(item.file_id) }}
                resizeMode="cover"
              />
            ) : (
              <View className="w-60 h-60 rounded-xl bg-neutral-200 items-center justify-center">
                <Text className="text-neutral-500 text-xs">
                  Image unavailable
                </Text>
              </View>
            )}
          </View>
        );
      case "file":
        return (
          <Pressable
            onPress={handleDownloadFile}
            className="flex-row item-center p-3 gap-3"
          >
            <View
              className={`w-10 h-10 rounded-lg items-center justify-center ${
                isitMe ? "bg-white/20" : "bg-neutral-200"
              }`}
            >
              <FileText size={20} color={isitMe ? "#ffffff" : "#171717"} />
            </View>
          </Pressable>
        );
      default:
        return (
          <View
            className={`max-w-[75%] px-4 py-3 ${
              isitMe
                ? "bg-[#6B2D5C] rounded-2xl rounded-br-sm" // My message bubble
                : "bg-neutral-100 rounded-2xl rounded-bl-sm" // Partner message bubble
            } ${isPending ? "opacity-70" : "opacity-100"}`}
          >
            <Text
              className={`text-base ${isitMe ? "text-white" : "text-neutral-800"}`}
            >
              {item.text}
            </Text>
          </View>
        );
    }
  }

  return (
    <View
      className={`flex-row w-full mb-4 px-4 items-end ${
        isitMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Partner Avatar (Left) */}
      {!isitMe && (
        <View className="w-8 h-8 rounded-full bg-neutral-200 mr-2 overflow-hidden items-center justify-center">
          {participant && participant?.avatar_url ? (
            <Image
              source={{ uri: participant.avatar_url }}
              className="w-full h-full"
            />
          ) : (
            <Text className="text-xs font-bold text-neutral-600">
              {participant?.name?.charAt(0)}
            </Text>
          )}
        </View>
      )}

      {renderCondtionally()}
    </View>
  );
};
