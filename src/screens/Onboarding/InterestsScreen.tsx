import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { OptionListItem } from '../../components/molecules/OptionListItem';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Interests (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 117", "What types of gigs interests you?".
 * Multi-select — has "Skip for now". Last step of the Artist
 * onboarding branch.
 */
const GIG_TYPES = [
  'Live Performances',
  'Corporate Events',
  'Weddings',
  'Personal Services',
  'Clubs/Bars',
  'Festivals',
];

interface InterestsScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const InterestsScreen: React.FC<InterestsScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>(answers.gigTypes ?? []);

  const toggle = (type: string) =>
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleContinue = () => {
    setAnswer('gigTypes', selected);
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
        Hey, what types of gigs interests you ?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Select any options to get better recommendation
      </Text>

      {GIG_TYPES.map((type) => (
        <OptionListItem
          key={type}
          title={type}
          selected={selected.includes(type)}
          onPress={() => toggle(type)}
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
