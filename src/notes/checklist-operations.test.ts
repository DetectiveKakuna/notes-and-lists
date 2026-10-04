import {
  getChecklistSections,
  toggleItemCheckmark,
  updateItemText,
} from "@/notes/checklist-operations";
import { type ChecklistItem, type ChecklistNote } from "@/notes/types";

function item(overrides: Partial<ChecklistItem> = {}): ChecklistItem {
  return {
    text: "Item",
    checked: false,
    order: 1,
    indent: 0,
    createdAt: 1_000,
    ...overrides,
  };
}

function checklist(items: Record<string, ChecklistItem> = {}): ChecklistNote {
  return {
    id: "note",
    ownerId: "owner",
    sharedIds: [],
    title: "Note",
    order: 1,
    createdAt: 1_000,
    updatedAt: 1_000,
    type: "checklist",
    items,
  };
}

describe("getChecklistSections", () => {
  test("puts unchecked and checked items in their own sections", () => {
    const note = checklist({
      milk: item({ order: 1, checked: true }),
      eggs: item({ order: 2 }),
      bread: item({ order: 3, checked: true }),
      jam: item({ order: 4 }),
    });

    const { unchecked, checked } = getChecklistSections(note);

    expect(unchecked.map((i) => i.id)).toEqual(["eggs", "jam"]);
    expect(checked.map((i) => i.id)).toEqual(["milk", "bread"]);
  });

  test("sorts each section by item order, not by map order", () => {
    const note = checklist({
      third: item({ order: 3 }),
      first: item({ order: 1 }),
      checkedSecond: item({ order: 9, checked: true }),
      second: item({ order: 2 }),
      checkedFirst: item({ order: 4, checked: true }),
    });

    const { unchecked, checked } = getChecklistSections(note);

    expect(unchecked.map((i) => i.id)).toEqual(["first", "second", "third"]);
    expect(checked.map((i) => i.id)).toEqual(["checkedFirst", "checkedSecond"]);
  });

  test("copies each item's fields and uses its map key as its id", () => {
    const milk = item({ text: "Milk", order: 4, indent: 1, createdAt: 2_000 });

    const { unchecked } = getChecklistSections(checklist({ milk }));

    expect(unchecked).toEqual([{ ...milk, id: "milk" }]);
  });

  test("returns two empty sections when the note has no items", () => {
    expect(getChecklistSections(checklist())).toEqual({
      unchecked: [],
      checked: [],
    });
  });

  test("leaves the note unchanged", () => {
    const note = checklist({
      eggs: item({ order: 2 }),
      milk: item({ checked: true }),
    });

    getChecklistSections(note);

    expect(note).toEqual(
      checklist({
        eggs: item({ order: 2 }),
        milk: item({ checked: true }),
      }),
    );
  });
});

describe("updateItemText", () => {
  test("replaces the item's text and keeps its other fields", () => {
    const milk = item({ text: "Milk", checked: true, order: 4, indent: 1 });
    const note = checklist({ milk });

    const updated = updateItemText(note, "milk", "Oat milk", 2_000);

    expect(updated.items.milk).toEqual({ ...milk, text: "Oat milk" });
  });

  test("sets updatedAt to the time passed in", () => {
    const note = checklist({ milk: item() });

    expect(updateItemText(note, "milk", "Oat milk", 5_000).updatedAt).toBe(
      5_000,
    );
  });

  test("keeps the other items as the same objects", () => {
    const eggs = item({ text: "Eggs" });
    const note = checklist({ milk: item(), eggs });

    const updated = updateItemText(note, "milk", "Oat milk", 2_000);

    expect(updated.items.eggs).toBe(eggs);
  });

  test("returns a new note and leaves the original unchanged", () => {
    const note = checklist({ milk: item({ text: "Milk" }) });

    const updated = updateItemText(note, "milk", "Oat milk", 2_000);

    expect(updated).not.toBe(note);
    expect(note.items.milk.text).toBe("Milk");
    expect(note.updatedAt).toBe(1_000);
  });

  test("returns the same note when the item does not exist", () => {
    const note = checklist({ milk: item() });

    expect(updateItemText(note, "missing", "Oat milk", 2_000)).toBe(note);
  });
});

describe("toggleItemCheckmark", () => {
  test.each([false, true])("flips an item with checked=%s", (checked) => {
    const note = checklist({ milk: item({ checked }) });

    const toggled = toggleItemCheckmark(note, "milk", 2_000);

    expect(toggled.items.milk.checked).toBe(!checked);
  });

  test("sets updatedAt to the time passed in", () => {
    const note = checklist({ milk: item() });

    expect(toggleItemCheckmark(note, "milk", 5_000).updatedAt).toBe(5_000);
  });

  test("keeps the other items as the same objects", () => {
    const eggs = item({ text: "Eggs" });
    const note = checklist({ milk: item(), eggs });

    const toggled = toggleItemCheckmark(note, "milk", 2_000);

    expect(toggled.items.eggs).toBe(eggs);
  });

  test("returns a new note and leaves the original unchanged", () => {
    const note = checklist({ milk: item() });

    const toggled = toggleItemCheckmark(note, "milk", 2_000);

    expect(toggled).not.toBe(note);
    expect(note.items.milk.checked).toBe(false);
    expect(note.updatedAt).toBe(1_000);
  });

  test("returns the same note when the item does not exist", () => {
    const note = checklist({ milk: item() });

    expect(toggleItemCheckmark(note, "missing", 2_000)).toBe(note);
  });
});
