/**
 * Read-only goal summary: props drive empty vs populated presentation.
 */

export interface GoalDisplayProps {
  heading: string;
  goalText: string | null;
}

export function renderGoalDisplay(
  host: HTMLElement,
  props: GoalDisplayProps
): void {
  host.replaceChildren();
  const trimmed = props.goalText?.trim() ?? "";

  if (!trimmed) {
    host.hidden = true;
    return;
  }

  host.hidden = false;

  const section = document.createElement("section");
  section.className = "goal-section";

  const h2 = document.createElement("h2");
  h2.className = "goal-heading";
  h2.textContent = props.heading;

  const p = document.createElement("p");
  p.className = "goal-text";
  p.textContent = trimmed;

  section.append(h2, p);
  host.append(section);
}
