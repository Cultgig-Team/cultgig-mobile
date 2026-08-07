import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export interface ProgressBarProps {
  /** 0 to 1 */
  progress: number;
}

/**
 * ATOM: ProgressBar
 * -------------------------------------------------------
 * The thin purple progress indicator at the top of each
 * onboarding question screen (confirmed in Figma as a filled
 * segment over a light gray track).
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primary,
  },
});
