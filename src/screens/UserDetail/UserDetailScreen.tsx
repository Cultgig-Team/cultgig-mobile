import React, { memo } from "react";
import {
  Image,
  Linking,
  Pressable,
  Share as NativeShare,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  ArrowLeft,
  AtSign,
  CalendarDays,
  BadgeCheck,
  Globe2,
  Languages,
  Link,
  MapPin,
  MessageCircle,
  Share2,
} from "lucide-react-native";

import { Text } from "../../components/index";
import { theme } from "../../theme/index";
import type { User } from "../../services/artworkService";

interface UserDetailScreenProps {
  user: User;
  onBack: () => void;
  onChat?: (user: User) => void;
}

const profileDetails = {
  location: "HSR Layout, Bangalore",
  joinedDate: "July, 2024",
  about: [
    "Event text messaging is a mass communication method that lets organizers send instant updates to attendees, staff, and volunteers from a single platform.",
    "It covers the full event lifecycle: reminders before, real-time updates during, and follow-ups after.",
  ],
  languages: ["Bengali", "Hindi", "English"],
  socials: {
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    website: "https://example.com/",
  },
} as const;

export const UserDetailScreen = ({
  user,
  onBack,
  onChat,
}: UserDetailScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: 90 + insets.bottom,
            },
          ]}
        >
          <HeroSection
            image={user.profileImage}
            onBack={onBack}
            onShare={() =>
              NativeShare.share({
                message: `Check out ${user.name}'s profile: ${user.profileImage}`,
              })
            }
          />

          <View style={styles.content}>
            <View style={styles.profileHeader}>
              <View style={styles.nameRow}>
                <Text variant="h2" style={styles.artistName} numberOfLines={2}>
                  {user.name}
                </Text>

                {/* <CheckCircle2
                  size={20}
                  strokeWidth={1.8}
                  color={theme.colors.primary}
                /> */}
                <BadgeCheck
                  size={20}
                  strokeWidth={2.8}
                  color={theme.colors.primary}
                />
              </View>

              <View style={styles.metaGroup}>
                <MetaRow
                  icon={<MapPin size={20} color={theme.colors.textSecondary} />}
                  text={profileDetails.location}
                />
                <MetaRow
                  icon={
                    <CalendarDays
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  }
                  text={`Joined ${profileDetails.joinedDate}`}
                />
              </View>
            </View>

            <SectionDivider />
            <AboutSection paragraphs={profileDetails.about} />
            <SectionDivider />
            <ThingsToKnow
              location={profileDetails.location}
              languages={profileDetails.languages}
            />
            <SectionDivider />
            <MeetArtist name={user.name} socials={profileDetails.socials} />
          </View>
        </ScrollView>

        <BottomChatBar
          bottomInset={insets.bottom}
          onPress={onChat ? () => onChat(user) : undefined}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

interface HeroSectionProps {
  image: string;
  onBack: () => void;
  onShare: () => void;
}

