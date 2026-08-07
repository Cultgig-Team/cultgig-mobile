import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from '../../atoms/Text';
import { theme } from '../../../theme';

export interface RoleOptionCardProps {
  roleLabel: string; // "Artist" or "Client"
  description: string; // "I'm looking to get my 1st project"
  selected?: boolean;
  onPress: () => void;
}

/**
 * MOLECULE: RoleOptionCard
 * -------------------------------------------------------
 * The "I'm a [Artist/Client]" selectable card from the Role
 * Selection screen (confirmed in Figma: bordered card, role
 * word highlighted in brand color, arrow on the right,
 * border/bg change when selected).
 */
export const RoleOptionCard: React.FC<RoleOptionCardProps> = ({
  roleLabel,
  description,
  selected = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={styles.textBlock}>
        <Text variant="titleLg">
          {`I'm a `}
          <Text variant="titleLg" color="primary">
            {roleLabel}
          </Text>
        </Text>
        <Text variant="body" color="textTertiary" style={styles.description}>
          {description}
        </Text>
      </View>
      <Text variant="h2" color={selected ? 'primary' : 'textTertiary'}>
        →
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
  },
  textBlock: {
    flex: 1,
    gap: theme.spacing.xxs,
  },
  description: {
    marginTop: theme.spacing.xxs,
  },
});
