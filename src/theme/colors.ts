/**
 * Mirrors the --color-* tokens in src/global.css.
 * Use these only where a className can't reach (StyleSheet-exception
 * components, icon/status-bar colors, dynamic values). Screens should
 * use the NativeWind utilities (bg-forest, text-text-primary, ...) instead.
 */
export const colors = {
  // Primary palette
  charcoal: "#191A19",
  forest: "#1E5128",
  grass: "#4E9F3D",
  lime: "#D8E9A8",

  // UI roles
  action: "#1E5128",
  onAction: "#D8E9A8",
  success: "#4E9F3D",
  highlight: "#D8E9A8",

  // Neutrals
  textPrimary: "#191A19",
  textSecondary: "#1E5128",
  border: "#D8E9A8",
  surface: "#F4F8E9",
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
