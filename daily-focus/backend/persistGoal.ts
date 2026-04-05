// CONTRACT
// Input: { rawInput: string } via first argument; storage adapter for key/value access
// Output: { success: boolean, data?: { goal: string | null }, error?: string }
// Errors: storage operation failed (remove/set), quota exceeded on set, unexpected internal error
// Side effects: reads/writes/removes key dailyFocus_goal in provided storage adapter (no SQL; schema.sql has no tables)

export const DAILY_FOCUS_STORAGE_KEY = "dailyFocus_goal";

export interface GoalStorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type PersistDailyGoalResult = {
  success: boolean;
  data?: { goal: string | null };
  error?: string;
};

function isQuotaExceededError(e: unknown): boolean {
  return (
    e instanceof Error &&
    (e.name === "QuotaExceededError" ||
      e.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

export async function persistDailyGoal(
  rawInput: string,
  storage: GoalStorageAdapter
): Promise<PersistDailyGoalResult> {
  try {
    const trimmed = rawInput.trim();

    if (trimmed.length === 0) {
      try {
        storage.removeItem(DAILY_FOCUS_STORAGE_KEY);
      } catch (removeErr) {
        console.error("[persistDailyGoal] removeItem", removeErr);
        return {
          success: false,
          error: "Could not update saved goal",
        };
      }
      return { success: true, data: { goal: null } };
    }

    try {
      storage.setItem(DAILY_FOCUS_STORAGE_KEY, trimmed);
    } catch (setErr) {
      if (isQuotaExceededError(setErr)) {
        return { success: false, error: "Storage is full; try a shorter goal" };
      }
      console.error("[persistDailyGoal] setItem", setErr);
      return { success: false, error: "Could not save goal" };
    }

    return { success: true, data: { goal: trimmed } };
  } catch (err) {
    console.error("[persistDailyGoal]", err);
    return { success: false, error: "Internal error" };
  }
}
