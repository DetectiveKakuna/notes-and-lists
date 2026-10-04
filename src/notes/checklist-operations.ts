import { compareItems } from "@/notes/sorting";
import {
  type ChecklistItem,
  type ChecklistNote,
  type WithId,
} from "@/notes/types";
import { type EpochMs } from "@/utils/time";

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

export function updateItemText(
  note: ChecklistNote,
  itemId: string,
  newText: string,
  epochNow: EpochMs,
): ChecklistNote {
  const item = note.items[itemId];

  return item
    ? {
        ...note,
        updatedAt: epochNow,
        items: {
          ...note.items,
          [itemId]: { ...item, text: newText },
        },
      }
    : note;
}

export function toggleItemCheckmark(
  note: ChecklistNote,
  itemId: string,
  epochNow: EpochMs,
): ChecklistNote {
  const item = note.items[itemId];

  return item
    ? {
        ...note,
        updatedAt: epochNow,
        items: {
          ...note.items,
          [itemId]: { ...item, checked: !item.checked },
        },
      }
    : note;
}
