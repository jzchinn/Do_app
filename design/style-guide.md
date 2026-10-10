# Do visual assets

## User-selected direction

- Brand name: **Do**, with no fox or Lingua identity.
- Primary palette: sampled directly from `design/references/do/color-palette.png`.
- Symbol subject: two wine glasses clinking, inspired by the simplicity of the selected app icon collage.
- Update the existing design-system PNG and all PNGs that were in `assets/images/`.

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

### Onboarding activity family

- Follow-up revisions: board game v02 uses a Monopoly-style perimeter track with center cards; concert v05 shows a distant small mic, overhead spotlight cone, oval light pool and side curtains. User requested these changes; individual final renderings await review.
- Current registry selects `do-board-game-v02.png` and `do-concert-v05.png`; v01 assets are preserved. Current QA montage/report use the `-v02` suffix.
- Concert transparent generations v02–v04 had alpha defects. Final v05 uses the existing cheers two-color separation export method for clean forest ink and transparency. Other icons retain generated alpha and minor color variation.

- User-selected reference: `assets/images/illustrations/do-cheers-v01.png`; use its forest-green chunky silhouettes, rounded shapes, and transparent cutouts for hiking, concert, board-game, and picnic accents.
- `prompt_material/Login.PNG` establishes the intended small decorative placement, not a new palette or brand.
- Delivered candidates: `do-hiking-v01.png`, `do-concert-v01.png`, `do-board-game-v01.png`, and `do-picnic-v01.png` under `assets/images/illustrations/`. These individual renderings await user review.
- Each export is 192×192 for approximately 32–48 logical-unit use (up to 64 at 3×), with unmodified 1254×1254 generated masters retained.
- Reproduce exports and QA montage with `node design/scripts/export-onboarding-icons.cjs`; this does not regenerate artwork. Exact prompts are in the four corresponding v01 prompt records.
- Preview: `design/assets/exports/onboarding-icons-preview-v02.png`. Columns are cheers reference, hiking, concert, board game, picnic. Rows show enlarged artwork, 32/48 px on white, and 32/48 px on charcoal.
- Visually checked subject recognition, family resemblance, alpha, edges, and padding. Generated ink has minor color variation and near-opaque alpha; it is not normalized to exact forest ink. Use on light backgrounds or choose a suitable tint when integrating onto dark surfaces.
- Screen integration and device checks remain pending; no screen layout changed.

- Design sheet: `design/references/do/design-system.png`; identical copy kept in `prompt_material/01-design-system.png`.
- App-bound assets: `assets/images/` (`app/`, `illustrations/`, `login/`); registry: `src/constants/images.ts`.
- Original and inspiration files: `design/references/` (`do/`, `starter-before/`).
- Original selected generated outputs: `design/assets/masters/`.
- Actual generation briefs and iteration notes: `design/assets/prompts/`.
- Export recipe: `node design/scripts/export-assets.cjs`. Uses `jimp-compact`, a pinned dev dependency in `package.json`.
- Pixel dimensions, byte sizes and transparency intent: `design/assets/exports/export-report.json`.
- Visual QA montage: `design/assets/exports/asset-preview.png`.

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

## Login screen (v01, draft)

- Full build and reproduction guide: `design/login-screen.md`. Built from `design/assets/drafts/login-do-v11-refreshed.png`; asset records in `design/assets/prompts/login-assets-v01.md`.
- Uses palette tokens, not the mockup's more saturated sampled greens (e.g. Facebook button is `forest` #1E5128 where the mockup shows about rgb(19,101,34)). Swap if the brighter greens are preferred.
- Poppins stands in for the mockup's tighter grotesque; headline is Poppins Bold 31 pt.
- Social buttons are UI-only until Clerk is added.
