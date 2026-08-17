import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { FormField } from '../../components/molecules/FormField';
import { PhotoUploadAvatar } from '../../components/molecules/PhotoUploadAvatar';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Personal Bio (Client branch)
 * -------------------------------------------------------
 * First question after OTP verify for the Client path. Same
 * shared fields as the Artist branch's BasicBioScreen
 * (photoUri, fullName) — just a different heading, since this
 * is the client's own personal profile, not their business yet.
 * No skip — full name is required to continue.
 */
interface PersonalBioScreenProps {
  progress: number;
  onBack: () => void;
  onContinue: () => void;
}

export const PersonalBioScreen: React.FC<PersonalBioScreenProps> = ({
  progress,
  onBack,
  onContinue,
}) => {
  const { answers, setAnswer } = useOnboardingStore();
  const [fullName, setFullName] = useState(answers.fullName ?? '');
  const [photoUri, setPhotoUri] = useState(answers.photoUri);

  const handleContinue = () => {
    setAnswer('fullName', fullName.trim());
    setAnswer('photoUri', photoUri);
    onContinue();
  };

  return (
    <OnboardingTemplate
      progress={progress}
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      primaryButtonDisabled={fullName.trim().length === 0}
    >
      <Text variant="h1" style={styles.title}>
        Hey, let's start with your personal bio
      </Text>

      <PhotoUploadAvatar
        uri={photoUri}
        onPress={() => {
          // TODO: wire expo-image-picker here, then setPhotoUri(result.uri)
        }}
      />

      <FormField
        label="Full Name"
        placeholder="Type your Name"
        value={fullName}
        onChangeText={setFullName}
        autoCapitalize="words"
      />
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.xl,
  },
});