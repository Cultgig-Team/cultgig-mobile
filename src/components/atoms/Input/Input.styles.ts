import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const inputStyles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },
  focused: {
    borderColor: theme.colors.borderFocused,
  },
  error: {
    borderColor: theme.colors.error,
  },
});
