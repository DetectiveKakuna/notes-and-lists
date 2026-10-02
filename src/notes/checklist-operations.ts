import { compareItems } from "@/notes/sorting";
import {
  type ChecklistItem,
  type ChecklistNote,
  type WithId,
} from "@/notes/types";

export type ChecklistSections = {
  unchecked: WithId<ChecklistItem>[];
  checked: WithId<ChecklistItem>[];
};

export function getChecklistSections(note: ChecklistNote): ChecklistSections {
  const items = Object.entries(note.items)
    .map(([id, item]) => ({
      id,
      ...item,
    }))
    .sort(compareItems);

  const checked = items.filter((item) => item.checked);
  const unchecked = items.filter((item) => !item.checked);

  return { unchecked, checked };
}
