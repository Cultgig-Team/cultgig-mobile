import React, { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Text } from "../../components/atoms/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";
import { useMyEvents } from "../../hooks/useArtworks";
import { MyEventCard } from "../../components/molecules/MyEventCard/MyEventCard";

type Tab = "upcoming" | "previous";

const CalendarSceen = () => {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const { data: myEvents, isLoading } = useMyEvents();

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <Text variant="h1" style={styles.header}>
        My Event
      </Text>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === "upcoming" && styles.tabActive]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text
            variant="bodySmallBold"
            style={[
              styles.tabLabel,
              activeTab === "upcoming" && styles.tabLabelActive,
            ]}
          >
            Upcoming
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "previous" && styles.tabActive]}
          onPress={() => setActiveTab("previous")}
        >
          <Text
            variant="bodySmallBold"
            style={[
              styles.tabLabel,
              activeTab === "previous" && styles.tabLabelActive,
            ]}
          >
            Previous
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : activeTab === "upcoming" ? (
          myEvents && myEvents.length > 0 ? (
            <View style={styles.eventsList}>
              {myEvents.map((event) => (
                <MyEventCard key={event.id} event={event} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text variant="body" color="textSecondary">
                No upcoming events
              </Text>
            </View>
          )
        ) : (
          <View style={styles.emptyState}>
            <Text variant="body" color="textSecondary">
              No previous events
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarSceen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  tabBar: {
    flexDirection: "row",
    margin: 16,

    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 116,
    backgroundColor: "#E9E9E9",
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabLabel: {
    color: theme.colors.textSecondary,
  },
  tabLabelActive: {
    color: theme.colors.textInverse,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  eventsList: {
    gap: 16,
    paddingBottom: 24,
  },
});
