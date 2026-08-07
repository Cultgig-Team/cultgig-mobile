import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { useAuthStore } from '../../store/authStore';
import { theme } from '../../theme';

export const ProfileScreen = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text variant="h1">Profile</Text>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          {isAuthenticated ? `Signed in as ${user?.name}` : 'Not signed in yet'}
        </Text>

        {isAuthenticated && (
          <Button label="Log Out" variant="outline" onPress={logout} style={styles.button} />
        )}
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
    padding: theme.spacing.md,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  button: {
    marginTop: theme.spacing.md,
  },
});
