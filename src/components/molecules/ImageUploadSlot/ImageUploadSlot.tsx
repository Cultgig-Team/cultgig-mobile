import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { Upload } from 'lucide-react-native';
import { theme } from '../../../theme';

export interface ImageUploadSlotProps {
  uri?: string;
  onPress: () => void;
}

/**
 * MOLECULE: ImageUploadSlot
 * -------------------------------------------------------
 * One dashed-border tile in the 2x2 "showcase your best work"
 * grid (Artist 114). The screen renders 4 of these.
 */
export const ImageUploadSlot: React.FC<ImageUploadSlotProps> = ({ uri, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.slot} accessibilityRole="button">
      {uri ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <Upload size={22} color={theme.colors.textTertiary} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  slot: {
    width: '48%',
    aspectRatio: 1,
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
