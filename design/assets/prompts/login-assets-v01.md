# Login screen assets — v01

- Status: draft, integrated in `src/app/(auth)/login.tsx`; not user-approved.
- Spec: `design/assets/drafts/login-do-v11-refreshed.png` (853 x 1844 px = 390 x 844 pt reference).
- No image-generation tool was used; all three assets are scripted, so they are reproducible and have no generation prompt.

## login-do-photo-v01.png (743 x 651, transparent PNG, ~685 KB)
- Source photo: `assets/images/login/quan-nguyen-toast-cleaned-v01.png` (decorative toast; not actual attendees).
- Silhouette: geometric "D" + "o" model fitted by overlay to the v11 mockup (not `do-mask-v01.png`, whose proportions differ: ~1.7:1 vs ~1.17:1 in the mockup). 7 px white outline, antialiased via signed distance.
- Recipe: `node design/scripts/export-login-assets.cjs` (report: `design/assets/exports/login-do-photo-report-v01.json`). Displayed at 226 x 198 pt.
- Limitation: the D's upper-right curve is within ~8 px of the mockup, not exact. Photo crop is centered, not matched to the mockup's crop.

## login-bg-texture-v01.jpg (1170 x 1100, opaque JPEG, ~210 KB)
- Procedural brushed-green texture (seeded value noise stretched along a diagonal), colors sampled from the mockup, white fade baked in so it sits on the white screen. Solid to ~293 pt, white by ~367 pt.
- Recipe: `node design/scripts/generate-login-texture.cjs`.
- Limitation: smoother and more regular than the mockup's painted texture. A generated or photographed texture could replace it later (save as v02; keep v01).

## provider-{google,apple,facebook}-v01.png (96 x 96, transparent PNG)
- Sources, saved unmodified or recolored in `design/assets/masters/provider-logos/`: Wikimedia Commons copies of the marks: `Google_"G"_logo.svg` (official four-color G, unchanged), `Apple_logo_black.svg` (recolored white), `Facebook_f_logo_(2019).svg` (recolored lime disc / forest "f" to match the mockup).
- These are trademarked marks. Before release, confirm each provider's brand guidelines (Apple and Facebook recoloring, button styling) and prefer the providers' own downloads. Clerk's social buttons may impose their own rules.
- Recipe: `swift design/scripts/export-provider-logos.swift` (macOS AppKit). 92% fill of a 96 px square, displayed at 17-20 pt.
