# Do mask v01

- Status: generated candidate, not user-approved.
- Purpose: reusable word silhouette / alpha mask; no screen integration requested.
- Reference: `assets/01-design-system.png`, typography and Do letter proportions only.
- Subject / exact text: `Do` (uppercase D, lowercase o).
- Style: Poppins Bold-based geometric sans-serif outer contours, counters filled, letters joined.
- Palette: solid black, provisional functional mask color.
- Lighting / shading / perspective: none; flat front view.
- Composition: centered, baseline aligned, modest transparent padding, landscape 3:2 canvas.
- Size: requested 1536 × 1024 PNG master; no logical display size specified.
- Background: genuine transparency.
- Preserve: recognizable outer contours and relative cap/x-height from reference.
- Change: remove counters and inter-letter gap; overlap to form one connected silhouette.
- Avoid: holes, seams, outlines, shadows, gradients, texture, other text or objects.
- Destination: `assets/images/illustrations/do-mask-v01.png`; original in `design/assets/masters/`. Later shelved (unused, silhouette does not match the login design) in `design/assets/unused/`.
- Tool: built-in image generation.

## QA

- Saved original and delivery PNG without pixel modifications: 1536 × 1024, 401,803 bytes.
- Alpha ranges from 0 to 254 (generated fill is near-opaque, not mathematically 255).
- At alpha threshold 128: exactly one connected foreground component and one exterior background component; no enclosed holes.
- Inspected on white: filled D and o join continuously, with no internal seam. Poppins-inspired proportions are a generated approximation; lowercase round overshoot extends slightly below D.
- No screen integration requested or performed.

## Final prompt

Create a mask asset: the exact word "Do", uppercase D then lowercase o, as ONE continuous solid black silhouette on a genuinely transparent background. The attached design-system image is a typography reference ONLY: use the Poppins Bold geometric sans-serif shapes and relative letter proportions of its Do wordmark. Fill the D counter completely with black and fill the o counter completely with black, so the D has a straight left edge and rounded right outer edge, and the o is a solid round disk at lowercase x-height. Move the o left so it overlaps the D enough to fuse into a single connected shape, with no transparent gap, seam or internal line between them. Preserve the recognizable stepped upper silhouette of capital D beside lowercase o, sharing a baseline. Flat pure black opaque fill, smooth clean edges, no holes anywhere in the silhouette, no shading, shadow, texture, outlines, icons, or extra text. Center on a landscape 1536 by 1024 transparent canvas with modest padding. This is a functional alpha mask, not a presentation mockup.
