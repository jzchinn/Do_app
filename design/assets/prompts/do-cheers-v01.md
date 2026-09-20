# Do cheers — v01

Status: proposed implementation of the user's requested direction; not yet user-approved.

- Purpose: Do brand symbol, launcher, splash and in-app decorative logo.
- Product meaning: existing friends making plans; cheers is a brand metaphor, not a restriction to drinking activities.
- References: `design/assets/references/app-icon-inspiration.jpeg` (simplicity, bold silhouette, compact centered mark); `assets/Color_Palette.png` (exact palette).
- Subject/action: two stemmed wine glasses tilted toward one another, rims touching, a small celebratory glint.
- Style: simple flat vector-like silhouette, thick rounded geometry, no texture, no gradients, no 3D or shadows.
- Palette: charcoal #191A19, forest #1E5128, grass #4E9F3D, lime #D8E9A8. Main mark uses lime; opaque exports use forest.
- Composition: centered, symmetrical, generous negative space; no text or letters.
- Display/export: scalable brand mark; 1024×1024 transparent master, platform exports derived without stretching. App icon 1024×1024 opaque; adaptive foreground safe within central circle; favicon 48×48; splash 1024×1024 transparent. Legacy React-named PNGs retain dimensions but receive Do imagery.
- Background: genuine transparent alpha for master; no checkerboard.
- Preserve: the selected app icon references' clarity and visual economy; never copy their logos.
- Change: replace Expo/React starter imagery with Do.
- Avoid: foxes, Lingua, copied social-media logos, hands, people, bottles, words, gradients, excessive sparkles, fine lines.
- Destinations: master `design/assets/masters/do-cheers-v01.png`, runtime `assets/images/`.

## Actual generation prompt

Create a production-ready flat app brand symbol for Do: two wine glasses clinking in a friendly cheers gesture. Use the attached app icon collage only for its bold, instantly recognizable simplicity, never copy any logo. Use the palette reference for color. Render only the symbol in pale lime #D8E9A8 on a genuinely transparent background. Two elegant but chunky rounded bowl silhouettes, a clean open negative-space area near each rim, sturdy stems and short rounded bases; tilt the glasses inward so the rims touch at center. One small four-point glint above the touching rims. Symmetrical, beautifully balanced, readable at 32px. Center the whole symbol in a 1024×1024 square with about 18% empty margin on each side. No text, no enclosing badge, no shadows, no gradients, no outlines in another color, no texture, no extra objects, no checkerboard. Keep all opaque artwork exactly pale lime #D8E9A8. Output transparent PNG.

Tool: built-in image_gen; model and seed not exposed.
