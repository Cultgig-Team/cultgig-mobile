import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { FormField } from '../../components/molecules/FormField';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Basic Business Bio (Client branch)
 * -------------------------------------------------------
 * Second question after OTP verify for the Client path. Both
 * fields are explicitly marked "(Optional)" in the design, so
 * Continue is never gated — has "Skip for now" too.
 */
interface BusinessBasicBioScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const BusinessBasicBioScreen: React.FC<BusinessBasicBioScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [businessEmail, setBusinessEmail] = useState(answers.businessEmail ?? '');
  const [businessMobile, setBusinessMobile] = useState(answers.businessMobile ?? '');

  const handleContinue = () => {
    setAnswer('businessEmail', businessEmail.trim());
    setAnswer('businessMobile', businessMobile.trim());
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
        Hey, let's start with your basic business bio
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Tell artists about your businesses
      </Text>

      <FormField
        label="Business Email (Optional)"
        placeholder="Type your business mail"
        value={businessEmail}
        onChangeText={setBusinessEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <FormField
        label="Business Mobile Number (Optional)"
        placeholder="Type your mobile number"
        value={businessMobile}
        onChangeText={setBusinessMobile}
        keyboardType="phone-pad"
      />
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
});