const HeroSection = memo(({ image, onBack, onShare }: HeroSectionProps) => {
  return (
    <View style={styles.hero}>
      <Image
        source={{ uri: image }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      {/* Dark image scrim for top controls */}
      <View style={styles.heroTopScrim} pointerEvents="none" />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={onBack}
        style={({ pressed }) => [
          styles.heroAction,
          pressed && styles.heroActionPressed,
        ]}
      >
        <ArrowLeft size={20} strokeWidth={2} color={theme.colors.textInverse} />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share profile"
        hitSlop={8}
        onPress={onShare}
        style={({ pressed }) => [
          styles.heroAction,
          styles.heroShareAction,
          pressed && styles.heroActionPressed,
        ]}
      >
        <Share2 size={20} strokeWidth={2} color={theme.colors.textInverse} />
      </Pressable>
    </View>
  );
});

HeroSection.displayName = "HeroSection";

interface MetaRowProps {
  icon: React.ReactNode;
  text: string;
}

const MetaRow = memo(({ icon, text }: MetaRowProps) => (
  <View style={styles.metaRow}>
    <View style={styles.metaIcon}>{icon}</View>
    <Text variant="body" style={styles.metaText} numberOfLines={1}>
      {text}
    </Text>
  </View>
));

MetaRow.displayName = "MetaRow";

interface AboutSectionProps {
  paragraphs: readonly string[];
}

const AboutSection = memo(({ paragraphs }: AboutSectionProps) => (
  <View style={styles.section}>
    <Text variant="h3" style={styles.sectionTitle}>
      About the host
    </Text>
    <View style={styles.aboutCopy}>
      {paragraphs.map((paragraph) => (
        <Text key={paragraph} variant="body" style={styles.bodyText}>
          {paragraph}
        </Text>
      ))}
    </View>
  </View>
));

AboutSection.displayName = "AboutSection";

interface ThingsToKnowProps {
  location: string;
  languages: readonly string[];
}

const ThingsToKnow = memo(({ location, languages }: ThingsToKnowProps) => (
  <View style={styles.section}>
    <Text variant="h3" style={styles.sectionTitle}>
      Things to know
    </Text>
    <View style={styles.knowList}>
      <InfoRow
        icon={<MapPin size={24} color={theme.colors.backgroundDark} />}
        text={location}
      />
      <InfoRow
        icon={<Languages size={24} color={theme.colors.backgroundDark} />}
        text={languages.join(", ")}
      />
    </View>
  </View>
));

ThingsToKnow.displayName = "ThingsToKnow";

interface InfoRowProps {
  icon: React.ReactNode;
  text: string;
}

const InfoRow = memo(({ icon, text }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>{icon}</View>
    <Text variant="body" style={styles.infoText}>
      {text}
    </Text>
  </View>
));

InfoRow.displayName = "InfoRow";

interface MeetArtistProps {
  name: string;
  socials: typeof profileDetails.socials;
}

const MeetArtist = memo(({ name, socials }: MeetArtistProps) => {
  const socialLinks = [
    { label: "LinkedIn", url: socials.linkedin, icon: Link },
    { label: "Instagram", url: socials.instagram, icon: AtSign },
    { label: "Website", url: socials.website, icon: Globe2 },
  ];

  return (
    <View style={styles.section}>
      <Text variant="h3" style={styles.sectionTitle}>
        Meet {name}
      </Text>
      <View style={styles.socialRow}>
        {socialLinks.map(({ label, url, icon: Icon }) => (
          <SocialButton
            key={label}
            accessibilityLabel={label}
            onPress={() => Linking.openURL(url)}
          >
            <Icon size={20} color={theme.colors.textInverse} />
          </SocialButton>
        ))}
      </View>
    </View>
  );
});

MeetArtist.displayName = "MeetArtist";

interface SocialButtonProps {
  children: React.ReactNode;
  accessibilityLabel: string;
  onPress: () => void;
}

const SocialButton = memo(
  ({ children, accessibilityLabel, onPress }: SocialButtonProps) => (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.socialButton,
        pressed && styles.socialButtonPressed,
      ]}
    >
      {children}
    </Pressable>
  ),
);

SocialButton.displayName = "SocialButton";

const SectionDivider = memo(() => <View style={styles.divider} />);

SectionDivider.displayName = "SectionDivider";

interface BottomChatBarProps {
  bottomInset: number;
  onPress?: () => void;
}

const BottomChatBar = memo(({ bottomInset, onPress }: BottomChatBarProps) => (
  <View
    style={[styles.bottomBar, { paddingBottom: Math.max(bottomInset, 16) }]}
  >
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Chat now"
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chatButton,
        !onPress && styles.chatButtonDisabled,
        pressed && styles.chatButtonPressed,
      ]}
    >
      <MessageCircle size={24} color={theme.colors.textInverse} />
      <Text variant="button" style={styles.chatButtonText}>
        Chat now
      </Text>
    </Pressable>
  </View>
));

BottomChatBar.displayName = "BottomChatBar";

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    backgroundColor: theme.colors.background,
  },

  /* Hero */

  hero: {
    width: "100%",
    height: 500,
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.colors.backgroundSecondary,
  },

  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },

  heroTopScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 125,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },

  heroAction: {
    position: "absolute",
    top: 70,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroShareAction: {
    left: undefined,
    right: 20,
  },

  heroActionPressed: {
    opacity: 0.75,
  },

  /* Main content */

  content: {
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
  },

  profileHeader: {
    paddingVertical: theme.spacing.lg,
  },

  metaGroup: {
    marginTop: theme.spacing.xs,
    gap: theme.spacing.xs,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  artistName: {
    flexShrink: 1,
    color: theme.colors.textPrimary,
  },

  metaRow: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  metaIcon: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  metaText: {
    flex: 1,
    color: theme.colors.textSecondary,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },

  section: {
    paddingVertical: theme.spacing.lg,
  },

  sectionTitle: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },

  aboutCopy: {
    gap: theme.spacing.sm,
  },

  bodyText: {
    color: theme.colors.textPrimary,
  },

  knowList: {
    gap: theme.spacing.sm,
  },

  infoRow: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
  },

  infoIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  infoText: {
    flex: 1,
    color: theme.colors.textSecondary,
  },

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.lg,
  },

  socialButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.backgroundDark,
    alignItems: "center",
    justifyContent: "center",
  },

  socialButtonPressed: {
    opacity: 0.65,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },

  chatButton: {
    minHeight: 52,
    borderRadius: theme.radii.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },

  chatButtonDisabled: {
    opacity: 0.9,
  },

  chatButtonPressed: {
    backgroundColor: theme.colors.primaryPressed,
  },

  chatButtonText: {
    color: theme.colors.textInverse,
  },
});
