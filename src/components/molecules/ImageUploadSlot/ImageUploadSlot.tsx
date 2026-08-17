import React from 'react';
import { Pressable, Image, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'lucide-react-native';
import { theme } from '../../../theme';

export interface ImageUploadSlotProps {
  uri?: string;
  onPress: () => void;
}

/**
 * Explicit pixel width for a 2-column grid — same fix as
 * CategoryGridCard. '48%' on its own doesn't reliably resolve to a
 * real 2-up layout in every flex context; computing a fixed number
 * from the actual screen width guarantees 2 equal columns with a
 * real gap every time.
 */
const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_GAP = theme.spacing.md;
const SCREEN_PADDING = theme.spacing.md; // matches OnboardingTemplate's scrollContent padding
const SLOT_SIZE = (SCREEN_WIDTH - SCREEN_PADDING * 2 - GRID_GAP) / 2;

/**
 * MOLECULE: ImageUploadSlot
 * -------------------------------------------------------
 * One dashed-border tile in the 2x2 "showcase your best work" /
 * "upload more pictures about business" grid (Artist 114,
 * Client business photos). The screen renders 4 of these.
 */
export const ImageUploadSlot: React.FC<ImageUploadSlotProps> = ({ uri, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.slot} accessibilityRole="button">
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Camera size={22} color={theme.colors.textTertiary} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slot: {
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});