import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { ImageUploadSlot } from '../../components/molecules/ImageUploadSlot';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Portfolio Upload (Artist branch)
 * -------------------------------------------------------
 * Figma node "Artist 114". 4 sample slots (photo/video/audio),
 * all optional — has "Skip for now".
 */
interface PortfolioUploadScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const PortfolioUploadScreen: React.FC<PortfolioUploadScreenProps> = ({
  progress,
  onBack,
  onContinue,
  onSkip,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [uris, setUris] = useState<(string | undefined)[]>(
    answers.portfolioUris ?? [undefined, undefined, undefined, undefined]
  );

  const handleContinue = () => {
    setAnswer('portfolioUris', uris.filter((u): u is string => Boolean(u)));
    onContinue();
  };

  const pickSlot = (index: number) => {
    // TODO: wire expo-image-picker / expo-document-picker here, then:
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
        Hey, please showcase your best work
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Upload any our 4 work samples, it can be photo, videos or audios
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
    justifyContent: 'space-between',
  },
});
