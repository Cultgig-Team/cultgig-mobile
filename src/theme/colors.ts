/**
 * COLOR TOKENS
 * -------------------------------------------------------
 * Extracted from the "cultgig" Figma file's Design System page
 * via Figma variables (var(--o-900), var(--n-300), etc).
 *
 * "O" scale = the brand plum/wine color ramp (O 50 lightest -> O 900 darkest)
 * "N" scale = neutral/gray ramp used for secondary text & borders
 *
 * Confirmed directly from Figma variables: O 300, O 500, O 800, O 900,
 * N 200, N 300, N 400, N 500, White, Black.
 * Remaining O/N steps are interpolated to complete the ramp — replace
 * with exact values if the designer provides the full variable export.
 * -------------------------------------------------------
 */

export const palette = {
  // Brand "O" scale (confirmed steps marked)
  o50: '#faf1f7',
  o100: '#e8bfdf', // confirmed (inactive button bg)
  o200: '#df9fd4',
  o300: '#d470b4', // confirmed
  o400: '#d85aa2',
  o500: '#d03d90', // confirmed
  o600: '#b8357e',
  o700: '#a02f6c',
  o800: '#913475', // confirmed
  o900: '#6a2e62', // confirmed (primary)

  // Neutral "N" scale (confirmed steps marked)
  white: '#ffffff', // confirmed
  n50: '#f7f7f7',
  n100: '#efefef',
  n200: '#d9d9d9', // confirmed (borders)
  n300: '#c4c4c4', // confirmed
  n400: '#9d9d9d', // confirmed
  n500: '#7b7b7b', // confirmed (secondary text)
  n600: '#5c5c5c',
  n700: '#404040',
  n800: '#242424',
  n900: '#141414',
  black: '#000000', // confirmed
} as const;

export const colors = {
  // Brand
  primary: palette.o900,
  primaryPressed: palette.o800,
  primaryDisabled: palette.o100,
  primaryLight: palette.o100,
  accent: palette.o800, // used for the colored "Artist"/"Client" word highlight

  // Backgrounds
  background: palette.white,
  backgroundSecondary: palette.n50,
  surface: palette.white,

  // Text
  textPrimary: palette.black,
  textSecondary: palette.n500,
  textTertiary: palette.n400,
  textDisabled: palette.n300,
  textInverse: palette.white,

  // Borders
  border: palette.n200,
  borderFocused: palette.o900,

  // Feedback
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Utility
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.5)',
} as const;

export type ColorToken = keyof typeof colors;
