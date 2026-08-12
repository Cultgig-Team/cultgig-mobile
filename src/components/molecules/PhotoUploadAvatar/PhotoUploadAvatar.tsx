import React from 'react';
import { Pressable, Image, View, StyleSheet } from 'react-native';
import { Camera } from 'lucide-react-native';
import { Text } from '../../atoms/Text';
import { theme } from '../../../theme';

export interface PhotoUploadAvatarProps {
  uri?: string;
  onPress: () => void;
}

/**
 * MOLECULE: PhotoUploadAvatar
 * -------------------------------------------------------
 * Circular photo picker + camera icon on the Basic Bio screen
 * (Artist 109). onPress should open an image picker — add
 * expo-image-picker (not yet a dependency) and pass the
 * resulting uri up via setAnswer('photoUri', uri).
 */
export const PhotoUploadAvatar: React.FC<PhotoUploadAvatarProps> = ({ uri, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container} accessibilityRole="button">
      <View style={styles.circle}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} />
        ) : (
          <Camera size={28} color={theme.colors.textTertiary} />
        )}
      </View>
      <Text variant="caption" color="textSecondary" style={styles.label}>
        Upload your photo
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    marginTop: theme.spacing.sm,
  },
});
