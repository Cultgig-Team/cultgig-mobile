import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Skill Bio (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 111". Optional step — has a "Skip for now"
 * link, so Continue isn't gated on the field being filled.
 */
const MAX_WORDS = 400;

interface SkillBioScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const SkillBioScreen: React.FC<SkillBioScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [bio, setBio] = useState(answers.skillBio ?? '');

  const wordCount = bio.trim() === '' ? 0 : bio.trim().split(/\s+/).length;

  const handleChangeText = (text: string) => {
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    if (words.length <= MAX_WORDS) {
      setBio(text);
    }
  };

  const handleContinue = () => {
    setAnswer('skillBio', bio.trim());
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
        Tell us about yourself & also about your skill
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        A short bio helps business to understand your better
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