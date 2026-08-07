import React from 'react';
import { View, ImageBackground, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { theme } from '../../theme';

/**
 * SCREEN: Welcome
 * -------------------------------------------------------
 * First screen of the onboarding flow (Figma node "Artist 119"
 * / "Artist 103"). Hero photo background with a bottom-up dark
 * gradient, headline, and CTA.
 */
const welcomeBg = require('../../../assets/onboarding/welcome-bg.png');

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogIn: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onLogIn }) => {
  const content = (
    <>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.content}>
          <Text variant="headline" color="textInverse" style={styles.headline}>
            Where Artists & Gigs Get Discovered
          </Text>
          <Text variant="body" color="textInverse" style={styles.subtitle}>
            Connect with amazing gigs & artists to grow your career
          </Text>

          <Button label="Get started" onPress={onGetStarted} fullWidth style={styles.button} />

          <Pressable onPress={onLogIn} hitSlop={8} style={styles.loginRow}>
            <Text variant="body" color="textInverse">
              Already have an account?{' '}
              <Text variant="titleMd" color="primary">
                Log in
              </Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );

  return (
    <ImageBackground source={welcomeBg} style={styles.container} resizeMode="cover">
      {content}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  headline: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
    opacity: 0.8,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  loginRow: {
    alignItems: 'center',
  },
});