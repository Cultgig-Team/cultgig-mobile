import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { ImageUploadSlot } from '../../components/molecules/ImageUploadSlot';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Business Photos (Client branch)
 * -------------------------------------------------------
 * Seventh and final question after OTP verify for the Client
 * path, "Hey, please upload more pictures about business".
 * Same 2x2 upload grid shape as the Artist branch's
 * PortfolioUploadScreen, writes to workSampleUris instead of
 * portfolioUris. All optional — has "Skip for now".
 */
interface BusinessPhotosScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const BusinessPhotosScreen: React.FC<BusinessPhotosScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [uris, setUris] = useState<(string | undefined)[]>(
    answers.workSampleUris ?? [undefined, undefined, undefined, undefined]
  );

  const handleContinue = () => {
    setAnswer('workSampleUris', uris.filter((u): u is string => Boolean(u)));
    onContinue();
  };

  const pickSlot = (index: number) => {
    // TODO: wire expo-image-picker here, then:
    // setUris((prev) => prev.map((u, i) => (i === index ? result.uri : u)));
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
        Hey, please upload more pictures about business
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Upload any your best 4 work samples, it can be photo, videos or audios
      </Text>

      <View style={styles.grid}>
        {uris.map((uri, index) => (
          <ImageUploadSlot key={index} uri={uri} onPress={() => pickSlot(index)} />
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