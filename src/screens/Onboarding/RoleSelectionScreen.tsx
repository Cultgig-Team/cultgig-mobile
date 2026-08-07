import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { RoleOptionCard } from '../../components/molecules/RoleOptionCard';
import { OnboardingTemplate } from '../../components/templates/OnboardingTemplate';
import { useOnboardingStore, PrimaryIntent } from '../../store/onboardingStore';
import { theme } from '../../theme';

/**
 * SCREEN: Role Selection
 * -------------------------------------------------------
 * Figma node "Artist 120/121" / "Artist 104". The pivotal
 * branching screen — whichever role the user selects here
 * decides which downstream question set (Artist vs Client)
 * they'll see next.
 */
interface RoleSelectionScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onBack, onContinue }) => {
  const setPrimaryIntent = useOnboardingStore((state) => state.setPrimaryIntent);
  const [selected, setSelected] = useState<PrimaryIntent | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setPrimaryIntent(selected);
    onContinue();
  };

  return (
    <OnboardingTemplate
      showBack
      onBackPress={onBack}
      primaryButtonLabel="Continue"
      onPrimaryPress={handleContinue}
      primaryButtonDisabled={!selected}
    >
      <Text variant="h1" style={styles.title}>
        Hey, how do you want to get started ?
      </Text>
      <Text variant="body" color="textSecondary" style={styles.subtitle}>
        Choose your identity type to help us to setup your profile
      </Text>

      <View style={styles.cards}>
        <RoleOptionCard
          roleLabel="Artist"
          description="I'm looking to get my 1st project"
          selected={selected === 'artist'}
          onPress={() => setSelected('artist')}
        />
        <RoleOptionCard
          roleLabel="Client"
          description="I'm looking to hire Artists"
          selected={selected === 'client'}
          onPress={() => setSelected('client')}
        />
      </View>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing['3xl'],
  },
  cards: {
    gap: theme.spacing.md,
  },
});