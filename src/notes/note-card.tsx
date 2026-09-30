import { cn } from "@/lib/utils";
import { type Note } from "@/notes/types";
import { Pressable, type PressableProps } from "react-native";
import { AppText } from "../components/app-text";

type Props = PressableProps & {
  note: Note;
  className: string;
};

export function NoteCard({ note, className, ...rest }: Props) {
  return (
    <Pressable
      onPress={() => alert("You pressed a button.")}
      className={cn(
        "m-1 rounded-xl border border-solid border-on-surface-variant bg-surface-container-high",
        className,
      )}
      {...rest}
    >
      <AppText variant="headlineSmall" className="justify-center">
        {note.title ?? ""}
      </AppText>
    </Pressable>
  );
}
