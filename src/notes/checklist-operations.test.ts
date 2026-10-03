import { getChecklistSections } from "@/notes/checklist-operations";
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
