import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { PrimaryIntent } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Role Confirmation
 * -------------------------------------------------------
 * Figma nodes "Artist 106" (Artist copy) / "Artist 122" (Client copy).
 * Same layout for both roles — only the illustration, title, and
 * subtitle text change, so this is ONE component parameterized by
 * role rather than two near-duplicate screens.
 *
 * ⚠️ PLACEHOLDER ASSETS: `assets/onboarding/confirm-artist.png` and
 * `confirm-client.png` are currently solid-color placeholders. The
 * real illustrations are ~60-layer freepik vector graphics — export
 * each as a single flattened PNG from Figma desktop (right-click the
 * illustration group -> Export -> PNG @2x) and overwrite these files
 * with the real ones — same filenames, so no code changes needed.
 */

const ILLUSTRATIONS: Record<PrimaryIntent, number> = {
  artist: require('../../../assets/onboarding/confirm-artist.png'),
  client: require('../../../assets/onboarding/confirm-client.png'),
};

const COPY: Record<PrimaryIntent, { title: string; subtitle: string; asset: string }> = {
  artist: {
    title: "Great choice! Let's set up your Artist account",
    subtitle: 'Easy, automated gig hunt for your daily goals, money and motivation starting',
    asset: 'confirm-artist.png',
  },
  client: {
    title: "Great choice! Let's set up your Client account",
    subtitle: 'Easy, automated gig hunt for your daily goals, money and motivation starting',
    asset: 'confirm-client.png',
  },
};

interface RoleConfirmationScreenProps {
  role: PrimaryIntent;
  onBack: () => void;
  onContinue: () => void;
}

export const RoleConfirmationScreen: React.FC<RoleConfirmationScreenProps> = ({
  role,
  onBack,
  onContinue,
}) => {
  const copy = COPY[role];
  const illustration = ILLUSTRATIONS[role];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
        <Text variant="h2">‹</Text>
      </Pressable>

      <View style={styles.illustrationWrapper}>
        <Image source={illustration} style={styles.illustration} resizeMode="contain" />
      </View>

      <View style={styles.textBlock}>
        <Text variant="confirmTitle" style={styles.title}>
          {copy.title}
        </Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          {copy.subtitle}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Continue" onPress={onContinue} fullWidth />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
    height: 250,
  },
  illustration: {
    width: 294,
    height: 250,
  },
  textBlock: {
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
});
