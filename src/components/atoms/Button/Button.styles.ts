import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { ButtonSize } from './Button.types';

/**
 * All values come from `theme` — nothing here is a raw magic
 * number/color. This is the rule to follow for EVERY component
 * you build going forward.
 */
export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.full,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryDisabled: {
    backgroundColor: theme.colors.primaryDisabled,
  },
  secondary: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  outline: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: theme.colors.transparent,
  },

  // Text colors per variant
  textPrimary: {
    color: theme.colors.textInverse,
  },
  textSecondary: {
    color: theme.colors.textPrimary,
  },
  textOutline: {
    color: theme.colors.primary,
  },
  textGhost: {
    color: theme.colors.primary,
  },
});

export const sizeStyles: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.md },
  md: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg },
  lg: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl },
};
