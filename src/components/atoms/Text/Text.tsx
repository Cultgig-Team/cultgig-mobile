import React from 'react';
import { Text as RNText } from 'react-native';
import { theme } from '../../../theme';
import { TextProps } from './Text.types';

/**
 * ATOM: Text
 * -------------------------------------------------------
 * Wraps RN's <Text> so every bit of text in the app pulls its
 * font size/weight/line-height from the typography scale.
 * Never use raw RN <Text> in screens — use this instead.
 *
 * Usage:
 *   <Text variant="h1">Welcome</Text>
 *   <Text variant="body" color="textSecondary">Subtitle</Text>
 */
export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'textPrimary',
  style,
  children,
  ...rest
}) => {
  return (
    <RNText
      style={[
        theme.typography[variant],
        { color: theme.colors[color] },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
