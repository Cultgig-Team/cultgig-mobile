import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { FormField } from '../../components/molecules/FormField';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../theme';

/**
 * This screen is the clearest example of the atomic pattern
 * end-to-end: Text (atom) + FormField (molecule, itself made
 * of Text + Input atoms) + Button (atom) = a full screen with
 * zero one-off styling of inputs/buttons.
 */
export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = () => {
    // Wire this to your real auth service once the API is ready
    setUser({ id: '1', name: 'Demo Artist', email });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text variant="h1" style={styles.title}>
          Welcome back
        </Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          Log in to keep building your portfolio
        </Text>

        <FormField
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <FormField
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button label="Log In" onPress={handleLogin} fullWidth style={styles.loginButton} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
  },
  loginButton: {
    marginTop: theme.spacing.sm,
  },
});
