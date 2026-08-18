import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Bell,
  FileText,
  FileCheck,
  Star,
  Eye,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/atoms/Text";
import { useArtworkFeed, usePopularEvents } from "../../hooks/useArtworks";
import { theme } from "../../theme";
import EventCard from "@/components/templates/EventCard/EventCard";
/**
 * SCREEN: Home
 * -------------------------------------------------------
 * Screens compose organisms/molecules/atoms + hooks. They
 * should contain minimal styling logic themselves — layout
 * glue only. Once you share the Home design, this becomes
 * the real feed (ArtworkGrid organism, Header organism, etc).
 */

// --- DUMMY DATA ---
const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";

// --- REUSABLE COMPONENTS ---

// 1. Activity Card Component
const ActivityCard = ({
  icon: Icon,
  count,
  label,
}: {
  icon: any;
  count: string | number;
  label: string;
}) => (
  <View style={styles.activityCard}>
    <View style={styles.activityCardHeader}>
      <View style={styles.iconCircle}>
        <Icon size={20} color={theme.colors.primary} />
      </View>
      <Text style={styles.activityCount}>{count}</Text>
    </View>
    <Text style={styles.activityLabel}>{label}</Text>
  </View>
);


export const HomeScreen = () => {
  const {
    data: artworks,
    isLoading: artworksLoading,
    error: artworksError,
  } = useArtworkFeed();

  const {
    data: popularEvents,
    isLoading: eventsLoading,
    error: eventsError,
  } = usePopularEvents();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bellButton}>
          <Bell size={26} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* My Activity Section */}
        <Text style={styles.sectionTitleMain}>My Activity</Text>

        <View style={styles.activityGrid}>
          <ActivityCard icon={FileText} count="5" label="Applied Gigs" />
          <ActivityCard icon={FileCheck} count="0" label="Active Gigs" />
          <ActivityCard icon={Star} count="12" label="Total Rating" />
          <ActivityCard icon={Eye} count="10k" label="Total Views" />
        </View>

        {/* Popular Gigs Section */}
        <Text style={styles.sectionTitleSecondary}>Popular gigs near you</Text>

        {eventsLoading && (
          <ActivityIndicator
            style={styles.loader}
            color={theme.colors.primary}
          />
        )}

        {eventsError && (
          <Text variant="body" color="error" style={styles.padded}>
            Couldn't load popular events.
          </Text>
        )}

        {!eventsLoading && !eventsError && (
          <View style={styles.eventsList}>
            {popularEvents?.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bellButton: {
    padding: 6,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitleMain: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000000",
    marginTop: 20,
    marginBottom: 16,
    paddingBottom:16,
  },
  sectionTitleSecondary: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000000",
    marginTop: 24,
    marginBottom: 16,
    paddingBottom:15,

  },
  activityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FAF2F9",
    justifyContent: "center",
    alignItems: "center",
  },
  activityCount: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  activityLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
  eventsList: {
    gap: 16,
  },
  loader: {
    marginTop: theme.spacing.xl,
  },
  padded: {
    paddingVertical: theme.spacing.md,
  },
});
