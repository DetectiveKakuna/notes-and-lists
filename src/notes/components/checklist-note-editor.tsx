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
import { useRef, useState } from "react";
import { Keyboard, ScrollView, TextInput, View } from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { note: ChecklistNote };

const SETTLE_MS = 225;

function withoutId(ids: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(ids);
  next.delete(id);
  return next;
}

export function ChecklistNoteEditor({ note }: Props) {
  const colors = useColors();
  const checkedHidden = useCheckedHidden(note.id);
  const inputs = useRef(new Map<string, TextInput>());
  const pendingFocusId = useRef<string | null>(null);
  const { height } = useReanimatedKeyboardAnimation();
  const insets = useSafeAreaInsets();
  const bottomSpacer = useAnimatedStyle(() => ({
    height: Math.max(-height.get(), insets.bottom),
  }));

  const [settlingIds, setSettlingIds] = useState<ReadonlySet<string>>(
    new Set(),
  );
  const sections = getChecklistSections(note, settlingIds);

  function onToggleCheck(itemId: string) {
    Keyboard.dismiss();
    saveNote(note.id, (now) => toggleItemCheckmark(note, itemId, now));

    // Toggled while still settling. Revert the animation.
    if (settlingIds.has(itemId)) {
      setSettlingIds((prev) => withoutId(prev, itemId));
      return;
    }

    setSettlingIds((prev) => new Set(prev).add(itemId));
    setTimeout(() => {
      setSettlingIds((prev) => withoutId(prev, itemId));
    }, SETTLE_MS);
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
    const section = sections.unchecked.some((i) => i.id === item.id)
      ? sections.unchecked
      : sections.checked;

    const neighborId = findNeighborId(item.id, section);

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
    <View style={{ flex: 1 }}>
      <ScrollView
        className="m-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >
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
      <Animated.View style={bottomSpacer} />
    </View>
  );
}
