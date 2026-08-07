import { colors } from './colors';
import { typography, fontFamily, fontSize, fontWeight, lineHeight } from './typography';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';

/**
 * UNIFIED THEME OBJECT
 * -------------------------------------------------------
 * Import this single object anywhere you need design values:
 *
 *   import { theme } from '@/theme';
 *   color: theme.colors.primary
 *   padding: theme.spacing.md
 *   ...typography.h1
 *
 * This is the ONE file that bridges "design" and "code".
 * If a designer changes a value in Figma, you change it in
 * theme/*.ts and every screen/component reflects it instantly.
 */
export const theme = {
  colors,
  typography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radii,
  shadows,
} as const;

export type Theme = typeof theme;

// Re-export individual pieces too, for convenience
export { colors, typography, spacing, radii, shadows };
