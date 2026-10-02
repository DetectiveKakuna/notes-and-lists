import { SeedData } from "@/notes/seed-data";
import { compareNotes } from "@/notes/sorting";
import { type Note } from "@/notes/types";

const notes = [...SeedData].sort(compareNotes);

export function useNotes(): Note[] {
  return notes;
}

export function useNote(noteId: string): Note | undefined {
  return useNotes().find(({ id }) => {
    return id === noteId;
  });
}
