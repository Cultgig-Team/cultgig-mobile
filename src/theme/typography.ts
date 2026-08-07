/**
 * TYPOGRAPHY TOKENS
 * -------------------------------------------------------
 * Fonts confirmed from Figma: "Bagoss Extended" (Bold, used only for
 * the big marketing headline on the Welcome screen) and "Satoshi
 * Variable" (Medium/Bold/Black, used everywhere else).
 *
 * ⚠️ ACTION NEEDED: these are custom fonts, not system fonts — Figma's
 * API doesn't let us export the actual font files. Get the .ttf/.otf
 * files for "Bagoss Extended" and "Satoshi Variable" from the designer,
 * drop them in `assets/fonts/`, and register them in App.tsx via
 * `useFonts` from `expo-font` (see the TODO in App.tsx once added).
 * Until then, these fall back to the platform system font so the app
 * still renders correctly, just not pixel-perfect on typefaces.
 */

export const fontFamily = {
  // Falls back to system font until the real font files are added — see note above
  headline: 'BagossExtended-Bold',
  regular: 'Satoshi-Medium',
  medium: 'Satoshi-Medium',
  bold: 'Satoshi-Bold',
  black: 'Satoshi-Black',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  '2xl': 28, // confirmed: onboarding question headers ("Hey, how do you want to get started?")
  '3xl': 32,
  '4xl': 40, // confirmed: Welcome screen hero headline
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  black: '900',
} as const;

export const lineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  md: 26,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 48,
} as const;

/**
 * Pre-composed text variants — this is what components/screens
 * should actually consume (e.g. typography.h1, typography.body).
 * Names mirror the Figma text-style names where confirmed
 * (Title/Title 4, Title/Title 5, Paragraph/Para-M).
 */
export const typography = {
  /** Hero marketing headline (Welcome screen only) — Bagoss Extended Bold 40 */
  /** "Cultgig" wordmark on the Sign Up screen — Satoshi Black 40 (confirmed, NOT Bagoss) */
  logo: {
    fontFamily: fontFamily.black,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * 1.1,
    fontWeight: fontWeight.black,
  },
  headline: {
    fontFamily: fontFamily.headline,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * 1.1,
    fontWeight: fontWeight.bold,
  },
  /** Onboarding question header — Satoshi Black 28 (confirmed) */
  h1: {
    fontFamily: fontFamily.black,
    fontSize: fontSize['2xl'],
    lineHeight: lineHeight['2xl'],
    fontWeight: fontWeight.black,
  },
  /** Figma "Large Title/Large Title 3" — Satoshi Bold 26 (confirmed, confirmation screens) */
  confirmTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 26 * 1.2,
    fontWeight: fontWeight.bold,
  },
  /** Figma "Paragraph/Para-B" — Satoshi Bold 14 (confirmed) */
  captionBold: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: fontWeight.bold,
  },
  /** Figma "Title/Title 4" — Satoshi Bold 18 (confirmed, e.g. "I'm a Artist") */
  titleLg: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    fontWeight: fontWeight.bold,
  },
  /** Figma "Title/Title 5" — Satoshi Bold 16 (confirmed) */
  titleMd: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.bold,
  },
  /** Figma "Paragraph/Para-M" — Satoshi Medium 16 (confirmed) */
  body: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
  },
  bodySmall: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  caption: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  },
  button: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.bold,
  },
} as const;

export type TypographyVariant = keyof typeof typography;
