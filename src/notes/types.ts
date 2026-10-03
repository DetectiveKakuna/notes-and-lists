import { type HexColor } from "@/theme/colors";
import { type EpochMs } from "@/utils/time";

export type NoteBase = {
  id: string;
  ownerId: string;
  sharedIds: string[];
  title?: string;
  order: number;
  createdAt: EpochMs;
  updatedAt: EpochMs;
};
export type ListItemBase = {
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
export type WithId<T> = T & { id: string };

export type ChecklistItem = ListItemBase & { indent: 0 | 1 };
export type CategoryListItem = ListItemBase & { categoryId?: string };

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
  items: Record<string, CategoryListItem>;
};

export type Note = TextNote | ChecklistNote | CategoryNote;
