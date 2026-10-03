import { SeedData } from "@/notes/data/seed-data";
import { compareNotes } from "@/notes/sorting";
import { type Note } from "@/notes/types";

let notes = [...SeedData].sort(compareNotes);

const listeners = new Set<() => void>();

export function subscribeToNotes(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getNotes(): Note[] {
  return notes;
}

export function updateNote(noteId: string, patch: Note) {
  notes = notes
    .map((note) => (note.id === noteId ? patch : note))
    .sort(compareNotes);

  listeners.forEach((listener) => {
    listener();
  });
}
