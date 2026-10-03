import { getNotes, subscribeToNotes } from "@/notes/data/notes-store";
import { type Note } from "@/notes/types";
import { useSyncExternalStore } from "react";

export function useNotes(): Note[] {
  return useSyncExternalStore(subscribeToNotes, getNotes);
}

export function useNote(noteId: string): Note | undefined {
  return useNotes().find(({ id }) => {
    return id === noteId;
  });
}
