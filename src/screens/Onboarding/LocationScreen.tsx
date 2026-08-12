import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { OptionListItem } from '../../components/molecules/OptionListItem';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore, OnboardingAnswers } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Location (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 110". "Willing to travel?" is explicitly
 * marked optional in the design, so only the city field gates
 * the Continue button.
 */
type TravelPreference = NonNullable<OnboardingAnswers['travelPreference']>;

interface LocationScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
}

export const LocationScreen: React.FC<LocationScreenProps> = ({ progress, onBack, onContinue }) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [city, setCity] = useState(answers.city ?? '');
  const [travelPreference, setTravelPreference] = useState<TravelPreference | undefined>(
    answers.travelPreference
  );

  const handleContinue = () => {
    setAnswer('city', city.trim());
    setAnswer('travelPreference', travelPreference);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      primaryButtonDisabled={city.trim().length === 0}
    >
      <Text variant="h1" style={styles.title}>
        Hey, where are you based?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        We'll show you relevant opportunities
      </Text>

      <Input
        placeholder="Type your city name"
        value={city}
        onChangeText={setCity}
        style={styles.cityInput}
      />

      <Text variant="bodySmall" color="textSecondary" style={styles.sectionLabel}>
        Willing to travel ? (Optional)
      </Text>
      <OptionListItem
        title="Within my city"
        selected={travelPreference === 'withinCity'}
        onPress={() => setTravelPreference('withinCity')}
      />
      <OptionListItem
        title="Yes, I'm open to travel anywhere"
        selected={travelPreference === 'openToTravel'}
        onPress={() => setTravelPreference('openToTravel')}
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
  cityInput: {
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    marginBottom: theme.spacing.sm,
  },
});
