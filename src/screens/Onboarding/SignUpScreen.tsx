import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone } from 'lucide-react-native';
import { Text } from '../../components/atoms/Text';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Divider } from '../../components/atoms/Divider';
import { SocialAuthButton } from '../../components/molecules/SocialAuthButton';
import { theme } from '../../theme';

/**
 * SCREEN: Sign Up
 * -------------------------------------------------------
 * Figma node "Artist 123". Shared by both Artist and Client
 * branches — the role was already picked & saved to the
 * onboarding store on the previous screens.
 *
 * ⚠️ PLACEHOLDER ASSET: `assets/icons/google.png` is currently
 * blank/transparent. Google's "G" logo is a fixed 4-color brand
 * mark — export the real one from Figma or Google's official brand
 * assets and overwrite that file — same filename, so no code
 * changes needed.
 */
const googleIcon = require('../../../assets/icons/google.png');

interface SignUpScreenProps {
  onContinueWithMobile: () => void;
  onContinueWithGoogle: () => void;
  onSignUpWithEmail: (email: string) => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onContinueWithMobile,
  onContinueWithGoogle,
  onSignUpWithEmail,
}) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text variant="logo" color="primary" style={styles.logo}>
          Cultgig
        </Text>

        <View style={styles.authOptions}>
          <SocialAuthButton
            label="Continue with Mobile"
            icon={<Smartphone size={22} color={theme.colors.textPrimary} />}
            onPress={onContinueWithMobile}
          />
          <SocialAuthButton
            label="Continue with Google"
            icon={<Image source={googleIcon} style={styles.googleIcon} resizeMode="contain" />}
            onPress={onContinueWithGoogle}
          />
        </View>

        <View style={styles.dividerWrapper}>
          <Divider label="or" />
        </View>

        <Text variant="titleMd" style={styles.emailLabel}>
          Email
        </Text>
        <Input
          placeholder="Type your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Button
          label="Sign Up"
          onPress={() => onSignUpWithEmail(email)}
          fullWidth
          disabled={!email.trim()}
          style={styles.signUpButton}
        />

        <Text variant="bodySmall" color="textPrimary" style={styles.terms}>
          By continuing you are agreeing to our Terms of Service &{' '}
          <Text variant="bodySmall" style={styles.termsLink}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing['3xl'],
  },
  logo: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  authOptions: {
    gap: theme.spacing.md,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  dividerWrapper: {
    marginVertical: theme.spacing.lg,
  },
  emailLabel: {
    marginBottom: theme.spacing.sm,
  },
  signUpButton: {
    marginTop: theme.spacing.xl,
  },
  terms: {
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});
