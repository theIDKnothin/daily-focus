/**
 * Page assembler: wires GoalForm + GoalDisplay to persistDailyGoal per CONTRACTS.md.
 */

import { mountGoalForm } from "./components/goal-form.js";
import { renderGoalDisplay } from "./components/goal-display.js";
import {
  persistDailyGoal,
  DAILY_FOCUS_STORAGE_KEY,
  type GoalStorageAdapter,
} from "./backend/persistGoal.js";

const storage: GoalStorageAdapter = localStorage;

function setErrorMessage(message: string | null): void {
  const el = document.getElementById("goal-error");
  if (!el) return;
  if (!message) {
    el.textContent = "";
    el.hidden = true;
    return;
  }
  el.textContent = message;
  el.hidden = false;
}

function loadStoredGoalText(): string {
  try {
    const saved = storage.getItem(DAILY_FOCUS_STORAGE_KEY);
    if (!saved) return "";
    const trimmed = saved.trim();
    return trimmed ? trimmed : "";
  } catch {
    return "";
  }
}

function main(): void {
  const formHost = document.getElementById("goal-form-mount");
  const displayHost = document.getElementById("goal-display-mount");
  if (!formHost || !displayHost) return;

  const displayEl = displayHost;
  let currentGoal = loadStoredGoalText();

  function syncDisplay(): void {
    renderGoalDisplay(displayEl, {
      heading: "Today's focus",
      goalText: currentGoal || null,
    });
  }

  const form = mountGoalForm(formHost, {
    inputId: "goal-input",
    labelText: "Your goal",
    placeholder: "e.g. Finish the project outline",
    submitLabel: "Save Goal",
    initialValue: currentGoal,
    onSubmit: async (rawValue) => {
      setErrorMessage(null);
      const result = await persistDailyGoal(rawValue, storage);

      if (!result.success) {
        setErrorMessage(result.error ?? "Could not save goal");
        return;
      }

      if (result.data?.goal === null) {
        currentGoal = "";
        form.setInputValue("");
      } else if (result.data?.goal !== undefined) {
        currentGoal = result.data.goal;
      }

      syncDisplay();
    },
  });

  syncDisplay();
}

main();
