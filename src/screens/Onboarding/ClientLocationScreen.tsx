import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { FormField } from '../../components/molecules/FormField';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Location (Client branch)
 * -------------------------------------------------------
 * Third question after OTP verify for the Client path. City is
 * required (gates Continue); Business Address is explicitly
 * marked "(Optional)" in the design. No skip.
 */
interface ClientLocationScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
}

export const ClientLocationScreen: React.FC<ClientLocationScreenProps> = ({
  progress,
  onBack,
  onContinue,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [city, setCity] = useState(answers.city ?? '');
  const [businessAddress, setBusinessAddress] = useState(answers.businessAddress ?? '');

  const handleContinue = () => {
    setAnswer('city', city.trim());
    setAnswer('businessAddress', businessAddress.trim());
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
        We'll show you relevant artists
      </Text>

      <Input
        placeholder="Type your city name"
        value={city}
        onChangeText={setCity}
        style={styles.cityInput}
      />

      <FormField
        label="Business Address (Optional)"
        placeholder="Type your detailed address"
        value={businessAddress}
        onChangeText={setBusinessAddress}
        multiline
        numberOfLines={4}
        style={styles.addressField}
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
  addressField: {
    height: 110,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.md,
  },
});