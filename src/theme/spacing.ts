/**
 * SPACING TOKENS
 * -------------------------------------------------------
 * A consistent spacing scale (4px base unit is industry
 * standard and matches most Figma "Auto Layout" setups).
 * Use theme.spacing.md instead of a raw number like 16.
 */

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
} as const;

export type SpacingToken = keyof typeof spacing;
