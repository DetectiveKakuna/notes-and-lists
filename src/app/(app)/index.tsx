import { useNotes } from "@/hooks/use-notes";
import { NoteCard } from "@/notes/note-card";
import { FlatList, View } from "react-native";

export default function Index() {
  const notes = useNotes();

  return (
    <View className="m-1 flex">
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteCard note={item} className="flex-1" />}
        keyExtractor={(note) => note.id}
        numColumns={2}
      />
    </View>
  );
}
