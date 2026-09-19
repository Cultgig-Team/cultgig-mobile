import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ChevronLeft,
  Banknote,
  MapPin,
  Clock3,
  Calendar,
  Share2,
} from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";
import { useMyEventDetail } from "../../hooks/useArtworks";
import { useMyEvents } from "../../hooks/useArtworks";
import { MyEventCard } from "../../components/molecules/MyEventCard/MyEventCard";

type MyEventDetailsRouteProp = RouteProp<RootStackParamList, "MyEventDetails">;

interface MyEventDetailsScreenProps {
  eventId?: number;
  onBack?: () => void;
}

const DetailSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <View style={styles.section}>
    <Text variant="titleMd" style={styles.sectionTitle}>
      {title}
    </Text>
    {children}
  </View>
);

export const MyEventDetailsScreen: React.FC<MyEventDetailsScreenProps> = ({
  eventId: eventIdProp,
  onBack: onBackProp,
}) => {
  const route = useRoute<MyEventDetailsRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const eventId = eventIdProp ?? route.params?.eventId;
  const { data: event, isLoading } = useMyEventDetail(eventId);

  const handleBack = () => {
    if (onBackProp) {
      onBackProp();
    } else {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={handleBack} />
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={handleBack} />
        </View>
        <View style={styles.centered}>
          <Text variant="body" color="textSecondary">
            Event not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ChevronLeft
              size={32}
              strokeWidth={1.5}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Share2
                size={24}
                strokeWidth={1.5}
                color={theme.colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Status Badge */}
        {/* <View style={styles.statusBadge}>
          <Text variant="caption" style={styles.statusBadgeText}>
            Upcoming Event
          </Text>
        </View> */}

        {/* Event Title */}
        <Text variant="h2" style={styles.pageTitle}>
          {event.title}
        </Text>

        <View style={styles.divider} />

        {/* About Event */}
        <DetailSection title="About this Event">
          <Text variant="body" style={styles.description}>
            {event.eventDescription}
          </Text>
        </DetailSection>

        <View style={styles.divider} />

        {/* At a glance */}
        <DetailSection title="At a glance">
          <View style={styles.infoItemSimple}>
            <Banknote size={24} color={theme.colors.primary} />
            <View style={styles.infoItemText}>
              <Text variant="titleMd">
                {event.thingsToKnow?.budget ?? `₹${event.budget}`}
              </Text>
              <Text variant="caption" color="textSecondary">
                Price fixed
              </Text>
            </View>
          </View>

          <View style={styles.infoItemsStack}>
            <View style={styles.infoItemSimple}>
              <MapPin size={24} color={theme.colors.backgroundDark} />
              <View style={styles.infoItemText}>
                <Text variant="titleMd">
                  {event.thingsToKnow?.location ?? event.location}
                </Text>
                <Text variant="caption" color="textSecondary">
                  Work in person from the location
                </Text>
              </View>
            </View>

            <View style={styles.infoItemSimple}>
              <Clock3 size={24} color={theme.colors.backgroundDark} />
              <View style={styles.infoItemText}>
                <Text variant="titleMd">
                  {event.thingsToKnow?.time ?? event.startsAt}
                </Text>
                <Text variant="caption" color="textSecondary">
                  Working hours
                </Text>
              </View>
            </View>

            <View style={styles.infoItemSimple}>
              <Calendar size={24} color={theme.colors.backgroundDark} />
              <View style={styles.infoItemText}>
                <Text variant="titleMd">
                  {event.thingsToKnow?.date ?? event.startsAt}
                </Text>
                <Text variant="caption" color="textSecondary">
                  Event dates
                </Text>
              </View>
            </View>
          </View>
        </DetailSection>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyEventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FAF1F7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    marginTop: 8,
    marginBottom: 8,
  },
  statusBadgeText: {
    color: theme.colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.textPrimary,
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  section: {
    marginVertical: 4,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "700",
  },
  description: {
    lineHeight: 24,
    color: theme.colors.textSecondary,
  },
  infoItemSimple: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  infoItemText: {
    flex: 1,
    gap: 2,
  },
  infoItemsStack: {
    gap: 4,
    marginTop: 8,
  },
});
