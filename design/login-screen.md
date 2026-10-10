# Login screen: how it is built and how to reproduce it

Route `src/app/(auth)/login.tsx` (the app's first screen; `src/app/index.tsx` redirects to it).
Status: first draft, UI only. The social/email buttons have no handlers until Clerk is added.

## Spec
- Visual spec: `design/assets/drafts/login-do-v11-refreshed.png`, 853 x 1844 px, treated as a 390 x 844 pt screen (about 2.19 px per pt). Earlier drafts `login-do-v01..v10` are history.
- All pt values in the code were measured from that image. Re-measure there before changing layout.
- Palette tokens only (`src/global.css`, mirrored in `src/theme/colors.ts`). Font: Poppins (`assets/fonts/`).

## Layout (top to bottom, pt from the top of the screen, 390 wide)
| Element | Details |
| --- | --- |
| Texture | `login-bg-texture-v01.jpg`, absolute at top, full width, 367 tall; fade to white is baked in |
| Activity icons | 200 tall row; trees (71 pt, lime, center), concert (35 pt) and board game (40 pt) at 40% opacity left and right; each in a 71 pt slot, 34 pt side padding |
| Do photo | `login-do-photo-v01.png`, 226 x 198, centered, starts at 200 |
| Headline | "Let's **do** something", Poppins Bold 31/38, "do" in `forest`, 33 below the photo |
| Buttons | Google, Apple, Facebook: 47 tall, full width with 21 side margin, 13 gap, 14 below the headline |
| Divider | "or" between two 1 px `grass` lines, 24 above, 12 gaps |
| Sign up with email | 45 tall, `surface` fill, `grass` border |
| Log in with email | Poppins SemiBold 15, 2 px `lime` underline, 20 below the button |

Image `className` sizes must be explicit `w-`/`h-` values. `aspect-[a/b]` did not work on `Image` in this NativeWind version.

## Files
| Role | File | Made by |
| --- | --- | --- |
| Screen | `src/app/(auth)/login.tsx` | by hand |
| Button | `src/components/AuthButton.tsx` + `auth-button*` utilities at the end of `src/global.css` | by hand |
| Image registry | `src/constants/images.ts` (`loginBgTexture`, `loginDoPhoto`, `provider*`, `doHiking`, `doConcert`, `doBoardGame`) | by hand |
| Texture | `assets/images/login/login-bg-texture-v01.jpg` | `node design/scripts/generate-login-texture.cjs` |
| Do photo cutout | `assets/images/login/login-do-photo-v01.png` | `node design/scripts/export-login-assets.cjs` (input: `design/assets/masters/quan-nguyen-toast-cleaned-v01.png`) |
| Provider logos | `assets/images/login/provider-{google,apple,facebook}-v01.png` | `swift design/scripts/export-provider-logos.swift` (macOS only; input: SVGs in `design/assets/masters/provider-logos/`) |
| Activity icons | `assets/images/illustrations/do-{hiking-v01,concert-v05,board-game-v02}.png` (tinted lime in code) | `node design/scripts/export-onboarding-icons.cjs` |

Run scripts from the app root. The Node scripts use `jimp-compact`, which is already in `node_modules` through Expo (no dependency was added). All three login scripts are deterministic; re-running them reproduces the committed files byte for byte (checked 2026-10-10). Details, limits and sources: `design/assets/prompts/login-assets-v01.md`.

## Run and preview
- `npx expo start --ios` (iOS simulator uses Expo Go). Headless web (`--web`) ignores some `Image` sizing, so it is not a reliable check.
- Checks: `npm run lint` and `npx tsc --noEmit` (there is no `typecheck` script).

## Known gaps
- Texture is procedural and smoother than the mockup's painted look.
- The Do silhouette's upper-right curve is about 8 px off the mockup; the photo crop is centered, not matched.
- Sampled mockup greens are more saturated than the palette tokens; tokens were used.
- Poppins replaces the mockup's tighter font.
- Provider logos come from Wikimedia Commons copies, recolored for Apple and Facebook; confirm brand rules before release.
