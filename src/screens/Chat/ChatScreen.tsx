import { ConversationItem } from "@/components/common/conversation-item";
import InboxEmptyState from "@/components/common/inbox-empty-state";
import { Text } from "@/components/ui/text";
import { useGetConvesation } from "@/hooks/use-chat";
import { chatUtilityFunc } from "@/services/chat.service";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyChatImage from "../../../assets/images/chat-message.png";
import { useFocusEffect } from "@react-navigation/native";

// current testing
const userId = "6a8f327800175a53acc0";
const ACTIVE_COLOR = "#6B2D5C";
export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const {
    data: conversationData,
    isLoading: isConversationLoading,
    isFetching: isConversationFetching,
    isError: isErrorInConverstation,
    refetch,
  } = useGetConvesation("6a8f327800175a53acc0");
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const { getChatPartner } = chatUtilityFunc();
  const displayedChat = useMemo(() => {
    if (isConversationFetching || isConversationLoading) return;
    if (conversationData && conversationData.length > 0) {
      if (activeTab === "all") return conversationData;
      else
        return conversationData.filter(
          (item) =>
            item.unread_by?.includes(userId) && Boolean(item.last_message),
        );
    }
  }, [conversationData, activeTab]);
  const unreadCount = useMemo(() => {
    if (!isConversationFetching && !isConversationLoading) {
      return conversationData
        ?.filter(
          (item) => item.unread_by?.includes(userId) && !!item.last_message,
        )
        .map((item) => item);
    }
  }, [conversationData, isConversationFetching, isConversationLoading]);
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <View className="px-6 pt-4 pb-2">
        <Text className="text-3xl font-extrabold text-neutral-950 tracking-tight">
          My Inbox
        </Text>
        <View className="flex-row items-center gap-3 mt-4 mb-5">
          <Pressable
            onPress={() => setActiveTab("all")}
            className={`px-6 py-2 w-20 h-10 rounded-3xl ${activeTab === "all" ? "bg-[#6A2E62]" : "bg-[#E9E9E9]"}`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "all" ? "text-white" : "text-neutral-700"
              }`}
            >
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("unread")}
            className={`px-4 py-2 w-24 h-10 rounded-3xl ${activeTab === "unread" ? "bg-[#6A2E62]" : "bg-[#E9E9E9]"}`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "unread" ? "text-white" : "text-neutral-700"
              }`}
            >
              Unread
            </Text>
            {unreadCount && unreadCount?.length > 0 && (
              <View
                className={`w-2 h-2 rounded-full ${
                  activeTab === "unread" ? "bg-white" : "bg-[#6B2D5C]"
                }`}
              />
            )}
          </Pressable>
        </View>
      </View>
      {isConversationLoading ? (
        <View className="flex-1 items-center h-full justify-center">
          <ActivityIndicator size="large" color={ACTIVE_COLOR} />
        </View>
      ) : isErrorInConverstation ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-red-500 font-medium text-center">
            Failed to load conversations ⚠️
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="mt-3 px-4 py-2 bg-neutral-100 rounded-lg"
          >
            <Text className="text-neutral-800 font-semibold">Tap to retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={displayedChat}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={{ flexGrow: 1 }}
          onRefresh={refetch}
          refreshing={isConversationLoading || isConversationFetching}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              myUserId={userId}
              chatParticipant={getChatPartner(item, userId)}
            />
          )}
          ListEmptyComponent={
            <InboxEmptyState
              image={EmptyChatImage}
              description={
                activeTab === "all"
                  ? "Your next conversation is just a connection"
                  : "You have caught up with all your messages!"
              }
              heading={"Your inbox is quiet"}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
