import { getChecklistSections } from "@/notes/checklist-operations";
import { ChecklistRow } from "@/notes/checklist-row";
import {
  type ChecklistItem,
  type ChecklistNote,
  type WithId,
} from "@/notes/types";
import { ScrollView } from "react-native";

type Props = { note: ChecklistNote };

function renderRow(item: WithId<ChecklistItem>) {
  return (
    <ChecklistRow
      key={item.id}
      checked={item.checked}
      className="mt-1"
      text={item.text}
      onPressDrag={() => alert("Drag")} // TODO: reorder by dragging
      onToggle={() => alert("Check")} // TODO: toggle the item
      onChangeText={() => {}} // TODO: save the new text
    />
  );
}

export function ChecklistNoteEditor({ note }: Props) {
  const sections = getChecklistSections(note);

  return (
    <ScrollView className="m-1">
      {sections.unchecked.map((item) => renderRow(item))}
      {sections.checked.map((item) => renderRow(item))}
    </ScrollView>
  );
}
