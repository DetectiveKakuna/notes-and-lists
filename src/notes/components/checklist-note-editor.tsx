import { Collapsible } from "@/components/collapsible";
import { useColors } from "@/hooks/use-colors";
import {
  createItem,
  deleteItem,
  getChecklistSections,
  toggleItemCheckmark,
  updateItemText,
} from "@/notes/checklist-operations";
import { ChecklistRow } from "@/notes/components/checklist-row";
import { NewChecklistRow } from "@/notes/components/new-checklist-row";
import { updateNote } from "@/notes/data/notes-store";
import { useCheckedHidden } from "@/notes/data/use-checked-hidden";
import { setCheckedHidden } from "@/notes/data/view-settings";
import {
  type ChecklistItem,
  type ChecklistNote,
  type WithId,
} from "@/notes/types";
import { type EpochMs } from "@/utils/time";
import { randomUUID } from "expo-crypto";
import { ScrollView } from "react-native";

type Props = { note: ChecklistNote };

function renderRow(
  item: WithId<ChecklistItem>,
  onToggleCheck: () => void,
  onChangeText: (text: string) => void,
  onPressDelete: () => void,
) {
  return (
    <ChecklistRow
      key={item.id}
      checked={item.checked}
      className="mt-1"
      text={item.text}
      onPressDrag={() => alert("Drag")} // TODO: reorder by dragging
      onToggleCheck={onToggleCheck}
      onChangeText={onChangeText}
      onPressDelete={onPressDelete}
    />
  );
}

export function ChecklistNoteEditor({ note }: Props) {
  const sections = getChecklistSections(note);
  const colors = useColors();
  const checkedHidden = useCheckedHidden(note.id);

  function onToggleCheck(itemId: string, epochNow: EpochMs) {
    updateNote(note.id, toggleItemCheckmark(note, itemId, epochNow));
  }

  function onChangeText(itemId: string, text: string, epochNow: EpochMs) {
    updateNote(note.id, updateItemText(note, itemId, text, epochNow));
  }

  function onPressCreate(epochNow: EpochMs) {
    const orderValues = Object.values(note.items).map((item) => item.order);
    const nextOrder = Math.max(0, ...orderValues) + 1;

    updateNote(note.id, createItem(note, randomUUID(), nextOrder, epochNow));
  }

  function onPressDelete(itemId: string, epochNow: EpochMs) {
    updateNote(note.id, deleteItem(note, itemId, epochNow));
  }

  return (
    <ScrollView className="m-1" keyboardShouldPersistTaps="handled">
      {sections.unchecked.map((item) =>
        renderRow(
          item,
          () => onToggleCheck(item.id, Date.now()),
          (text) => onChangeText(item.id, text, Date.now()),
          () => onPressDelete(item.id, Date.now()),
        ),
      )}
      <NewChecklistRow onPress={() => onPressCreate(Date.now())} />
      {sections.checked.length === 0 ? null : (
        <Collapsible
          label={`${sections.checked.length} Checked item${sections.checked.length > 1 ? "s" : ""}`}
          color={colors.onSurface}
          isExpanded={!checkedHidden}
          onToggle={() => setCheckedHidden(note.id, !checkedHidden)}
        >
          {sections.checked.map((item) =>
            renderRow(
              item,
              () => onToggleCheck(item.id, Date.now()),
              (text) => onChangeText(item.id, text, Date.now()),
              () => onPressDelete(item.id, Date.now()),
            ),
          )}
        </Collapsible>
      )}
    </ScrollView>
  );
}
