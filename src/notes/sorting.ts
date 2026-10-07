import { type ListItemBase, type NoteBase } from "@/notes/types";

export function compareItemOrder(a: ListItemBase, b: ListItemBase): number {
  return (
    a.order - b.order ||
    a.createdAt - b.createdAt ||
    a.text.localeCompare(b.text)
  );
}

export function compareItems(a: ListItemBase, b: ListItemBase): number {
  return Number(a.checked) - Number(b.checked) || compareItemOrder(a, b);
}

export function compareNotes(a: NoteBase, b: NoteBase): number {
  return (
    a.order - b.order ||
    b.updatedAt - a.updatedAt ||
    (a.title ?? "").localeCompare(b.title ?? "")
  );
}
