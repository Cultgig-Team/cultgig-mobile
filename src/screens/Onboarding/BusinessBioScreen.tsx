import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Business Bio (Client branch)
 * -------------------------------------------------------
 * Fourth question after OTP verify for the Client path.
 * Mirrors the Artist branch's SkillBioScreen (same word-count
 * pattern), but 300 words instead of 400, and writes to
 * businessBio rather than skillBio. Optional — has "Skip for now".
 */
const MAX_WORDS = 300;

interface BusinessBioScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const BusinessBioScreen: React.FC<BusinessBioScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [bio, setBio] = useState(answers.businessBio ?? '');

  const wordCount = bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length;

  const handleChangeText = (text: string) => {
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    if (words.length <= MAX_WORDS) {
      setBio(text);
    }
  };

  const handleContinue = () => {
    setAnswer('businessBio', bio.trim());
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
        Tell us about your whole business
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        A short bio helps artists to understand your better
      </Text>

      <Input
        placeholder="Write your short bio"
        value={bio}
        onChangeText={handleChangeText}
        multiline
        numberOfLines={6}
        style={styles.textArea}
      />
      <Text variant="body" style={styles.wordCount}>
        {wordCount}/{MAX_WORDS} words
      </Text>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
  },
  textArea: {
    height: 158,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.md,
  },
  wordCount: {
    textAlign: 'right',
    marginTop: theme.spacing.sm,
  },
});