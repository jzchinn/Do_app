# Login toast photo cleanup — v01

- Status: draft edit requested by user; asset-only, no screen integration.
- Purpose / audience: existing login photo showing a social toast.
- Reference / edit target: `design/assets/masters/quan-nguyen-yDSe7sggb9Q-unsplash_redX.jpg`.
- Subject: upward-looking photograph of hands holding champagne glasses against sky.
- Style / palette / lighting: preserve the source photographic detail, blue sky, clouds, natural sunlight, and perspective.
- Composition: preserve full 3:2 landscape frame and foreground toast.
- Source dimensions: 6720 × 4480 pixels; request source dimensions, verify actual output.
- Display size: unspecified; no consuming screen change requested.
- Background: opaque photographic sky; no text.
- Preserve: unmarked people, foreground arms/hands/glasses, watches/jewelry, boat structures, framing and lighting.
- Change: remove the marked head/person at upper left, marked head/person at lower left, and marked background photographer at right (including camera and black clothing); remove all red X marks and naturally reconstruct sky behind removed regions.
- Avoid: changing unmarked people or foreground toast, adding people/objects, crop changes, red residue, visible fill seams.
- Destination: `design/assets/masters/quan-nguyen-toast-cleaned-v01.png` (original preserved).
- Tool: built-in image_gen; no seed/settings available.

## Exact prompt

Use case: precise-object-edit. Edit the supplied marked photograph. Remove the THREE background people identified with red X marks: (1) the partially visible face/head at the upper-left edge, (2) the face/head and visible background body at the lower-left edge, and (3) the black-clad photographer at the right, including their camera, camera-holding hands, and visible body. Remove every red annotation. Fill their vacated areas seamlessly with realistic blue sky/clouds consistent with the surrounding photo. Preserve ALL foreground toasting arms, hands, champagne glasses, watches and jewelry exactly as closely as possible, including the arms crossing in front of the removed background heads. Preserve the unmarked person at the bottom edge and the unmarked person at the upper-right edge. Preserve the boat structures, full original composition, 3:2 aspect ratio, sunlight, color grading, focus, and photographic texture. Do not crop or recompose, add people, or alter any other objects. Target original 6720 by 4480 dimensions if supported.

## QA

Visually inspected generated output: all three marked background people and all red Xs are removed; foreground toast, unmarked bottom/right people and boat framing remain. Sky/cloud patterns and some fine photo detail were regenerated, so untouched regions are not pixel-identical. Actual output is 1536 × 1024 PNG (3:2), below the 6720 × 4480 source resolution. Original retained. No screen integration or app code changes; screen preview and app checks are not applicable to this asset-only edit.
