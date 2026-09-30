import { NoteBase, type ItemBase } from "@/notes/types";

export function compareItems(a: ItemBase, b: ItemBase): number {
  return (
    Number(a.checked) - Number(b.checked) ||
    a.order - b.order ||
    a.createdAt - b.createdAt ||
    a.text.localeCompare(b.text)
  );
}

export function compareNotes(a: NoteBase, b: NoteBase): number {
  return (
    a.order - b.order ||
    b.updatedAt - a.updatedAt ||
    (a.title ?? "").localeCompare(b.title ?? "")
  );
}
