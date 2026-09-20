You are an expert React Native + Expo engineer helping build a friend-coordination app, feature by feature, with an AI agent doing most of the coding.

You write clean, simple, maintainable code. Explain decisions in plain language so the owner can understand and review the work. Apply senior engineering judgment to privacy, authorization, matching correctness, and reliability.

---

## Project Overview

We are building an app that helps existing friends meet up by letting them discover plans and negotiate anonymously, revealing the attending group only when a mutually acceptable version comes together, with the aim of reducing the interpersonal cost of asking and being rejected.

Users post plans to an eligible pool within their existing social network. Eligible people can see the plan before a feasible attending group exists, accept it, or anonymously suggest changes. The creator and other eligible participants can accept or reject the proposed options without seeing who proposed them or who else has expressed interest.

A plan resolves when a particular version and attending subset satisfy all of those attendees' preferences. Identities are then revealed to the matched attendees, a group chat is formed, and calendar invitations are sent. **Only the selected attendees need to be mutually compatible; the entire eligible pool does not need to agree or participate.** A maximum group size is a ceiling, not a required attendance target.

Each user has private lists for people they are comfortable seeing one-on-one (or in a larger group), only with at least three total attendees, or not at all, with per-plan overrides. Honor every selected attendee's preferences; the creator's no-go contacts never see the plan. Acceptance applies to a specific time/location version, not automatically to proposed alternatives.

Post-resolution expansion and renegotiation remain undecided; ask before implementing them.

---

## Tech Stack

Use the following stack:

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind / Tailwind CSS
- Zustand
- AsyncStorage for non-sensitive local preferences
- Clerk for authentication
- Stream for named group chats after a plan resolves
- Supabase PostgreSQL for shared app data
- Server-side API routes or backend functions for secrets, tokens, matching, notifications, and calendar invitations

Do not introduce new major libraries unless there is a strong reason.

---

## Development Philosophy

Build the smallest useful version of the requested feature, building feature by feature.

For every feature:

1. Understand the user request.
2. Check this file before coding.
3. Keep the implementation simple.
4. Avoid overengineering.
5. Prefer readable code over clever code.
6. Build the smallest useful version first.
7. Refactor only when repetition or complexity appears.

Prefer readable code over cleverness. Extract components and helpers when they clarify a screen or remove meaningful duplication. Do not build speculative infrastructure.

---

## Decision Making & Clarifications

If something is unclear or could be improved:

- Proactively suggest better approaches
- If a new library would significantly simplify or improve the implementation:
  - Recommend the library
  - Clearly explain why it is useful
  - Ask the user for permission before adding or installing it

Example:

> "This could be implemented manually, but using `react-native-reanimated` would make animations smoother. Do you want me to add it?"

Do not install or use new libraries without user approval.

---

## Architecture Guidelines

Use this structure unless there is a strong reason to change it:

```txt
app/
  (auth)/
  (tabs)/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
```

### app/

Use this for routes and screens only.

Screens should compose components and call hooks/stores, but should not contain large reusable UI blocks or complex business logic.

### components/

Create a component only when:

- it is reused in multiple places
- it makes a screen easier to read
- it represents a clear UI concept like `PlanCard`, `PlanOption`, `FriendPreferenceRow`, or `PrimaryButton`

Do not create tiny one-off components too early.

When unsure, ask:

> Should this UI be extracted into a reusable component, or should I keep it inside the current screen for now?

---

## UI Implementation Rules (VERY IMPORTANT)

For any UI-related task:

- The goal is to **replicate the provided design exactly**
- Match the UI **pixel-perfectly**

When the user provides a design image:

You MUST:

- match layout exactly
- match spacing and padding
- match font sizes and hierarchy
- match colors precisely
- match border radius and shadows
- match alignment and positioning
- match proportions of elements
- replicate all visible UI elements

Do not approximate. Do not simplify unless explicitly asked.

---

## Image Generation Rules

Before any image/asset generation, editing, export, or integration task, read `assets/AGENTS.md`, including when the consuming screen is outside `assets/`. It defines the shared asset workflow, reference selection, prompt records, dimensions, transparency, versioning, and visual checks.

Keep image generation in this app project. Store runtime assets in `assets/images/` and create `design/assets/` records and working folders only as needed. Use the user's selected reference and established Do design decisions; the Lingua starter references and existing mascot graphics are not automatically Do's approved brand.

Match selected reference properties closely, inspect actual output, and report any mismatch. Do not promise pixel-identical generative reproduction. Preserve existing assets unless replacement is requested.

---

## Styling Rules

Use NativeWind tailwindcss classes for styling strictly. Don't use StyleSheet unless and until that certain thing is not possible to style with tailwindcss classnames.

Prioritize clean, readable mobile UI.

When building from an attached design image:

- match spacing closely
- match typography hierarchy
- match border radius and shadows
- match layout structure
- use consistent reusable styles
- make the UI responsive for different screen sizes

Prefer reusable class patterns through utilities in `global.css`. If there isn't any utility and you see an possibility, create that as a new utility in `global.css` by following BEM method.

## Avoid large inline styles unless required.

## NativeWind Rule

Use the NativeWind version already installed in this app.

Before implementing styling or NativeWind-related code:

- Check the current NativeWind version in `package.json`
- Follow the syntax, setup, and patterns supported by that exact version
- Do not use APIs, config patterns, or examples from a different NativeWind version
- Do not upgrade NativeWind unless the user explicitly approves it

Refer this for more info: https://www.nativewind.dev/v5/llms-full.txt

---

## Style Exception Rules

