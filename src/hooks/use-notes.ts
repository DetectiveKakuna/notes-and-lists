import { SeedData } from "@/notes/seed-data";
import { compareNotes } from "@/notes/sorting";
import { type Note } from "@/notes/types";

export function useNotes(): Note[] {
  const notes = SeedData;
  notes.sort(compareNotes);
  return notes;
}
