# Do App — Image and Asset Workflow

These instructions apply to asset generation, editing, export, and integration. Read the root `AGENTS.md` for product and engineering requirements. All paths below are relative to the app root unless stated otherwise.

## Product context and truthful imagery

Do helps existing friends coordinate plans through private interest and anonymous negotiation, then reveals the selected attendees after a mutually acceptable plan resolves. It is not a stranger-discovery or language-learning app.

- Illustrate relevant activities and states: proposing a hangout, exploring plans, suggesting alternatives, waiting, or confirming a plan.
- In screens or explanatory artwork representing unresolved plans, do not expose interested people, proposers, decliners, private preference lists, or an implied confirmed guest list. Generic people in decorative activity art are not actual attendees; make that distinction clear.
- Show named attendees and their group chat only in the resolved state. Do not imply that every invited person must agree or that a maximum group size must be filled.
- Avoid public rejection scores, popularity rankings, or shame-based empty states. Do not invent streaks, rewards, or other product mechanics from the starter graphics.
- Do not claim the app is proven to reduce loneliness, eliminate rejection, or guarantee anonymity against inference. These are not established outcomes.

## Sources and current design status

Read the requested screen, current assets, and applicable design references before generating anything. Resolve design decisions in this order: the user's current explicit direction; an explicitly selected app design/reference; established app tokens and accepted assets; then a clearly labeled provisional choice.

Context inspected when these rules were written:

- Root `AGENTS.md`: friend-coordination mechanics; playful, polished, friendly, mobile-first presentation; rounded cards, soft shadows, clear spacing, and friendly empty states.
- `prompt_material/01-design-system.png`: a **Lingua** reference with a fox mascot, Poppins typography, and purple/blue/green colors. This is an available reference, not evidence that Do has adopted that brand.
- Other files in `prompt_material/` include onboarding, auth, language selection, home/navigation, and lesson references. Use only the elements relevant to the requested Do screen.
- `assets/fonts/` contains Poppins Regular, Medium, SemiBold, and Bold. Availability alone does not establish a typography decision.
- `assets/images/` contains mascot, treasure, globe, palace, fire, React, and platform images. Presence does not establish approval or permission to replace a file.
- `src/app/index.tsx` is a minimal “Do Something” screen; `src/global.css` currently contains framework imports, not a complete Do design system.

Do not silently adopt Lingua's wordmark, fox, palette, lesson imagery, or gamification as Do's identity. When the user selects a reference, match its relevant visual properties closely and record which properties were selected. Do not promise pixel-identical generative output.

If a brand decision is genuinely needed and absent, ask one focused question while preparing independent work. Routine choices may use stated provisional assumptions; do not stop for approval already given. Record enduring choices in `design/assets/style-guide.md` when the first asset work needs it. Distinguish accepted decisions from proposals.

## Choose the right asset method

- Reuse a suitable existing asset before creating a duplicate.
- Extend the existing vector/icon system for navigation symbols, simple icons, logos, and geometric UI elements. Keep stroke, viewbox, and optical size consistent. Check installed rendering support before adding SVG files or a library.
- Build text, cards, buttons, gradients, and interactive layouts as native UI, not flattened screenshots.
- Use image generation for requested raster illustrations, photos, textures, and complex artwork. Use the available image-generation skill and built-in tool; do not silently switch to a paid API or install dependencies.
- For an edit, inspect the original, identify it as the edit target, and explicitly list what must remain unchanged. Label other inputs as style or composition references.
- Keep labels, buttons, and essential copy outside artwork for accessibility and localization. Include embedded text only when explicitly required, and verify it verbatim.

## Asset brief and prompt

Before each generation, record the following in `design/assets/prompts/<asset-id>-vNN.md`. Keep this lightweight; one record per asset version is enough.

```text
Asset ID and version:
Purpose / screen / UI state:
Product meaning and intended audience:
Reference paths and roles (edit target, style, composition):
Subject and action:
Style / shape language / detail level:
Palette (established tokens or explicitly provisional colors):
Lighting / shading / perspective:
Composition / focal point / clear space:
Display size in logical units; required export size in pixels:
Aspect ratio; crop or contain behavior:
Background: genuine transparency or specified opaque color:
Exact embedded text: none unless requested:
Preserve:
Change:
Avoid:
Destination and naming:
```

Translate the brief into a concise prompt. Reuse the same style block and reference asset for related images. Fix palette, line weight, shading, perspective, character proportions, and visual density across a family. Vary only the requested subject, pose, expression, or state. Do not introduce extra characters, scenery, slogans, or visual effects without a reason grounded in the brief.

