# Do concert — v03

Status: rejected/superseded by v05. Unintended alpha defects were visible on a light background. Not used by the app registry.

Same brief and dimensions as v02. v02 has the requested composition but an irregular dark blue-green blotch inside the left curtain; this revision changes only surface cleanliness. Preserve shape, framing, spotlight, mic scale, transparency and forest ink.

- Edit target: `design/assets/drafts/do-concert-v02.png`.
- Style reference: existing cheers family, unchanged from v02.
- Purpose: decorative onboarding icon, 32–48 logical units, 192×192 transparent runtime PNG.
- Master destination: `design/assets/masters/do-concert-v03.png`.
- Runtime destination: `assets/images/do-concert-v03.png`.
- Tool: built-in image_gen; model/seed not exposed.
- No text, attendees, shading, extra objects or opaque background.

## Actual prompt

Use case: precise-object-edit. Edit the supplied stage icon with ONE targeted correction: remove the irregular dark blue-green blotch just inside the left curtain, around 29% of canvas width and 45% of canvas height. Make all green filled surfaces clean uniform flat forest green #1E5128, including that blemished area. Preserve EXACTLY the existing silhouettes, spotlight fixture, negative-space cone and oval pool, small center microphone and long stand, curtains, platform, framing, spacing and genuine alpha transparency. Do not redesign, move, resize or add anything. No noise, speckles, color patches, gradient, shading or texture. Transparent background and all existing transparent holes must remain transparent. Output PNG, same square aspect.
