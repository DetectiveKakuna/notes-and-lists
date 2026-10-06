import { Collapsible } from "@/components/collapsible";
import { useColors } from "@/hooks/use-colors";
import {
  createItem,
  deleteItem,
  findNeighborId,
  getChecklistSections,
  toggleItemCheckmark,
  updateItemText,
} from "@/notes/checklist-operations";
import { ChecklistRow } from "@/notes/components/checklist-row";
import { NewChecklistRow } from "@/notes/components/new-checklist-row";
import { saveNote } from "@/notes/data/notes-store";
import { useCheckedHidden } from "@/notes/data/use-checked-hidden";
import { setCheckedHidden } from "@/notes/data/view-settings";
import {
  type ChecklistItem,
  type ChecklistNote,
  type WithId,
} from "@/notes/types";
import { randomUUID } from "expo-crypto";
import { useRef } from "react";
import { ScrollView, TextInput } from "react-native";

type Props = { note: ChecklistNote };

export function ChecklistNoteEditor({ note }: Props) {
  const sections = getChecklistSections(note);
  const colors = useColors();
  const checkedHidden = useCheckedHidden(note.id);
  const inputs = useRef(new Map<string, TextInput>());
  const pendingFocusId = useRef<string | null>(null);

  function onToggleCheck(itemId: string) {
    saveNote(note.id, (now) => toggleItemCheckmark(note, itemId, now));
  }

  function onChangeText(itemId: string, text: string) {
    saveNote(note.id, (now) => updateItemText(note, itemId, text, now));
  }

  function onPressCreate() {
    const orderValues = Object.values(note.items).map((item) => item.order);
    const nextOrder = Math.max(0, ...orderValues) + 1;

    const newId = randomUUID();
    pendingFocusId.current = newId;

    saveNote(note.id, (now) => createItem(note, newId, nextOrder, now));
  }

  function onPressDelete(item: WithId<ChecklistItem>) {
    const neighborId = findNeighborId(
      item.id,
      item.checked ? sections.checked : sections.unchecked,
    );

    saveNote(note.id, (now) => deleteItem(note, item.id, now));

    if (neighborId) inputs.current.get(neighborId)?.focus();
  }

  function renderRow(item: WithId<ChecklistItem>) {
    return (
      <ChecklistRow
        key={item.id}
        checked={item.checked}
        className="mt-1"
        inputRef={(input) => {
          if (input) {
            inputs.current.set(item.id, input);
            if (item.id === pendingFocusId.current) {
              input.focus();
              pendingFocusId.current = null;
            }
          }
          return () => {
            inputs.current.delete(item.id);
          };
        }}
        text={item.text}
        onPressDrag={() => alert("Drag")} // TODO: reorder by dragging
        onToggleCheck={() => onToggleCheck(item.id)}
        onChangeText={(text) => onChangeText(item.id, text)}
        onPressDelete={() => onPressDelete(item)}
      />
    );
  }

  return (
    <ScrollView className="m-1" keyboardShouldPersistTaps="handled">
      {sections.unchecked.map((item) => renderRow(item))}
      <NewChecklistRow onPress={onPressCreate} />
      {sections.checked.length === 0 ? null : (
        <Collapsible
          label={`${sections.checked.length} Checked item${sections.checked.length > 1 ? "s" : ""}`}
          color={colors.onSurface}
          isExpanded={!checkedHidden}
          onToggle={() => setCheckedHidden(note.id, !checkedHidden)}
        >
          {sections.checked.map((item) => renderRow(item))}
        </Collapsible>
      )}
    </ScrollView>
  );
}
