# Shelved assets (not in the app build)

Files here are **not referenced by the app** and are not bundled. They were moved out of `assets/` so the runtime folder only holds what ships. Nothing here is deleted; move a file back to `assets/images/` (and register it in `src/constants/images.ts`) to use it.

| File | Why it is shelved |
| --- | --- |
| `do-mask-v01.png` | Generated "Do" alpha mask (1536 x 1024). Its proportions (~1.7:1, small "o") do not match the login design (~1.17:1, "o" about half the D). The login cutout uses a fitted geometric shape instead (`design/scripts/export-login-assets.cjs`). An identical original is in `design/assets/masters/`. |
| `do-board-game-v01.png` | Superseded by `do-board-game-v02.png`. |
| `do-concert-v01.png` | Superseded by `do-concert-v05.png`. |
