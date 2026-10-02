import { ChecklistNoteEditor } from "@/notes/checklist-note-editor";
import { useNote } from "@/notes/use-notes";
import { useLocalSearchParams } from "expo-router";

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const note = useNote(id);

  if (!note) {
    return null; // TODO: show a not-found screen
  }

  switch (note.type) {
    case "text":
      return null; // TODO: text note editor
    case "checklist":
      return <ChecklistNoteEditor note={note} />;
    case "category":
      return null; // TODO: category note editor
    default: {
      note satisfies never;
      return null; // TODO: unknown type, ask the user to update the app
    }
  }
}
