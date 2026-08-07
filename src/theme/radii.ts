/**
 * BORDER RADIUS TOKENS
 * -------------------------------------------------------
 * Update these to match the designer's corner-radius values.
 */

export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999, // pills / circular avatars
} as const;

export type RadiusToken = keyof typeof radii;
