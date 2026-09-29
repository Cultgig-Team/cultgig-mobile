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
  ChevronRight,
} from "lucide-react-native";
import { Text } from "../../components/atoms/Text";
import { theme } from "../../theme";
import { RootStackParamList } from "../../navigation/types";
import { useMyEventDetail } from "../../hooks/useArtworks";
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
          <Text variant="titleMd" style={styles.headerTitle}>
            Event Details
          </Text>
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

        <MyEventCard
          key={event.id}
          event={event}
          rightIcon="edit"
          gradientColors={["#FAF2F9", "#FFFFFF"]}
          applicantsColor="primary"
          onEdit={() => navigation.navigate("EditEvent", { eventId: event.id })}
        />

        {/* Event Applicants */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() =>
            navigation.navigate("EventApplicants", { eventId: event.id })
          }
          activeOpacity={0.7}
        >
          <View>
            <Text variant="titleMd" style={styles.sectionTitle}>
              Event Applicants
            </Text>
            <Text variant="body" style={styles.description}>
              Check artists who have applied
            </Text>
          </View>
          <ChevronRight />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* About Event */}
        <DetailSection title="Event Description">
          <Text variant="body" style={styles.description}>
            {event.eventDescription}
          </Text>
        </DetailSection>

        <View style={styles.divider} />

        {/* Event Details */}
        <DetailSection title="Event Details">
          <View style={styles.infoItemSimple}>
            <Calendar size={20} color={theme.colors.textSecondary} />
            <View style={styles.infoItemText}>
              <Text variant="body" style={styles.description}>
                {event.thingsToKnow?.date ?? event.startsAt}
              </Text>
            </View>
          </View>
          <View style={styles.infoItemSimple}>
            <Clock3 size={20} color={theme.colors.textSecondary} />
            <View style={styles.infoItemText}>
              <Text variant="body" style={styles.description}>
                {event.thingsToKnow?.time ?? event.startsAt}
              </Text>
            </View>
          </View>
          <View style={styles.infoItemSimple}>
            <MapPin size={20} color={theme.colors.textSecondary} />
            <View style={styles.infoItemText}>
              <Text variant="body" style={styles.description}>
                {event.thingsToKnow?.location ?? event.location}
              </Text>
            </View>
          </View>
          <View style={styles.infoItemSimple}>
            <Banknote size={20} color={theme.colors.textSecondary} />
            <View style={styles.infoItemText}>
              <Text variant="body" style={styles.description}>
                {event.thingsToKnow?.budget ?? `₹${event.budget}`}
              </Text>
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
    fontSize: 18,
  },
  description: {
    lineHeight: 24,
    color: theme.colors.textSecondary,
  },
  infoItemSimple: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 2,
  },
  infoItemText: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: "700",
  },
});
