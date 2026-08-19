import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  ArrowRight,
  Bell,
  FileText,
  FileCheck,
  Star,
  Eye,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/atoms/Text";
import { useArtworkFeed, usePopularEvents } from "../../hooks/useArtworks";
import { useOnboardingStore } from "../../store/onboardingStore";
import { colors, theme } from "../../theme";
import EventCard from "@/components/templates/EventCard/EventCard";
import { Input } from "../../components/atoms/Input/";
import { Button } from "../../components";
import { CategoryGridCard } from "../../components/molecules/CategoryGridCard";
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

const CATEGORIES: { key: string; label: string; image: number }[] = [
  {
    key: "photographer",
    label: "Photographer",
    image: require("../../../assets/onboarding/categories/Photographer.png"),
  },
  {
    key: "dancer",
    label: "Dancer",
    image: require("../../../assets/onboarding/categories/Dancer.png"),
  },
  {
    key: "guitarist",
    label: "Guitarist",
    image: require("../../../assets/onboarding/categories/Guitarist.png"),
  },
  {
    key: "painter",
    label: "Painter",
    image: require("../../../assets/onboarding/categories/Painter.png"),
  },
  {
    key: "comedian",
    label: "Comedian",
    image: require("../../../assets/onboarding/categories/Comedian.png"),
  },
  {
    key: "videographer",
    label: "Videographer",
    image: require("../../../assets/onboarding/categories/Videographer.png"),
  },
];

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
  const primaryIntent = useOnboardingStore((state) => state.primaryIntent);
  const role = primaryIntent ?? "artist";
  const [selected, setSelected] = useState<string | null>(null);

  const {
    data: popularEvents,
    isLoading: eventsLoading,
    error: eventsError,
  } = usePopularEvents();
  // home screen for client
  if (role === "client") {
    return (
      <SafeAreaView edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.clientHero}>
            <View style={styles.scrollContainer}>
              <View style={styles.clientHeader}>
                <TouchableOpacity>
                  <Text variant="confirmTitle" style={styles.clientLogo}>
                    Cultgig
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Bell size={26} color="#1f2937" />
                </TouchableOpacity>
              </View>
              <Text variant="titleMd" style={styles.clientGreeting}>
                Good Morning, Hrik
              </Text>
              <View style={styles.clientForm}>
                <Text variant="h1">Post a Event. Get it Done.</Text>
                <Input
                  placeholder="In few words what do you need done?"
                  style={styles.clientInput}
                />
                <Button
                  label="Post Event"
                  fullWidth
                  style={styles.clientButton}
                ></Button>
              </View>
            </View>
          </View>
          {/* category */}
          <View style={styles.scrollContainer}>
            <Text variant="h2" style={{ marginVertical: 24 }}>
              Book artists in all categories
            </Text>
            <View style={styles.grid}>
              {CATEGORIES.map((category) => (
                <View key={category.key} style={styles.categoryItem}>
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text variant="bodySmall" style={styles.categoryLabel}>
                    {category.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  // home screen for artrist
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
  clientHero: {
    backgroundColor: "#FAF2F9",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: theme.colors.border,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 40,
  },
  clientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clientLogo: {
    color: theme.colors.primary,
  },
  clientGreeting: {
    marginTop: 40,
    marginBottom: 36,
  },
  clientForm: {
    gap: 16,
  },
  clientInput: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  clientButton: {
    paddingVertical: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: theme.spacing.md,
  },
  categoryItem: {
    width: "30%",
  },
  categoryImage: {
    width: "100%",
    height: 116,
    borderRadius: 12,
  },
  categoryLabel: {
    textAlign: "center",
    paddingTop: 8,
  },
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
    paddingBottom: 16,
  },
  sectionTitleSecondary: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000000",
    marginTop: 24,
    marginBottom: 16,
    paddingBottom: 15,
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
