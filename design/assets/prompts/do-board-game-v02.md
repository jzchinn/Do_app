# do-board-game — v02

Status: selected for delivery after visual QA; rendering awaits user review.

## Result / QA

- Original 1254×1254 PNG master retained. Runtime export: 192×192; 26,977 bytes.
- Checked enlarged and at 32/48 px alongside cheers, hiking and picnic on white and charcoal. No visible unintentional holes, checkerboard background, clipped silhouettes or light fringes in final exports.
- Perimeter property track, larger corners and central cards replace the checker pattern. Slight generated RGB variation retained; alpha 0–254.
- Current preview/report: `../onboarding-icons-preview-v02.png` and `../onboarding-icons-report-v02.json`.
- Registry points to this revision. Original v01 retained. No screen layout changes; device/in-screen placement remains pending.

- Purpose / screen / state: small decorative onboarding activity icon; no actual attendees represented.
- References: `design/assets/masters/do-board-game-v01.png` is edit target; `assets/images/illustrations/do-cheers-v01.png` is style reference. `prompt_material/Login.PNG` supplies placement/scale context only.
- Subject / action / change: Monopoly-style perimeter property track instead of checkerboard.
- Style / palette / lighting: rounded flat low-detail silhouette, forest #1E5128; spotlight represented graphically with negative space, no tonal lighting.
- Composition / perspective / clear space: square contained canvas, ~7% padding; preserve playful board tilt or audience stage view.
- Display / export: 32–48 logical units; 192×192 runtime PNG, original master retained.
- Background: genuine transparent alpha and cutouts.
- Embedded text: none.
- Preserve: original v01 files, family style and aspect ratio.
- Avoid: checker pattern on board; oversized microphone; noise, gradients, opaque backdrop, extra scenery.
- Destination: `assets/images/illustrations/do-board-game-v02.png`, master in `design/assets/masters/do-board-game-v02.png`.
- Tool: built-in image_gen; model/seed not exposed.

## Actual prompt

Use case: precise-object-edit.
Asset type: Do onboarding decorative silhouette icon. Image 1 is the edit target. Image 2 (cheers) is style reference only.
Preserve the family's solid forest-green #1E5128 ink, chunky softly rounded silhouette language, clean smooth edges, low detail, generous clear cutouts. Genuine transparent alpha background and transparent internal negative spaces. No white opaque background, no baked checkerboard, no gradient, noise, texture, shading, glow, lettering, logos or unrelated decoration. Square PNG master 1024x1024 requested, fully contained with ~7% padding, designed to remain legible at 32–48 logical pixels.
Change only the board design. Retain its playful tilted square board, oblique perspective, overall size and rounded perimeter. Replace the entire checkerboard with a Monopoly-style property-trading board: a single continuous perimeter track of broad rectangular property spaces, four clearly larger square corner spaces, and a large open transparent center. Use thick green outer and inner borders with chunky green dividers defining transparent property spaces. Five spaces per side between corners is sufficient for tiny-icon clarity; no alternating checker pattern anywhere. Two simple overlapping small solid green rectangular playing cards in the otherwise spacious center, no text or card details. The dominant read must be a property board with spaces around the EDGE, not a chessboard, blanket or gridded sheet. Preserve transparency.
