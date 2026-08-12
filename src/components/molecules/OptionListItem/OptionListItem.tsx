import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { theme } from '../../../theme';

export interface OptionListItemProps {
  title: string;
  subtitle?: string;
  selected?: boolean;
  onPress: () => void;
}

/**
 * MOLECULE: OptionListItem
 * -------------------------------------------------------
 * Generic bordered, selectable row. Covers the "Within my city" /
 * "Yes, I'm open to travel anywhere" rows (Artist 110), the
 * experience-level rows (Artist 118), and the gig-type interest
 * rows (Artist 117) — same shape everywhere: title + optional
 * subtitle, border turns primary color when selected.
 *
 * Distinct from RoleOptionCard, which has the highlighted
 * "Artist"/"Client" word + trailing arrow — this one is plainer.
 */
export const OptionListItem: React.FC<OptionListItemProps> = ({
  title,
  subtitle,
  selected = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={styles.textBlock}>
        <Text variant="titleMd">{title}</Text>
        {subtitle && (
          <Text variant="caption" color="textTertiary" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  rowSelected: {
    borderColor: theme.colors.primary,
  },
  textBlock: {
    gap: theme.spacing.xxs,
  },
  subtitle: {
    marginTop: theme.spacing.xxs,
  },
});
