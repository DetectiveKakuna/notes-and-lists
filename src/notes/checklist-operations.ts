import { compareItemOrder } from "@/notes/sorting";
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

export function getChecklistSections(
  note: ChecklistNote,
  settling: ReadonlySet<string> = new Set(),
): ChecklistSections {
  const items = Object.entries(note.items)
    .map(([id, item]) => ({ id, ...item }))
    .sort(compareItemOrder);

  const showInChecked = (item: WithId<ChecklistItem>) =>
    item.checked !== settling.has(item.id);

  return {
    unchecked: items.filter((item) => !showInChecked(item)),
    checked: items.filter(showInChecked),
  };
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

export function createItem(
  note: ChecklistNote,
  itemId: string,
  order: number,
  epochNow: EpochMs,
): ChecklistNote {
  return {
    ...note,
    updatedAt: epochNow,
    items: {
      ...note.items,
      [itemId]: {
        text: "",
        checked: false,
        order,
        indent: 0,
        createdAt: epochNow,
      },
    },
  };
}

export function deleteItem(
  note: ChecklistNote,
  itemId: string,
  epochNow: EpochMs,
): ChecklistNote {
  const { [itemId]: removed, ...items } = note.items;

  return removed ? { ...note, updatedAt: epochNow, items } : note;
}

export function findNeighborId(
  itemId: string,
  items: WithId<ChecklistItem>[],
): string | undefined {
  const index = items.findIndex((item) => item.id === itemId);
  return items[index + 1]?.id ?? items[index - 1]?.id;
}
