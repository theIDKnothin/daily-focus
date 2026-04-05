# LOGIC.md — Daily Focus

Source: ARCHITECTURE.md only. Persistence is browser `localStorage` under key `dailyFocus_goal`. **schema.sql** defines no SQL tables for this app; nothing is written to a server database.

---

## Flow: Page load — restore saved goal

**Trigger:** User opens or refreshes the page; the document finishes loading and the client script runs.

**Validation:**
- Script must run in an environment where the DOM for the input and goal display exists.
- [ASSUMPTION: If JavaScript is disabled, the input is still visible but nothing is restored or saved.]

**Happy Path:**
1. Read string value from `localStorage` for key `dailyFocus_goal`.
2. If value is non-empty after trim:
   - Set the text input to that string.
   - Show the goal display region below the button with that text.
3. If value is missing or empty after trim:
   - Leave input empty (or as default).
   - Keep the goal display hidden or empty.

**Error Cases:**
- If `localStorage` is inaccessible (throws or blocked):
  - Catch error; log internally; do not crash the page.
  - Leave input empty; hide or clear goal display.
  - User can still type; save may fail again (see save flow).
- If stored value is absurdly large:
  - [ASSUMPTION: Still display/truncate per product decision; architecture does not cap length.] Prefer showing full text unless UI breaks; optional safe cap in validation layer later.

**Side Effects:**
- None beyond reading `localStorage` and updating DOM.

---

## Flow: User saves goal (submit form)

**Trigger:** User clicks or activates "Save Goal" (form submit).

**Validation:**
- Input value may be any string; trim leading/trailing whitespace before deciding empty vs non-empty.

**Happy Path:**
1. Prevent default form submission (no full page reload).
2. Trim the input value.
3. If trimmed string is non-empty:
   - Write trimmed string to `localStorage` under `dailyFocus_goal`.
   - Update goal display text to trimmed string.
   - Show goal display region below the button.
4. If trimmed string is empty:
   - Remove `dailyFocus_goal` from `localStorage` (or set to empty if removal unsupported — prefer remove).
   - Hide goal display and/or clear its text.
   - Optionally clear input (architecture leaves input as user typed; [ASSUMPTION: keep raw input as-is unless product prefers clearing]).

**Error Cases:**
- `localStorage.setItem` throws (quota exceeded, security error):
  - Catch; do not expose raw exception message to the user.
  - Return or show a generic failure state; optionally still show the goal in memory/UI only [ASSUMPTION: show in UI but warn that refresh may lose it — or silent fail; product can tighten later].
- `localStorage.removeItem` throws on clear path:
  - Catch; log; hide display; user may see stale UI until refresh — minimize by same error handling as set.

**Side Effects:**
- Mutates `localStorage` for key `dailyFocus_goal` (set or remove).
- Updates visible goal text and visibility.

---

LOGIC COMPLETE
