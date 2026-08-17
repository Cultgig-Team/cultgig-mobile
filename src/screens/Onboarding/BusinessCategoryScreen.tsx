import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { CategoryGridCard } from '../../components/molecules/CategoryGridCard';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Business Category (Client branch)
 * -------------------------------------------------------
 * Fifth question after OTP verify for the Client path,
 * "What best describe your business?". Reuses the same
 * CategoryGridCard molecule as the Artist branch's
 * CategorySelectScreen (Artist 112) — single-select image grid,
 * same card+footer+selected-border shape, different data source.
 *
 * ⚠️ PLACEHOLDER ASSETS: assets/onboarding/business-categories/*.png
 * are solid-color placeholders, same situation as the Artist skill
 * category images. Export the real photos from Figma and overwrite
 * with the same filenames — no code change needed.
 */
const BUSINESS_CATEGORIES: { key: string; label: string; image: number }[] = [
  { key: 'personal-use', label: 'Personal Use', image: require('../../../assets/onboarding/business-categories/Personal-Use.png') },
  { key: 'cafe', label: 'Cafe', image: require('../../../assets/onboarding/business-categories/Cafe.png') },
  { key: 'restaurant', label: 'Restaurant', image: require('../../../assets/onboarding/business-categories/Restraunt.png') },
  { key: 'club', label: 'Club', image: require('../../../assets/onboarding/business-categories/Club.png') },
  { key: 'hotel', label: 'Hotel', image: require('../../../assets/onboarding/business-categories/Hotel.png') },
  { key: 'brand-corporate', label: 'Brand/Corporate', image: require('../../../assets/onboarding/business-categories/Brand-Corporate.png') },
];

interface BusinessCategoryScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const BusinessCategoryScreen: React.FC<BusinessCategoryScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [selected, setSelected] = useState(answers.businessCategory);

  const handleContinue = () => {
    setAnswer('businessCategory', selected);
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
        What best describe your business?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Select any one according to your choice
      </Text>

      <View style={styles.grid}>
        {BUSINESS_CATEGORIES.map((category) => (
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