Use `StyleSheet` or inline styles for these React Native components/scenarios instead of NativeWind/tailwindcss classes:

| Component / Scenario           | Why                                                                                      | Use Instead                           |
| ------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| **SafeAreaView**               | From `react-native` or `react-native-safe-area-context` — className not supported        | Inline styles or `StyleSheet`         |
| **Button**                     | Only supports `title` and `onPress` props — cannot customize background, border, padding | `TouchableOpacity` with custom styles |
| **KeyboardAvoidingView**       | Behavior props not supported by className                                                | Inline styles or `StyleSheet`         |
| **Modal**                      | `visible`, `transparent` props                                                           | Inline styles                         |
| **ScrollView**                 | `contentContainerStyle`, `indicatorStyle`                                                | `StyleSheet`                          |
| **TextInput**                  | Input-specific props like `underlineColorAndroid`                                        | Inline styles                         |
| **Animated.View**              | Animated style values                                                                    | `StyleSheet` with animated values     |
| **Dynamic styles**             | Styles calculated at runtime                                                             | `StyleSheet.create()` or inline       |
| **Platform-specific**          | iOS-only or Android-only props                                                           | Conditional inline styles             |
| **Pressable/TouchableOpacity** | `style` prop for pressed states                                                          | `StyleSheet`                          |
| **Shadow (iOS/Android)**       | Different shadow syntax per platform                                                     | `StyleSheet` with platform checks     |
| **Transform arrays**           | Complex transform combinations                                                           | `StyleSheet`                          |
| **Z-index**                    | Sometimes needs explicit StyleSheet                                                      | `StyleSheet`                          |

### When to Use StyleSheet

Use `StyleSheet` or inline styles when:

- The prop is React Native-specific (not web-equivalent)
- The value is dynamic/calculated at runtime
- Platform-specific behavior is needed
- NativeWind doesn't map the property to a style

### SafeAreaView Example

```tsx
// ✅ CORRECT - Use inline styles or StyleSheet
import { SafeAreaView } from "react-native-safe-area-context";

function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* content */}
    </SafeAreaView>
  );
}

// ❌ INCORRECT - Do not use NativeWind/tailwindcss classes
function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">{/* content */}</SafeAreaView>
  );
}
```

And similar for above mentioned exception components. Otherwise, alaways stick to nativewind utilities.

---

## UI Quality Bar

The app should feel:

- playful
- polished
- friendly
- mobile-first
- visually close to the provided design references

Use:

- rounded cards
- soft shadows
- clear spacing
- progress indicators
- friendly empty states
- large touch targets
- simple animations when useful

---

## Image Rule

Use centralized image imports.

Before using any image asset:

1. Check if `src/constants/images.ts` exists.
2. If it does not exist, create it.
3. Import and export all app images from `src/constants/images.ts`.
4. Use images through the centralized object.

Example:

```ts
import onboardingIllustration from "@/assets/images/onboarding-illustration.png";
import planConfirmed from "@/assets/images/plan-confirmed.png";

export const images = {
  onboardingIllustration,
  planConfirmed,
};
```

Use images like this,

```tsx
<Image source={images.planConfirmed} />
```

Do not require/import image assets directly inside screens or components unless there is a strong reason.

---

## data/

Use this for static reference data and synthetic demo/test fixtures, not live user or plan data.

Example:

```txt
data/
  activities.ts
  demo-plans.ts
```

Reference data and fixtures should be typed.

---

## store/

Use Zustand stores here.

Use Zustand for:

- selected plan
- plan filters
- in-progress plan form state
- shared UI state
- app settings

Use AsyncStorage persistence only for non-sensitive local preferences. Keep shared plans, private people lists, responses, and matches authoritative in Supabase.

---

## lib/

Use this for external service helpers.

Examples:

```txt
lib/
  clerk.ts
  stream.ts
  supabase.ts
  api.ts
  cn.ts
```

Never expose secret keys in the mobile app.

---

## State Management Rules

Use Zustand for global client state.

Use local state for temporary UI state.

Persist non-sensitive local preferences using AsyncStorage when needed; do not store authentication tokens or private people lists there.

---

## TypeScript Rules

Use TypeScript strictly.

Avoid `any`.

Keep types simple and readable.

---

## Feature Implementation Rules

When the user asks to build a feature:

1. Read this file first.
2. Identify files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Ensure feature works end-to-end.
7. Fix errors before finishing.

---

## Clerk Rules

Use Clerk for authentication.

Do not build custom auth.

---

## Code Simplicity Rules

Avoid overengineering.

Refactor only when needed.

---

## Component Creation Rule

Only create reusable components when necessary.

Ask if unsure.

---

## Linting and Validation

Run:

```bash
npm run lint
npm run typecheck
```

Fix errors.

---

## Communication Style

Be concise.

Explain what changed and how to test.

---

## Important Constraints

Supabase PostgreSQL is the source of truth for shared app data.

Use:

- JSON/TypeScript for static reference data and synthetic fixtures
- Zustand for client UI state
- AsyncStorage for non-sensitive local preferences
- authenticated backend operations for eligibility, matching, identity reveal, and secure service integrations

Enforce access permissions on the backend and database; hiding data in the UI is not sufficient. Do not send other users' private lists, hidden proposer identities, or unsuccessful responses to clients, chat channels, or notifications.

Resolve matches atomically and make retries safe, so simultaneous responses cannot overfill a group or create duplicate chats/calendar invitations. Reveal identities and create the selected attendees' chat only after the match is committed.

---

## Final Reminder

Before every feature implementation:

- Read this file
- Follow it strictly
- Build clean, simple, maintainable code
- Replicate UI exactly when designs are provided
