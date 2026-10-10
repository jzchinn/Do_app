# do-concert — v02

Status: rejected/superseded by v05. Unintended alpha defects were visible on a light background. Not used by the app registry.

- Purpose / screen / state: small decorative onboarding activity icon; no actual attendees represented.
- References: `design/assets/masters/do-concert-v01.png` is edit target; `assets/images/do-cheers-v01.png` is style reference. `prompt_material/Login.PNG` supplies placement/scale context only.
- Subject / action / change: Pulled-back stage, smaller microphone on stand, spotlight cone, side curtains.
- Style / palette / lighting: rounded flat low-detail silhouette, forest #1E5128; spotlight represented graphically with negative space, no tonal lighting.
- Composition / perspective / clear space: square contained canvas, ~7% padding; preserve playful board tilt or audience stage view.
- Display / export: 32–48 logical units; 192×192 runtime PNG, original master retained.
- Background: genuine transparent alpha and cutouts.
- Embedded text: none.
- Preserve: original v01 files, family style and aspect ratio.
- Avoid: checker pattern on board; oversized microphone; noise, gradients, opaque backdrop, extra scenery.
- Destination: `assets/images/do-concert-v02.png`, master in `design/assets/masters/do-concert-v02.png`.
- Tool: built-in image_gen; model/seed not exposed.

## Actual prompt

Use case: precise-object-edit.
Asset type: Do onboarding decorative silhouette icon. Image 1 is the edit target. Image 2 (cheers) is style reference only.
Preserve the family's solid forest-green #1E5128 ink, chunky softly rounded silhouette language, clean smooth edges, low detail, generous clear cutouts. Genuine transparent alpha background and transparent internal negative spaces. No white opaque background, no baked checkerboard, no gradient, noise, texture, shading, glow, lettering, logos or unrelated decoration. Square PNG master 1024x1024 requested, fully contained with ~7% padding, designed to remain legible at 32–48 logical pixels.
Change the stage composition to a farther-away audience view of a broad stage, with a modestly sized microphone at center stage, tall drawn-back curtains on both sides, and a single spotlight illuminating the mic from above. Preserve the rounded curtain shape language and gently curved stage platform. The mic plus its long slender but readable stand should be only about 38% of the curtain height; the microphone head itself is small, NOT the enormous central broadcast microphone in the input. Stage width about 85% of canvas; big open stage area around the mic makes the view feel pulled back. Show one simple small overhead spotlight fixture near the upper center and a widening cone of light descending to an oval pool on the stage around the mic. Represent the spotlight using a bold transparent negative-space cone carved out of a flat green rear-stage silhouette, with a solid green mic clearly visible inside that cone and a transparent oval pool at its foot; do not add a second ink, gradients or translucent glow. Side curtains remain clearly recognizable outside the light cone. No audience, people, notes, speakers or cables. Flat minimal one-color silhouette icon, not a realistic theater illustration.
