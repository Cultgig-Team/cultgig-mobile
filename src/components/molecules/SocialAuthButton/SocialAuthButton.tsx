import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { theme } from '../../../theme';
import { SocialAuthButtonProps } from './SocialAuthButton.types';

/**
 * MOLECULE: SocialAuthButton
 * -------------------------------------------------------
 * "Continue with Mobile" / "Continue with Google" buttons on
 * the Sign Up screen (Figma node "Artist 123"). Distinct shape
 * from the primary pill Button atom — small radius (8px),
 * white bg, bordered — so it's its own molecule rather than a
 * Button variant.
 */
export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({ label, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <Text variant="titleMd">{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    height: 54,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.surface,
  },
  pressed: {
    opacity: 0.7,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
