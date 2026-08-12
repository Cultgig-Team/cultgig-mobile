import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { OptionListItem } from '../../components/molecules/OptionListItem';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore, OnboardingAnswers } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Experience (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 118", "How would you tell your experience?".
 * No skip — single required selection.
 */
type ExperienceLevel = NonNullable<OnboardingAnswers['experienceLevel']>;

const OPTIONS: { key: ExperienceLevel; title: string; subtitle: string }[] = [
  { key: 'fresher', title: 'Fresher', subtitle: '0-1 years' },
  { key: 'intermediate', title: 'Intermediate', subtitle: '1-2 years' },
  { key: 'experienced', title: 'Experienced', subtitle: '3-7 years' },
];

interface ExperienceScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
}

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ progress, onBack, onContinue }) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [selected, setSelected] = useState<ExperienceLevel | undefined>(answers.experienceLevel);

  const handleContinue = () => {
    if (!selected) return;
    setAnswer('experienceLevel', selected);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      primaryButtonDisabled={!selected}
    >
      <Text variant="h1" style={styles.title}>
        How would you tell your experience ?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        This helps businesses understand your background
      </Text>

      {OPTIONS.map((option) => (
        <OptionListItem
          key={option.key}
          title={option.title}
          subtitle={option.subtitle}
          selected={selected === option.key}
          onPress={() => setSelected(option.key)}
        />
      ))}
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
