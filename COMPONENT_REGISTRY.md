# Component registry — Daily Focus

Built by the UI Component Agent. Pages may only import components listed here.

## `GoalForm` (`daily-focus/components/goal-form.ts`)

**Export:** `mountGoalForm(host: HTMLElement, props: GoalFormProps): GoalFormHandle`

**Props (`GoalFormProps`):**
| Prop | Type | Purpose |
|------|------|---------|
| `inputId` | `string` | `id` / `for` linkage for the text field |
| `labelText` | `string` | Visible label for the input |
| `placeholder` | `string` | Input placeholder |
| `submitLabel` | `string` | Primary button label |
| `initialValue` | `string` | Starting input value |
| `onSubmit` | `(rawValue: string) => void` | Called on form submit with raw input value |

**Handle (`GoalFormHandle`):**
| Method | Type |
|--------|------|
| `setInputValue` | `(value: string) => void` |
| `getInputValue` | `() => string` |

**States:** N/A (controlled by parent via `initialValue` / handle updates)

---

## `GoalDisplay` (`daily-focus/components/goal-display.ts`)

**Export:** `renderGoalDisplay(host: HTMLElement, props: GoalDisplayProps): void`

**Props (`GoalDisplayProps`):**
| Prop | Type | Purpose |
|------|------|---------|
| `heading` | `string` | Section heading (e.g. "Today's focus") |
| `goalText` | `string \| null` | Goal copy; `null` or whitespace-only hides the block |

**States:** empty (`goalText` null/blank — host hidden); populated (non-empty trimmed text)
