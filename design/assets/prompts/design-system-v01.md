# Do design system — v01

- Purpose: update existing design reference sheet for Do, not a flattened runtime screen.
- Edit target: `assets/01-design-system.png`; preserved original in `design/assets/references/01-design-system-before.png`.
- Supporting references: `assets/Color_Palette.png` (palette); `design/assets/masters/do-cheers-v03.png` (brand symbol).
- Preserve: landscape 1536×1024 layout, three rounded white panels, margins, typography hierarchy, Poppins type specimens and table.
- Change: Lingua and fox to Do and cheers mark; purple/blue colors to the selected palette; remove gamification streak role.
- Palette: #191A19, #1E5128, #4E9F3D, #D8E9A8; white neutral and #F4F8E9 lime-tinted surface.
- Background: opaque white/off-white. No perspective, textures or new illustration.
- Export: 1536×1024 PNG, contain; destination `assets/01-design-system.png`. Sync `prompt_material/01-design-system.png` to prevent contradictory active references; preserve its original separately.
- Status: proposed implementation of requested direction.

## Actual generation prompt

Edit image 1, the design system sheet. Image 2 defines the exact palette. Image 3 is the new Do cheers icon. Preserve image 1's exact landscape layout and proportions: small BRAND panel top left, COLORS panel beneath it, tall TYPOGRAPHY panel on the right. Preserve all panel shapes, positions, spacing, margins, Poppins font hierarchy and the entire typography table wording, sizes, weights and line heights. Output 1536×1024 landscape PNG, crisp perfectly legible text.

In BRAND, completely remove the fox and the word lingua. Replace with the cheers app icon from image 3 in a small forest-green rounded square on the left, and exactly 'Do' in large bold charcoal Poppins on its right. Optically center this compact lockup in the brand panel. No mascot.

Use forest green #1E5128 for all three section headings and charcoal #191A19 for primary type; secondary type forest green. Keep white panels on nearly white background.

COLORS: preserve the same three rows and swatch counts. First row heading 'PRIMARY'; four swatches and exact labels in this order: 'DO CHARCOAL' '#191A19'; 'DO FOREST' '#1E5128'; 'DO GRASS' '#4E9F3D'; 'DO LIME' '#D8E9A8'. Each swatch's fill must match its hex label exactly.

Second row heading 'UI ROLES' replacing SEMANTIC. Five swatches: 'ACTION' '#1E5128'; 'ON ACTION' '#D8E9A8'; 'SUCCESS' '#4E9F3D'; 'TEXT' '#191A19'; 'HIGHLIGHT' '#D8E9A8'. No warning, streak or error swatches, no orange, red, blue or purple.

Third row heading 'NEUTRALS'; five swatches: 'TEXT / PRIMARY' '#191A19'; 'TEXT / SECONDARY' '#1E5128'; 'BORDER' '#D8E9A8'; 'SURFACE' '#F4F8E9'; 'BACKGROUND' '#FFFFFF'. Keep typography panel identical except recolor its text to charcoal/forest. No new copy, objects, watermarks or decorative effects.

Tool: built-in image_gen; model and seed not exposed.

## Result / QA

Selected and exported at 1536×1024. Do spelling, fox removal, all palette hex labels, font family and typography table were visually checked. Three-panel layout retained. Generated color fills retain mild texture; exact palette tokens are recorded in `../style-guide.md`. Minor text and spacing differences remain; no pixel-identical claim. Original copies retained under `../references/`.
