import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/atoms/Text';
import { OTPInput } from '../../components/molecules/OTPInput';
import { theme } from '../../theme';

/**
 * SCREEN: OTP Verification
 * -------------------------------------------------------
 * Figma node "Artist 124". Auto-submits once all 5 digits are
 * entered — no explicit "Continue" button in the design.
 */
interface OTPScreenProps {
  email: string;
  onBack: () => void;
  onResendCode: () => void;
  onVerify: (code: string) => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({ email, onBack, onResendCode, onVerify }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '']);

  const handleChange = (next: string[]) => {
    setDigits(next);
    if (next.every((d) => d !== '')) {
      onVerify(next.join(''));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
        <Text variant="h2">‹</Text>
      </Pressable>

      <View style={styles.content}>
        <Text variant="h1" style={styles.title}>
          We sent you code
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Please enter the 5-digit we sent to{'\n'}
          <Text variant="titleMd">{email}</Text>
        </Text>

        <View style={styles.otpWrapper}>
          <OTPInput value={digits} onChange={handleChange} />
        </View>

        <Pressable onPress={onResendCode} style={styles.resendButton}>
          <Text variant="captionBold" color="textSecondary">
            Get a new code
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
  },
  otpWrapper: {
    marginBottom: theme.spacing.lg,
  },
  resendButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
});
