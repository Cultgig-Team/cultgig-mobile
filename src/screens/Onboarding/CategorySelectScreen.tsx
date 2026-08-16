import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { CategoryGridCard } from '../../components/molecules/CategoryGridCard';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Category Select (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 112", "Hey, what do you do best?".
 * Single-select grid of skill categories.
 *
 * ⚠️ PLACEHOLDER ASSETS: assets/onboarding/categories/*.png are
 * solid-color placeholders (same situation as confirm-artist.png
 * in RoleConfirmationScreen). Export the real photos from Figma
 * and overwrite with the same filenames — no code change needed.
 */
const CATEGORIES: { key: string; label: string; image: number }[] = [
  { key: 'photographer', label: 'Photographer', image: require('../../../assets/onboarding/categories/Photographer.png') },
  { key: 'dancer', label: 'Dancer', image: require('../../../assets/onboarding/categories/Dancer.png') },
  { key: 'guitarist', label: 'Guitarist', image: require('../../../assets/onboarding/categories/Guitarist.png') },
  { key: 'painter', label: 'Painter', image: require('../../../assets/onboarding/categories/Painter.png') },
  { key: 'comedian', label: 'Comedian', image: require('../../../assets/onboarding/categories/Comedian.png') },
  { key: 'videographer', label: 'Videographer', image: require('../../../assets/onboarding/categories/Videographer.png') },
  { key: 'event-host', label: 'Event Host', image: require('../../../assets/onboarding/categories/Event-Host.png') },
  { key: 'singer', label: 'Singer', image: require('../../../assets/onboarding/categories/Singer.png') },
];

interface CategorySelectScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const CategorySelectScreen: React.FC<CategorySelectScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [selected, setSelected] = useState(answers.primarySkill);

  const handleContinue = () => {
    setAnswer('primarySkill', selected);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      primaryButtonDisabled={!selected}
      onSkipPress={onSkip}
    >
      <Text variant="h1" style={styles.title}>
        Hey, what do you do best?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Select any one according to your choice
      </Text>

      <View style={styles.grid}>
        {CATEGORIES.map((category) => (
          <CategoryGridCard
            key={category.key}
            label={category.label}
            image={category.image}
            selected={selected === category.key}
            onPress={() => setSelected(category.key)}
          />
        ))}
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
});