For a new family, make one representative asset first, check it against the brief and screen, then extend that direction. Existing accepted direction does not require renewed approval. Save the actual final prompt and references, not only the initial request. Record tool/model/settings/seed only when available; do not invent them or claim a seed guarantees reproduction.

## Dimensions, transparency, and formats

- Derive dimensions and aspect ratio from the consuming component or selected design. Do not impose a universal square canvas or arbitrary size on every asset.
- Distinguish logical display size from exported pixels. For example, a 160 × 120 logical-unit illustration may need 320 × 240 and 480 × 360 exports for 2× and 3× use. Use the project's actual density strategy and consistent framing across variants.
- Preserve an original master. Export at the needed size without stretching or claiming that upscaling creates real detail. Inspect actual output dimensions rather than assuming the generator followed the prompt.
- Use PNG with an alpha channel for transparent illustration masters. Check for actual transparency, clean edges, halos, unintended shadows, and baked-in checkerboards on light and dark backgrounds.
- Use JPEG or an app-supported compressed format for opaque photos when appropriate; never use JPEG for transparency. Keep vectors as vectors when that is the source format.
- Keep enough padding for the intended placement. Ensure crops, rounded masks, and smaller screens do not cut off essential content.
- Optimize final exports for the intended screen. Record file size; do not ship an oversized generation master when a smaller export is sufficient.
- Treat launcher icons, adaptive icons, favicons, and splash artwork separately. Inspect `app.json` and current platform requirements before changing them; a transparent in-app illustration is not automatically a valid launcher icon.

## File organization and versioning

Keep asset work in the app project so the brief, references, and implementation stay together. Use these locations as needed; do not create empty infrastructure in advance:

```text
assets/AGENTS.md                  This workflow
assets/images/                    Assets consumed by the app
assets/fonts/                     Existing font files
prompt_material/                  Existing references; preserve originals
design/assets/style-guide.md      Accepted visual decisions, sources, open questions
design/assets/references/         Additional selected references
design/assets/drafts/             Candidate images, excluded from app imports
design/assets/masters/            Selected original images
design/assets/prompts/            Briefs, prompts, iterations, and QA notes
```

Use lowercase kebab-case with a meaningful role and explicit revision, for example `onboarding-make-plans-v01.png`, `empty-plans-v01.png`, or `plan-confirmed-v02.png`. Use `@2x`/`@3x` only for real density variants of the same asset. Preserve established names where referenced. Do not rename existing files just to tidy them.

Never overwrite an accepted asset unless replacement is requested. Save a sibling revision and retain the previous working version. Mark candidates as draft, selected, or superseded in their prompt records; do not label them user-approved without that decision. Copy selected outputs into the project before integration; never make the app depend on a temporary generation URL or a tool cache path.

## Iteration and visual checks

Inspect outputs rather than accepting a successful tool response as quality assurance.

1. Check product meaning, requested content, reference fidelity, and any edit invariants.
2. Compare related assets side by side for palette, proportions, perspective, shading, and apparent size.
3. Inspect the asset at its intended mobile display size, not only enlarged. Check clutter, recognizable silhouettes, crops, and clear space for UI copy.
4. Check actual dimensions, format, alpha, edge quality, and file size. Verify exact text if any was requested.
5. Preview the asset in the target screen and applicable light/dark backgrounds. Essential meaning must also be available through UI text or accessibility labels; decorative imagery should not add redundant announcements.
6. Fix a specific observed problem per revision while preserving the stable style constraints. Save brief iteration notes. If repeated attempts fail, describe the limitation and propose a targeted alternative; do not regenerate indefinitely or silently change style.

If screen integration or visual inspection cannot be performed, label that check as pending. Do not claim production readiness based on file generation alone.

## Integration and delivery

- For app-bound work, use centralized imports in `src/constants/images.ts` (create it when first needed). The current `@/*` alias maps to `src/*`; `@/assets/*` maps to root `assets/*`. Do not accidentally create a second root-level image registry.
- Follow the installed image component's supported sizing and fit behavior, preserve aspect ratio, and check the actual consuming screen. App-config icon/splash paths remain in `app.json`.
- Asset-only requests do not authorize unrelated screen redesigns. Update consuming code when integration is part of the request.
- For code integration, run the repository's applicable lint and type checks. At writing, `package.json` has `npm run lint` but no `typecheck` script; use the installed TypeScript compiler with `--noEmit` rather than claiming the missing script ran. Documentation-only work requires a content/path review, not an app build.
- Finish with the delivered files, intended screen/state, saved prompt/reference record, checks actually performed, and any remaining limitation. Show the resulting image when available. Be concise and distinguish design judgment from verified properties.
