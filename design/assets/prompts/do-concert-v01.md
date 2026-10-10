# do-concert — v01

Status: selected for delivery after visual checks; not yet user-approved.

## Result / QA

- Built-in image_gen produced a 1254×1254 RGBA master, preserved unmodified at the path below.
- Runtime export is 192×192, downsampled without repainting the generated ink or alpha. See `../onboarding-icons-report.json` for byte sizes and measured transparency.
- Inspected alongside the cheers reference at 32/48 px and enlarged, on light and charcoal backgrounds in `../onboarding-icons-preview.png`. Requested subject is recognizable; no visible checkerboard, white box, clipped content, or white fringe.
- Generated ink has slight RGB variation around the requested forest; it is not an exact flat #1E5128 match. Export alpha ranges 0–254, retaining the generator's near-opaque interiors and transparent cutouts.
- Forest ink is suited to light backgrounds. The dark preview shows limited contrast; dark-screen tinting should be decided during screen integration.
- Final in-screen and device placement checks remain pending because this request produces assets for a future onboarding screen.
- Registered in `src/constants/images.ts`. Repository lint and TypeScript check (`npx tsc --noEmit`, since no typecheck script exists) passed.

- Purpose / screen / UI state: decorative onboarding icon, intended for the small accents shown in `prompt_material/Login.PNG`.
- Product meaning / audience: activity available to existing friends; no actual attendees or resolved state represented.
- Reference paths / roles: `assets/images/do-cheers-v01.png` for style and forest ink; `prompt_material/Login.PNG` for approximate placement and scale only.
- Subject and action: A tiny concert stage with one large recognizable microphone on a stout stand in the center and simple drawn-back curtains on both sides. One thick gently curved stage platform below, curtains compact with at most one broad transparent fold cutout each. Open transparent center lets microphone stand out clearly. No top rig, audience, musical notes, spotlights, cables or fine details. Microphone must remain clear at tiny size.
- Style / detail: flat chunky rounded silhouette, low detail, generous transparent cutouts.
- Palette: existing forest #1E5128.
- Lighting / shading / perspective: no lighting or shading; perspective described in subject.
- Composition / clear space: contained centered subject, ~86% canvas occupancy.
- Display / export: estimated 32–48 logical units from reference screenshot; 192×192 PNG export gives room up to 64 units at 3×. Keep original generated master.
- Aspect / fit: square canvas, contain without distortion.
- Background: genuine alpha transparency, also inside cutouts.
- Exact embedded text: none.
- Preserve: existing assets and selected silhouette style.
- Change: subject only; screen integration deferred to onboarding implementation.
- Avoid: people, unrelated decoration, shading, texture, tiny linework.
- Destination: `assets/images/do-concert-v01.png`; original in `design/assets/masters/do-concert-v01.png`.
- Tool: built-in image_gen; model and seed not exposed.

## Actual generation prompt

Use case: stylized-concept.
Asset type: small decorative onboarding activity icon for Do.
Input image: assets/images/do-cheers-v01.png is the style reference only; do not reproduce its glasses or sparkle.
Style: match that reference's chunky solid silhouette, softly rounded corners, smooth clean vector-like edges, playful balanced proportions, generous negative-space cutouts and extremely low detail. Single flat forest green #1E5128 ink. No outline-only drawing. No shading, gradients, texture, shadows, glow, speckles, lettering, logos, borders, badges, extra sparkles, or people.
Background: genuine transparent alpha, including interior cutouts; no white fill, no opaque background, no checkerboard painted into the pixels.
Composition: isolated centered subject, fully visible, approximately 86% of the square canvas, comfortable even transparent padding. A square icon canvas matches the cheers family; subject proportions remain natural. Design to remain recognizable at 32–48 logical pixels. Master PNG requested 1024x1024.
Subject: A tiny concert stage with one large recognizable microphone on a stout stand in the center and simple drawn-back curtains on both sides. One thick gently curved stage platform below, curtains compact with at most one broad transparent fold cutout each. Open transparent center lets microphone stand out clearly. No top rig, audience, musical notes, spotlights, cables or fine details. Microphone must remain clear at tiny size.
