import React from 'react';
import { Pressable, Image, View, ImageSourcePropType, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../../atoms/Text';
import { theme } from '../../../theme';

export interface CategoryGridCardProps {
  label: string;
  image: ImageSourcePropType;
  selected?: boolean;
  onPress: () => void;
}

/**
 * Explicit pixel width for a 2-column grid, computed from the actual
 * screen width — NOT a '48%' percentage. Percentage widths on an Image
 * are unreliable once you drop in real (especially high-res 2x/3x)
 * photos on some Android renderers; the image's own pixel dimensions
 * can leak through and push the row wider than the screen. Computing
 * a fixed number here and applying it to both the card AND the image
 * guarantees 2 equal columns with a real gap, regardless of source
 * image resolution — resolution only affects sharpness, never layout
 * size, once width/height are explicit.
 */
const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_GAP = theme.spacing.md;
const SCREEN_PADDING = theme.spacing.md; // matches OnboardingTemplate's scrollContent padding
const CARD_WIDTH = (SCREEN_WIDTH - SCREEN_PADDING * 2 - GRID_GAP) / 2;

/**
 * MOLECULE: CategoryGridCard
 * -------------------------------------------------------
 * The "Photographer / Dancer / Guitarist..." image tiles on
 * the "What do you do best?" screen (Artist 112). Rendered
 * two-up in a grid by the screen. Image gets a primary-color
 * ring when selected.
 */
export const CategoryGridCard: React.FC<CategoryGridCardProps> = ({
  label,
  image,
  selected = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.labelFooter}>
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Image + label live inside ONE bordered card (confirmed in Figma —
  // the border/selected-highlight wraps both, not just the image).
  card: {
    width: CARD_WIDTH,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  image: {
    // Explicit numeric width + height, not '100%' + aspectRatio —
    // this is what actually forces a large source image down to the
    // card's real on-screen size instead of rendering at (or bleeding
    // toward) its native pixel dimensions.
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },
  labelFooter: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
});