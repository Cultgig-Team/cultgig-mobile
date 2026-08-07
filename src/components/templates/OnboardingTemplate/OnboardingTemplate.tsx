import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../atoms/Text';
import { Button } from '../../atoms/Button';
import { ProgressBar } from '../../atoms/ProgressBar';
import { theme } from '../../../theme';
import { OnboardingTemplateProps } from './OnboardingTemplate.types';

/**
 * TEMPLATE: OnboardingTemplate
 * -------------------------------------------------------
 * The shared shell for every step in the onboarding flow —
 * both the Artist branch and the Client branch use this SAME
 * template. Only the `children` (the actual question content)
 * differs per step. This is the whole point of the atomic
 * pattern here: when the designer tweaks the shell (e.g. moves
 * the progress bar, changes button spacing), it's a one-file
 * change that updates every onboarding screen at once.
 */
export const OnboardingTemplate: React.FC<OnboardingTemplateProps> = ({
  progress,
  showBack = true,
  onBackPress,
  children,
  primaryButtonLabel,
  onPrimaryPress,
  primaryButtonDisabled = false,
  primaryButtonLoading = false,
  onSkipPress,
}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        {showBack && (
          <Pressable onPress={onBackPress} hitSlop={12} style={styles.backButton}>
            <Text variant="h2">‹</Text>
          </Pressable>
        )}
        {progress !== undefined && (
          <View style={styles.progressWrapper}>
            <ProgressBar progress={progress} />
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={primaryButtonLabel}
          onPress={onPrimaryPress}
          disabled={primaryButtonDisabled}
          loading={primaryButtonLoading}
          fullWidth
        />
        {onSkipPress && (
          <Pressable onPress={onSkipPress} hitSlop={8} style={styles.skipButton}>
            <Text variant="titleMd" color="primary" style={styles.skipText}>
              Skip for now
            </Text>
          </Pressable>
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
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    marginTop: theme.spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  footer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  skipText: {
    textAlign: 'center',
  },
});
