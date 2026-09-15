import React from "react";
import { View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import {
  RouteProp,
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import {
  MapPin,
  Clock3,
  Calendar,
  Banknote,
  ChevronLeft,
  Share2,
  HeartIcon,
  DotIcon,
} from "lucide-react-native";
import { RootStackParamList } from "../../navigation/types";
import { Button } from "../../components/atoms/Button";
import { Text } from "../../components/atoms/Text";
import { usePopularEventDetail } from "../../hooks/useArtworks";
import { theme } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

type EventDetailRouteProp = RouteProp<RootStackParamList, "EventDetail">;

interface EventDetailScreenProps {
  eventId?: number;
  onBack?: () => void;
  onApply?: () => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <>
    <Text variant="h3" style={styles.sectionTitle}>
      {title}
    </Text>
    {children}
  </>
);

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  eventId: eventIdProp,
  onBack,
  onApply,
}) => {
  const route = useRoute<EventDetailRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const eventId = eventIdProp ?? route.params?.eventId;
  const { data: event } = usePopularEventDetail(eventId);

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text variant="body" color="textSecondary">
          Event not found.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <ChevronLeft size={32} strokeWidth={1.5} onPress={onBack} />
          <View style={styles.headerActions}>
            <HeartIcon />
            <Share2 size={24} strokeWidth={1.5} />
          </View>
        </View>

        <Text variant="h2" style={styles.pageTitle}>
          {event.title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Posted 3 days ago </Text>
          <DotIcon />
          <Text> {event.user.name}</Text>
        </View>

        <View style={styles.divider} />

        <DetailSection title="About this Event">
          <Text variant="body" style={styles.description}>
            {event.eventDescription}
          </Text>
        </DetailSection>
        <View style={styles.divider} />
        <DetailSection title="At a glance">
          <View style={styles.infoItemSimple}>
            <Banknote size={24} />
            <View>
              <Text variant="titleMd">
                {event.thingsToKnow?.budget ?? `₹${event.budget}`}
              </Text>
              <Text>Price fixed</Text>
            </View>
          </View>
          <View style={styles.infoItemsStack}>
            <View style={styles.infoItemSimple}>
              <MapPin size={24} color={theme.colors.backgroundDark} />
              <View>
                <Text variant="titleMd">{event.location}</Text>
                <Text>Work in person from the location</Text>
              </View>
            </View>

            <View style={styles.infoItemSimple}>
              <Clock3 size={24} color={theme.colors.backgroundDark} />
              <View>
                <Text variant="titleMd">
                  {event.thingsToKnow?.time ?? event.startsAt}
                </Text>
                <Text>Work in person from the location</Text>
              </View>
            </View>

            <View style={styles.infoItemSimple}>
              <Calendar size={24} color={theme.colors.backgroundDark} />
              <View>
                <Text variant="titleMd">
                  {event.thingsToKnow?.date ?? event.startsAt}
                </Text>
                <Text>Work in person from the location</Text>
              </View>
            </View>
          </View>
        </DetailSection>
        <View style={styles.divider} />
        <DetailSection title="Host By">
          <View style={styles.organiserInfo}>
            <Image
              source={{ uri: event.user.profileImage }}
              style={styles.organiserAvatar}
            />
            <Pressable
              onPress={() =>
                navigation.navigate("UserDetail", { user: event.user })
              }
            >
              <Text variant="body" color="textPrimary">
                {event.user?.name}
              </Text>
            </Pressable>
          </View>
        </DetailSection>
      </ScrollView>
      <View style={styles.divider} />
      <View style={styles.footer}>
        {onApply && (
          <Button
            label="Apply Now"
            onPress={onApply}
            fullWidth
            style={styles.continueButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing.md,
  },
  headerActions: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  pageTitle: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.backgroundSecondary,
    marginBottom: theme.spacing.md,
  },
  iconPill: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF2F9",
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
    borderRadius: 12,
  },
  infoItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  infoItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: theme.spacing.sm,
  },
  infoItemSimple: {
    flexDirection: "row",
    gap: 19,
    marginBottom: theme.spacing.sm,
  },
  infoItemsStack: {
    gap: theme.spacing.xs,
  },
  organiserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  organiserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  description: {
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  gallerySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  galleryImage: {
    width: "48%",
    height: 220,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  footer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  continueButton: {
    marginTop: theme.spacing.xs,
    height: 52,
  },
});
