import type { TextStyle } from "react-native";

/**
 * Font family names as registered by useFonts() in src/app/_layout.tsx.
 * Custom TTF weights need their own family name - RN can't fake-bold them.
 */
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

/**
 * Mirrors the text-h1 / text-h2 / ... utilities in src/global.css.
 * Use these only where a className can't reach (StyleSheet-exception
 * components, dynamic styles). Screens should use the utility classes instead.
 */
export const type = {
  h1: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 32 * 1.2 },
  h2: { fontFamily: fontFamily.semiBold, fontSize: 24, lineHeight: 24 * 1.3 },
  h3: { fontFamily: fontFamily.semiBold, fontSize: 20, lineHeight: 20 * 1.3 },
  h4: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 16 * 1.4 },
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 16 * 1.6 },
  bodyMedium: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 14 * 1.6 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 13 * 1.6 },
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 11 * 1.4 },
} as const satisfies Record<string, TextStyle>;
