# Home screen

Implemented at `src/app/home.tsx`, composed by `src/components/home-screen.tsx` and `event-card.tsx`.

## Reference and adaptations

`design/references/home/Home_reference.PNG` is 1170 × 2532, interpreted as 390 × 844 logical units. Retains the left Home heading, sparkle, right circular profile image, floating rounded four-icon navigation bar, category pills, date headings, text-left/photo-right event rows, heart controls and separators. Removes the groups carousel, start-group banner, and Your groups event filter as requested.

Uses the authoritative forest / lime / charcoal palette and Poppins families from `src/global.css`, matching the login implementation. Reuses its pale background texture through the image registry. Explicit image width and height avoid the NativeWind v5 Image aspect-ratio issue documented in `design/login-screen.md`. Safe-area insets and scroll bottom padding keep content clear of the floating navigation bar. Glass renders natively where supported, with a pale opaque fallback elsewhere.

Six typed synthetic events live in `src/data/demo-events.ts`, two per initial category. Going means a confirmed match; Past means a completed event. Saved does not imply acceptance, and unresolved fixtures cannot contain attendees. Initial avatars are synthetic, not photos of actual attendees. Sample labels distinguish fixtures from live shared data. Save toggles affect in-memory preview state only. Sharing is omitted because private-plan sharing and eligibility are not yet implemented.

The four bottom positions match the reference. Explore, Notifications and Messages are disabled and labeled coming soon; no fabricated notification badges. Home resets the category to Going. Profile opens a guarded account page with sign-out. Existing index, email and social auth redirects already target `/home` and remain intact.

## Photos

Generated using the built-in image tool; exact prompts and brief: `design/assets/prompts/home-event-photos-v01.md`. Runtime JPEGs: `assets/images/home/`. Masters: `design/assets/masters/home-{tennis,picnic,games}-v01.png`. Reproduce exports with `node design/scripts/export-home-assets.cjs`; dimensions and byte sizes: `design/assets/exports/home-photos-v01.json`. Natural decorative activity photos, no attendee identities or text. Photos differ from the reference's tennis photographs intentionally to depict the demo activities.

## Validation

Lint and TypeScript checks pass. Visual simulator and interaction check results are recorded below after inspection. Production backend event fetching, persisted saves and the other navigation destinations are outside this prototype.

Verified in Expo Go 57 on the iPhone 17 Pro simulator: Going and Past render two events each; saving a Going event adds it to Saved; removing all saved events shows the empty state; Saved unresolved events display the privacy label without attendees. All three photo crops render at their intended dimensions. Reduced texture opacity to 8% after native inspection. The temporary synthetic-only preview route was removed after inspection. A fresh Clerk login, profile sign-out, Android/web rendering and large accessibility text were not exercised in this pass.
