import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { Input } from '../../atoms/Input';
import { InputProps } from '../../atoms/Input/Input.types';
import { theme } from '../../../theme';

export interface FormFieldProps extends InputProps {
  label: string;
  errorMessage?: string;
}

/**
 * MOLECULE: FormField
 * -------------------------------------------------------
 * A molecule = 2+ atoms combined for a single purpose.
 * Here: Text (label) + Input + Text (error) = one reusable
 * form field. Screens use THIS, not raw Input/Text directly,
 * whenever they need a labeled field.
 */
export const FormField: React.FC<FormFieldProps> = ({ label, errorMessage, ...inputProps }) => {
  const hasError = Boolean(errorMessage);

  return (
    <View style={styles.container}>
      <Text variant="bodySmall" color="textSecondary" style={styles.label}>
        {label}
      </Text>
      <Input hasError={hasError} {...inputProps} />
      {hasError && (
        <Text variant="caption" color="error" style={styles.error}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xxs,
  },
  error: {
    marginTop: theme.spacing.xxs,
  },
});
