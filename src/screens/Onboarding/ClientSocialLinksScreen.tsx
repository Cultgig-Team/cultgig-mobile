import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { FormField } from '../../components/molecules/FormField';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore, OnboardingAnswers } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Social Links (Client branch)
 * -------------------------------------------------------
 * Sixth question after OTP verify for the Client path. Same
 * shape and same `socialLinks` store field as the Artist
 * branch's SocialLinksScreen — one shared field for both
 * branches is fine since a user only ever completes one branch.
 * All three fields optional — has "Skip for now".
 */
type SocialLinks = NonNullable<OnboardingAnswers['socialLinks']>;

interface ClientSocialLinksScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const ClientSocialLinksScreen: React.FC<ClientSocialLinksScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [links, setLinks] = useState<SocialLinks>(answers.socialLinks ?? {});

  const update = (key: keyof SocialLinks, value: string) =>
    setLinks((prev) => ({ ...prev, [key]: value }));

  const handleContinue = () => {
    setAnswer('socialLinks', links);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      onSkipPress={onSkip}
    >
      <Text variant="h1" style={styles.title}>
        Please, add your social media links
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Helps businesses check out more about your work
      </Text>

      <FormField
        label="Instagram"
        placeholder="Type your instagram id"
        autoCapitalize="none"
        value={links.instagram ?? ''}
        onChangeText={(v) => update('instagram', v)}
      />
      <FormField
        label="Youtube"
        placeholder="Type your youtube id"
        autoCapitalize="none"
        value={links.youtube ?? ''}
        onChangeText={(v) => update('youtube', v)}
      />
      <FormField
        label="Website"
        placeholder="Type your website link"
        autoCapitalize="none"
        keyboardType="url"
        value={links.website ?? ''}
        onChangeText={(v) => update('website', v)}
      />
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.lg,
  },
});