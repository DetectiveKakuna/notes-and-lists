import "expo-sqlite/localStorage/install";

const listeners = new Set<() => void>();

function checkedHiddenKey(noteId: string): string {
  return `checked-hidden:${noteId}`;
}

export function subscribeCheckedHidden(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCheckedHidden(noteId: string): boolean {
  return globalThis.localStorage.getItem(checkedHiddenKey(noteId)) === "true";
}

export function setCheckedHidden(noteId: string, value: boolean) {
  globalThis.localStorage.setItem(checkedHiddenKey(noteId), value.toString());
  listeners.forEach((listener) => {
    listener();
  });
}
