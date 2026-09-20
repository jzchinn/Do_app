# Do visual assets

## User-selected direction

- Brand name: **Do**, with no fox or Lingua identity.
- Primary palette: sampled directly from `assets/Color_Palette.png`.
- Symbol subject: two wine glasses clinking, inspired by the simplicity of the selected app icon collage.
- Update the existing design-system PNG and all PNGs currently in `assets/images/`.

| Color | Exact value | Proposed role |
| --- | --- | --- |
| Charcoal | #191A19 | Primary text, monochrome symbol |
| Forest | #1E5128 | Primary action, icon background, dark brand mark |
| Grass | #4E9F3D | Accent and success decoration |
| Lime | #D8E9A8 | Light brand mark, on-action content, highlights |

White #FFFFFF and a proposed lime-tinted surface #F4F8E9 are supporting neutrals. The four colors above are the user's palette; these role assignments and the final symbol rendering are implementation proposals, not independently user-approved decisions. Poppins and the typography scale are retained from the requested design sheet. The grass color is not an automatic choice for small text. Status meaning must also use explicit labels or symbols; warning/error tokens remain undefined.

## Selected implementation

- Paired inward-tilted wine glasses with one glint, chunky flat silhouettes.
- Forest background and lime foreground on the launcher. OS supplies the launcher mask; the source PNG is an opaque square.
- Dark forest transparent brand art for light backgrounds, pale lime transparent splash art for forest/dark backgrounds.
- Cheers is a social brand metaphor. It does not imply that Do is exclusively for drinking plans.
- No generated people, actual attendees, or product mechanics are represented.
- No runtime screen redesign is included.

## Files and reproduction

- Design sheet: `assets/01-design-system.png`; synchronized active reference: `prompt_material/01-design-system.png`.
- App-bound assets: `assets/images/`; registry: `src/constants/images.ts`.
- Original files: `design/assets/references/`, including `images-before/`.
- Original selected generated outputs: `design/assets/masters/`.
- Actual generation briefs and iteration notes: `design/assets/prompts/`.
- Export recipe: `node design/assets/export-assets.cjs`. Uses already-installed Jimp through Expo's dependency tree; no dependencies added.
- Pixel dimensions, byte sizes and transparency intent: `design/assets/export-report.json`.
- Visual QA montage: `design/assets/asset-preview.png`.

Existing React-named assets retain their filenames to avoid breaking references, but now depict Do's cheers symbol. New consuming code should use the descriptive registry keys. The rectangular former partial logo is now a complete contained Do symbol, not a cropped React atom.

## Checks and limitations

- Sampled the original palette as RGB (25,26,25), (30,81,40), (78,159,61), (216,233,168).
- Rejected two transparent generations due to speckles. Selected the clean opaque v03 and separated its two inks for transparent/monochrome platform exports. Exported solid inks are normalized to the sampled palette; edge pixels use antialiasing.
- Inspected the resulting exports on white and charcoal, at 24/32/48/64 px, and in circular launcher masks. No visible specks, clipped glasses, checkerboards, or white fringes remain in the exported assets.
- Adaptive foreground is contained within 44% of its canvas in both dimensions, including the sparkle. Both adaptive layers are 512×512. Monochrome is 432×432. The launcher is opaque 1024×1024.
- Checked design sheet wording, palette labels and hex codes, Do spelling, missing fox, typography rows, and three-panel composition. The generated sheet has subtle texture and minor letter/spacing differences from the original; it is not a pixel-identical reconstruction. Use the hex values above as authoritative tokens, not sampled pixels from this generated sheet.
- `npm run lint`, `npx tsc --noEmit`, and `npx expo config --type public` passed. This repository has no `typecheck` script, so the installed TypeScript compiler was used directly.
- Native launcher and splash verification on a built device remains pending. Static masks are visual checks, not device screenshots. No native build or store upload was performed.
- Platform configuration references: [Expo app icons](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/) and [Expo app configuration](https://docs.expo.dev/versions/latest/config/app/).
