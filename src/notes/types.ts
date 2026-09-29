import { type EpochMs } from "@/lib/time";
import { type HexColor } from "@/theme/colors";

type NoteBase = {
  id: string;
  ownerId: string;
  sharedIds: string[];
  title: string;
  createdAt: EpochMs;
  updatedAt: EpochMs;
};
type ItemBase = {
  text: string;
  checked: boolean;
  order: number;
  createdAt: EpochMs;
};
export type Category = {
  name: string;
  color: HexColor;
  order: number;
};

export type ChecklistItem = ItemBase & { indent: 0 | 1 };
export type CategoryItem = ItemBase & { categoryId?: string };

export type TextNote = NoteBase & {
  type: "text";
  body: string;
};
export type ChecklistNote = NoteBase & {
  type: "checklist";
  items: Record<string, ChecklistItem>;
};
export type CategoryNote = NoteBase & {
  type: "category";
  categories: Record<string, Category>;
  items: Record<string, CategoryItem>;
};

export type Note = TextNote | ChecklistNote | CategoryNote;
