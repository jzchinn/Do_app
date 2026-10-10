# Do concert — v05

Status: selected for delivery after visual QA; rendering awaits user review.

## Result / QA

- Original 1254×1254 PNG master retained. Runtime export: 192×192; 8,889 bytes.
- Checked enlarged and at 32/48 px alongside cheers, hiking and picnic on white and charcoal. No visible unintentional holes, checkerboard background, clipped silhouettes or light fringes in final exports.
- Final export uses forest/lime separation following the existing cheers pipeline, yielding exact forest ink and alpha 0–255. The small mic is deliberately subordinate to the stage; fine grille detail is lost at 32 px.
- Current preview/report: `../onboarding-icons-preview-v02.png` and `../onboarding-icons-report-v02.json`.
- Registry points to this revision. Original v01 retained. No screen layout changes; device/in-screen placement remains pending.

Transparent v02–v04 outputs contained unintended alpha damage inside otherwise solid curtain/backdrop regions. Targeted alternate export method, matching the established cheers export workflow: generate opaque forest/lime artwork, then separate the two inks into forest with alpha. Preserve the approved requested composition, no change of palette family or subject.

- Edit target: `design/assets/masters/do-concert-v03.png`, composition only; blemish must be removed.
- Purpose: decorative onboarding icon, no actual participants.
- Style/subject: small mic on distant stage, spotlight, side curtains, rounded silhouettes.
- Palette: forest #1E5128 foreground; lime #D8E9A8 temporary export background.
- Lighting: graphic negative-space spotlight only, no tonal lighting.
- Master: opaque square PNG, requested 1024×1024; preserve original in `design/assets/masters/do-concert-v05.png`.
- Export: `assets/images/do-concert-v05.png`, 192×192, genuine transparency derived from ink separation, contain and preserve aspect ratio.
- No text, noise, gradients, extra objects or people.
- Tool: built-in image_gen; model/seed not exposed.

## Actual prompt

Use case: precise-object-edit. Re-render this stage icon as pristine flat TWO-COLOR opaque artwork. Preserve the composition: top rail, pulled-back curtains, overhead light, widening spotlight cone and oval pool, small retro mic on a long narrow stand, broad curved stage platform. The microphone is viewed from far away and is much smaller than the stage. Remove the irregular blemish inside the left curtain completely. ALL foreground stage/curtain/mic shapes are perfectly uniform solid FOREST GREEN #1E5128. ALL background and negative spaces, including the spotlight cone, oval pool, and curtain folds, are perfectly uniform solid PALE LIME #D8E9A8. Absolutely NO transparency or alpha cutout in this output. Opaque two-color screenprint with clean sharp rounded edges. No gradients, lighting, texture, speckles, patches, shadows, text or extra objects. Keep same square framing and comfortable padding. Every flat region is perfectly uniform.
