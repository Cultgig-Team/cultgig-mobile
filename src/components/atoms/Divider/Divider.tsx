import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../Text';
import { theme } from '../../../theme';

export interface DividerProps {
  label?: string;
}

/**
 * ATOM: Divider
 * -------------------------------------------------------
 * Plain horizontal rule, or a rule-label-rule row when a
 * label is passed (e.g. the "or" divider between auth methods
 * on the Sign Up screen).
 */
export const Divider: React.FC<DividerProps> = ({ label }) => {
  if (!label) {
    return <View style={styles.line} />;
  }

  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text variant="body" color="textTertiary" style={styles.label}>
        {label}
      </Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.textTertiary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  label: {
    flexShrink: 0,
  },
});
