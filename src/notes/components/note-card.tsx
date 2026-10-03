import { AppText } from "@/components/app-text";
import { type Note } from "@/notes/types";
import { cn } from "@/utils/cn";
import { Link } from "expo-router";
import { Pressable, type PressableProps } from "react-native";

type Props = PressableProps & {
  note: Note;
};

export function NoteCard({ note, className, ...rest }: Props) {
  return (
    <Link href={{ pathname: "/notes/[id]", params: { id: note.id } }} asChild>
      <Pressable
        className={cn(
          "m-1 rounded-xl border border-solid border-on-surface-variant bg-surface-container-high",
          className,
        )}
        {...rest}
      >
        <AppText variant="headlineSmall" className="text-center">
          {note.title ?? ""}
        </AppText>
      </Pressable>
    </Link>
  );
}
