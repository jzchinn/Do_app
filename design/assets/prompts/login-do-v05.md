# Login Do v05 — draft

Purpose: login mockup; decorative friends toasting, not actual attendees.
Method: built-in imagegen compositing edit.
Edit target: design/assets/drafts/login-do-v02.png.
Photo input: design/assets/masters/quan-nguyen-toast-cleaned-v01.png.
Alpha silhouette input: assets/images/do-mask-v01.png.
Style, palette, lighting: preserve screen styling and source photo lighting.
Composition: centered photo-filled Do silhouette replacing central m hero; contain mask proportions and crop photo without stretching.
Requested export: 852 × 1846 opaque PNG, same portrait aspect ratio; logical display size unspecified.
Destination: design/assets/drafts/login-do-v05.png; retain previous files.
Preserve: all surrounding screen elements and verbatim text.
Change: central photo and clipping silhouette only.
Avoid: old people, m silhouette, holes in filled mask, new UI elements.

## Actual prompt

Edit image 1 (login-do-v02.png), replacing ONLY the central m-shaped photo hero. Image 2 is the exact replacement toast photograph. Image 3 is the supplied transparent black Do silhouette mask: use its alpha outline as the clipping shape, with black areas replaced by image 2 and transparent areas revealing the existing screen. The mask is a connected solid uppercase D and lowercase o with filled counters, a straight left edge, tall rounded D and shorter circular o, joined on a shared baseline; no holes. Preserve the mask's proportions without stretching. Fit the new photo-filled Do silhouette centrally in the current hero area roughly x=165..720 y=355..855 of the 852x1846 screen, with a thin white border consistent with the original. Use a continuous natural crop of the supplied toast photo, retaining hands, champagne glasses, and blue sky. Remove all of the old people and m mask. Preserve everything outside the central hero as closely as possible: purple textured background fading to white, status bar 11:04, white cheers icon and Do logo, all four white activity icons, heading 'Do something', buttons 'Continue with Google', 'Continue with Apple', 'Continue with Facebook', separator 'or', 'Sign up with email', 'Log in with email'. Preserve layout, typography, colors, spacing and 852x1846 opaque portrait canvas. No added elements or redesigned UI.

## QA

Inspected both generated results. First attempt retained a wavy silhouette; correction produced a straight-sided D and smaller round o with no counters. Toast photograph and all screen wording retained visually. The generator approximated the mask rather than applying its alpha pixel-for-pixel; exact outline fidelity and surrounding pixel invariance are not verified. No app integration or code changes.

## Correction prompt

Correct ONLY the photo clipping boundary in this login screen. The current shape is wrong: it has a wavy left edge and two bottom lobes. Replace with a clean filled Do silhouette: capital D has a perfectly STRAIGHT VERTICAL left edge at x=180 from y=365 to y=820, flat horizontal top starting at x=180 y=365, flat bottom at y=820, and a rounded right bowl. Lowercase o is a PERFECT CIRCLE diameter 320 pixels bounding x=400..720 y=500..820, overlapping D and joined to it. Both shapes have SOLID photo interiors with NO counter holes. Their shared baseline is FLAT y=820; absolutely no deep notch between bottom lobes, no wavy or pinched left side, no m or butterfly shape. Use supplied image 2 Do alpha mask silhouette proportions and geometry as the authoritative outline. Retain the toast photograph filling this combined shape continuously and thin white border. Restore background wherever previous incorrect shape extended. Preserve ALL other screen pixels, text, layout, icons and colors. 852x1846.
