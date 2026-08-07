import { Platform } from 'react-native';

/**
 * SHADOW / ELEVATION TOKENS
 * -------------------------------------------------------
 * RN handles shadows differently on iOS (shadow* props) vs
 * Android (elevation). This abstracts that away so a
 * component just uses `theme.shadows.md`.
 */

const createShadow = (elevation: number, opacity: number, radius: number) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {},
  });

export const shadows = {
  none: {},
  sm: createShadow(2, 0.06, 2),
  md: createShadow(4, 0.08, 6),
  lg: createShadow(8, 0.1, 12),
  xl: createShadow(12, 0.12, 20),
} as const;

export type ShadowToken = keyof typeof shadows;
