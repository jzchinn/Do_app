# Home event photos v01

Built-in image generation; photorealistic-natural. Draft decorative imagery for synthetic events only, never attendees. Reference: design/references/home/Home_reference.PNG (rounded landscape activity photos), design/style-guide.md (natural greens beside forest/lime UI). Three images reused across six demo events. No existing assets replaced.

Display: 137 × 84 logical units; export 480 × 294 JPEG, cover crop. Opaque backgrounds. No text, logos, people, or watermarks. Masters preserved in design/assets/masters; runtime files in assets/images/home; registry in src/constants/images.ts.

Exact prompts:

1. Natural candid editorial photograph for a small landscape event thumbnail in a friends meetup app. Two tennis rackets and two tennis balls resting on a lush green outdoor tennis court beside the net, soft late-afternoon sunshine, realistic subtle grain, relaxed recreational mood, close composition with recognizable equipment centered. Landscape 5:3 framing. No people, text, logos, watermark, borders, or UI. Opaque photograph.
2. Natural candid editorial photograph for a small landscape event thumbnail in a friends meetup app. A picnic blanket with a woven basket, bread, grapes and sparkling water on grass in a leafy park, soft late-afternoon sunshine, realistic subtle grain, relaxed recreational mood, close composition with recognizable picnic objects centered. Landscape 5:3 framing. No people, text, logos, watermark, borders, or UI. Opaque photograph.
3. Natural candid editorial photograph for a small landscape event thumbnail in a friends meetup app. Colorful generic board game pieces, dice, cards and a simple unbranded board on a warm wooden cafe table beside two ceramic mugs, soft window light, realistic subtle grain, relaxed recreational mood, close composition with recognizable game objects centered. Landscape 5:3 framing. No people, text, logos, watermark, borders, or UI. Opaque photograph.

## Output and inspection

Generated with the built-in image tool. All three masters are 1619 × 971 opaque PNGs. Inspected the generated subjects and final native thumbnail crops: activity equipment is legible, no people or embedded text, and no broken crop or border. JPEG exports are 480 × 294 (see home-photos-v01.json for sizes). Tennis is a hard court rather than the requested lush surface; it still depicts the correct activity and suits the reference. No regeneration needed. These are implementation candidates, not independently user-approved brand assets.
