# API contracts — Daily Focus

## `persistDailyGoal` (`daily-focus/backend/persistGoal.ts`)

```
// CONTRACT
// Input: { rawInput: string } via first argument; storage adapter for key/value access
// Output: { success: boolean, data?: { goal: string | null }, error?: string }
// Errors: storage operation failed (remove/set), quota exceeded on set, unexpected internal error
// Side effects: reads/writes/removes key dailyFocus_goal in provided storage adapter (no SQL; schema.sql has no tables)
```

Integration agents should pass `window.localStorage` (or a test double implementing `GoalStorageAdapter`) as the second argument.
