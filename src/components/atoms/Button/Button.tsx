import React from 'react';
import { Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '../Text/Text';
import { theme } from '../../../theme';
import { buttonStyles, sizeStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

/**
 * ATOM: Button
 * -------------------------------------------------------
 * The single button used everywhere in the app. Never build
 * a one-off button in a screen — extend this one instead
 * (add a variant/size here if a new style is needed).
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  style, // pulled out so it merges into the array below instead of
         // overwriting it when spread via ...pressableProps
  ...pressableProps
}) => {
  const textColorStyle = {
    primary: buttonStyles.textPrimary,
    secondary: buttonStyles.textSecondary,
    outline: buttonStyles.textOutline,
    ghost: buttonStyles.textGhost,
  }[variant];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      {...pressableProps}
      style={({ pressed }) => [
        buttonStyles.base,
        buttonStyles[variant],
        sizeStyles[size],
        fullWidth && buttonStyles.fullWidth,
        variant === 'primary' && isDisabled && buttonStyles.primaryDisabled,
        variant !== 'primary' && isDisabled && buttonStyles.disabled,
        pressed && !isDisabled && styles.pressed,
        // caller-provided style (e.g. LoginScreen's marginTop) is
        // appended last so it ADDS to the computed style, never replaces it
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.textInverse : theme.colors.primary}
        />
      ) : (
        <Text variant="button" style={textColorStyle}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
});