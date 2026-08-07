import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { theme } from '../../../theme';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

/**
 * ATOM: Input
 * -------------------------------------------------------
 * Single text input used everywhere. Handles focus + error
 * border states from theme tokens automatically.
 */
export const Input: React.FC<InputProps> = ({ hasError = false, style, onFocus, onBlur, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={theme.colors.textDisabled}
      style={[
        inputStyles.base,
        isFocused && inputStyles.focused,
        hasError && inputStyles.error,
        style,
      ]}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      {...rest}
    />
  );
};
