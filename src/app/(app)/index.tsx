import { NoteCard } from "@/notes/note-card";
import { useNotes } from "@/notes/use-notes";
import { FlatList, View } from "react-native";

export default function NotesOverview() {
  const notes = useNotes();

  return (
    <View className="m-1 flex-1">
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} className="flex-1" />}
        keyExtractor={(note) => note.id}
        numColumns={2}
      />
    </View>
  );
}
