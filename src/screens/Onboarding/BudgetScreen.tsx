import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { RangeSlider } from '../../components/atoms/RangeSlider';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Budget (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 116", "What will be your per hour budget?".
 * No skip — everyone gets a default range even without touching
 * the slider.
 */
const MIN = 1000;
const MAX = 10000;

interface BudgetScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({ progress, onBack, onContinue }) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [range, setRange] = useState({
    min: answers.hourlyBudgetMin ?? MIN,
    max: answers.hourlyBudgetMax ?? MAX,
  });

  const handleContinue = () => {
    setAnswer('hourlyBudgetMin', range.min);
    setAnswer('hourlyBudgetMax', range.max);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
    >
      <Text variant="h1" style={styles.title}>
        What will be your per hour budget ?
      </Text>

      <View style={styles.rangeLabel}>
        <Text variant="titleLg">
          {`\u20B9${range.min.toLocaleString('en-IN')} - \u20B9${range.max.toLocaleString('en-IN')}`}
        </Text>
        <Text variant="caption" color="textTertiary">
          per hour service
        </Text>
      </View>

      <RangeSlider
        min={MIN}
        max={MAX}
        step={100}
        valueMin={range.min}
        valueMax={range.max}
        onChange={(min, max) => setRange({ min, max })}
      />
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.xl,
  },
  rangeLabel: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
});
