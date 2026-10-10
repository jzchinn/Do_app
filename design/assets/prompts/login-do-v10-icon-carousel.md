# login-do-v10-icon-carousel

- Status: draft static login-screen reference.
- Reference/edit target: `design/assets/drafts/login-do-v09-icon-carousel.png`.
- Purpose: refine decorative three-activity carousel composition; no implementation or attendee meaning.
- Style, palette, lighting, text and background: preserve edit target; opaque foliage background, pale yellow-green icons.
- Change: raise center tree half its height; align icon centers horizontally; scale side icons to 75%; move side icons outward by their pre-resize widths.
- Preserve: tree size/brightness, side-icon faintness/design, main Do graphic and entire remaining login UI.
- Display/export: full-screen portrait reference, target 852 × 1846 PNG, contain without cropping.
- Avoid: extra icons, motion indicators, layout changes outside the icons.
- Destination: `design/assets/drafts/login-do-v10-icon-carousel.png`; retain v09.
- Tool: built-in image generation edit.

## Actual prompt

Precise localized edit to the supplied Do login screen. Change ONLY the three activity icons in the upper green area. Coordinate guidance refers to the original 852x1846 canvas. Central trees/path icon currently bounds about x363..500,y276..390: keep its shape, color, brightness and size EXACTLY the same, translate it UP 57 pixels (half its current height), so new bounds about x363..500,y219..333, center (432,276). Align the visual CENTER y-coordinate of BOTH side icons to y276 too, making a straight horizontal carousel row. Stage icon on left currently centered near (223,352), width84 height68: reduce it to 75% of current width AND height, about63x51; move its center LEFT by one CURRENT icon width (84 pixels), giving new center (139,276). Board game icon on right currently centered near(623,361), width102 height96: reduce it to75% of current dimensions, about77x72; move its center RIGHT by one CURRENT icon width (102 pixels), giving new center (725,276). Preserve the faintness/opacity and exact icon designs of both side icons; preserve their current orientation. Restore seamless foliage where icons used to be. Exactly three icons, no extras. Everything else must remain unchanged, especially the main photo-filled Do graphic position, size, photo, outline, background/fade, status bar, and all typography, buttons and text below. Do NOT move or resize the main Do graphic. This is a static reference for a future horizontal scrolling animation; no arrows or motion trails. Preserve opaque background and original 852x1846 canvas.

## QA

Final output visually inspected. Side icons are smaller, faint and farther outward; tree retains approximate size. Limitation: generator over-raised the row (tree center about y210 rather than y276), and side centers remain about 15px lower than tree center. Background/photo details drifted across generations. This is an approximate reference, not an exact coordinate edit. No app integration. A deterministic layer edit would be needed for exact positioning.

First generation reduced side icons but did not move them outward, and raised tree only approximately 29 pixels. Corrective edit required.
Second attempt moved icons outward too far and brightened side icons. Final bounded correction uses normalized composition coordinates and restores faintness.

## Final corrective prompt

Edit only the three small activity icons above the Do photo. Move the ENTIRE ROW UP noticeably so tree top is at 12% of canvas height and tree bottom at18% height. All THREE icon CENTERS on one horizontal line at15% of canvas height, not their tops or bottoms. Tree stays large bright and central. Stage at16% canvas width, board game at85% canvas width. Stage and board game must be VERY FAINT translucent muted green-yellow, only about35% opacity, blending softly into the green background; currently they are much too bright. Keep side icons small and central tree same size. Preserve all other layout, text, photo and buttons. No other edits.

## Corrective prompt

Edit this image, correcting ONLY the upper three icons' positions. The last attempt failed to move them far enough. Make the spatial change obvious: place the stage near the LEFT EDGE and the board game near the RIGHT EDGE. On this 852x1846 image, move stage from center (222,320) to (139,276), a shift LEFT 83 pixels and UP 44. Move board game from center (625,324) to (725,276), a shift RIGHT 100 pixels and UP 48. Move center trees icon UP another 29 pixels, from center (431,305) to (431,276). Thus all three icons' bounding-box CENTERS must lie on precisely the same horizontal line y=276. Keep current sizes, colors, opacity, orientation and designs unchanged. Final approximate bounding boxes: stage x104..174 y248..304; trees x362..500 y219..333; board game x684..766 y235..317. Clear former positions by restoring foliage. There must be much wider gaps between central trees and the side icons than in the input. Leave ALL other content unchanged, including main Do photo shape at y436..862 and every part of lower login UI and status bar. Same opaque 852x1846 PNG canvas.
