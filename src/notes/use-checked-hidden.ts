import {
  getCheckedHidden,
  subscribeCheckedHidden,
} from "@/notes/view-settings";
import { useSyncExternalStore } from "react";

export function useCheckedHidden(noteId: string): boolean {
  return useSyncExternalStore(subscribeCheckedHidden, () =>
    getCheckedHidden(noteId),
  );
}
