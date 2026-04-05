# ARCHITECTURE.md — Daily Focus

## Stack
- **Markup / behavior:** HTML5 + **vanilla JS** (ES modules) in the browser — no React/Vue; optional **TypeScript** source compiled to JS via `npm run build`.
- **Styling:** Plain CSS in a separate file — brief requires CSS; separation keeps layout readable.
- **Persistence:** `localStorage` — brief allows browser storage; no server or SQL database in v1.
- **Hosting:** Any static host or local static server — ES modules require **HTTP** (not `file://`) unless the user bundles to a single script later.

## Folder Structure
```
/daily-focus
  index.html           — shell + mount points + error region
  styles.css           — layout, typography, colors
  app.ts               — page assembler (source)
  app.js               — emitted by `tsc` (do not hand-edit)
  tsconfig.json
  /components          — stateless typed UI modules (goal form, goal display)
  /backend             — persistence contracts (e.g. persistGoal.ts)
```

## Naming Conventions
- **Files:** kebab-case for folder (`daily-focus`); `index.html`, `styles.css`, `app.js` as above.
- **JavaScript:** camelCase for variables/functions; one constant for the storage key (e.g. `STORAGE_KEY`).
- **CSS:** kebab-case class names (e.g. `.goal-display`).

## Architectural Decisions
- **Single HTML file** — brief is a one-page app; no client-side router.
- **localStorage JSON or plain string** — store the goal as a string under a single key; simplest path for one field.
- **Progressive enhancement:** script loads at end of body; if JS fails, input still visible (optional empty display area).

## Data (client)
- **Key:** `dailyFocus_goal` (or namespaced equivalent) — single string value; no schema migration in v1.

## Security / privacy
- Data stays in the user’s browser; document that clearing site data removes the goal.

## Optional typed persistence layer
- `daily-focus/backend/*.ts` — TypeScript persistence contracts aligned with `LOGIC.md` and `CONTRACTS.md`.

## Build
- From repo root: `npm install` then `npm run build` — emits `app.js` and sibling `.js` files next to `.ts` sources under `daily-focus/`.
