# Do concert — v04

Status: rejected/superseded by v05. Unintended alpha defects were visible on a light background. Not used by the app registry.

v03 cleanup left an unintended alpha hole inside the left curtain, visible when composited onto white. Regenerate the requested composition from the clean cheers reference instead of copying this defect. Same purpose, palette, display/export size and constraints as v02/v03. Master `design/assets/masters/do-concert-v04.png`; export `assets/images/do-concert-v04.png` (192×192). Genuine transparency, no text. Reference: `assets/images/do-cheers-v01.png`, style only. Tool: built-in image_gen; model/seed not exposed.

## Actual prompt

Use case: stylized-concept. Create a new clean Do onboarding concert icon. The supplied cheers icon is ONLY the reference for monochrome forest ink, chunky rounded silhouettes, and smooth vector-like edges; do not depict glasses.
Subject: a theater stage viewed from far back in the audience. Tall drawn-back curtains left and right, a broad gently curved stage platform, and a small microphone on a long stand at center. Mic and stand total height is about 38% of curtain height, giving generous open stage space above and around it. One small overhead spotlight at upper center shines a widening cone down onto an oval pool of light around the mic.
ONE solid flat ink #1E5128 only. The stage backdrop and curtains are solid opaque green shapes; the spotlight's cone and oval pool are crisp transparent negative-space cutouts, with the green mic visible inside the light cone. Include only one sweeping transparent fold per side curtain. Rounded top rail. Clean solid broad surfaces, smooth contours, simple graphic silhouette. No texture, speckles, fading, random holes, smudges, scratches, gradients, shadows, white ink or extra colors. All green shapes must be fully opaque. Background outside the silhouette and intentional cutouts must have genuine alpha=0 transparency, never an opaque checkerboard. Every transparent hole must be intentional: spotlight cone, oval light pool, and curtain folds only. No people, text, logos, notes or decorative marks.
Square PNG, 1024x1024 requested. Entire stage fully contained with 7% margin. Designed as a small 32–48 logical-pixel decorative icon.
