import { compareItems, compareNotes } from "@/notes/sorting";
import { type ListItemBase, type NoteBase } from "@/notes/types";

function item(overrides: Partial<ListItemBase> = {}): ListItemBase {
  return {
    text: "Item",
    checked: false,
    order: 1,
    createdAt: 1_000,
    ...overrides,
  };
}

function note(overrides: Partial<NoteBase> = {}): NoteBase {
  return {
    id: "note",
    ownerId: "owner",
    sharedIds: [],
    title: "Note",
    order: 1,
    createdAt: 1_000,
    updatedAt: 1_000,
    ...overrides,
  };
}

describe("compareNotes", () => {
  test("puts the lower order first", () => {
    expect(compareNotes(note({ order: 2 }), note({ order: 7 }))).toBeLessThan(
      0,
    );
  });

  test("breaks an order tie with the later updatedAt", () => {
    const earlier = note({ order: 5, updatedAt: 1_000, title: "Zucchini" });
    const later = note({ order: 5, updatedAt: 2_000, title: "Apple" });

    expect(compareNotes(earlier, later)).toBeGreaterThan(0);
  });

  test("breaks an order and updatedAt tie alphabetically by title", () => {
    const apple = note({ title: "Apple" });
    const banana = note({ title: "Banana" });

    expect(compareNotes(apple, banana)).toBeLessThan(0);
    expect(compareNotes(banana, apple)).toBeGreaterThan(0);
  });

  test("treats notes that match on every sorted field as equal", () => {
    expect(compareNotes(note(), note())).toBe(0);
  });

  test("sorts a mixed list into the expected order", () => {
    const notes = [
      note({ title: "Gap", order: 7 }),
      note({ title: "Second", order: 5, updatedAt: 2_000 }),
      note({ title: "First", order: 2 }),
      note({ title: "Tied B", order: 5, updatedAt: 1_000 }),
      note({ title: "Tied A", order: 5, updatedAt: 1_000 }),
    ];

    const sorted = [...notes].sort(compareNotes).map((n) => n.title);

    expect(sorted).toEqual(["First", "Second", "Tied A", "Tied B", "Gap"]);
  });
});

describe("compareItems", () => {
  test("puts unchecked items before checked items, even with a higher order", () => {
    const unchecked = item({ checked: false, order: 9 });
    const checked = item({ checked: true, order: 1 });

    expect(compareItems(unchecked, checked)).toBeLessThan(0);
    expect(compareItems(checked, unchecked)).toBeGreaterThan(0);
  });

  test("puts the lower order first", () => {
    expect(compareItems(item({ order: 2 }), item({ order: 7 }))).toBeLessThan(
      0,
    );
  });

  test("breaks an order tie with the earlier createdAt", () => {
    const earlier = item({ order: 5, createdAt: 1_000, text: "Zucchini" });
    const later = item({ order: 5, createdAt: 2_000, text: "Apple" });

    expect(compareItems(earlier, later)).toBeLessThan(0);
  });

  test("breaks an order and createdAt tie alphabetically", () => {
    const apple = item({ text: "Apple" });
    const banana = item({ text: "Banana" });

    expect(compareItems(apple, banana)).toBeLessThan(0);
    expect(compareItems(banana, apple)).toBeGreaterThan(0);
  });

  test("treats items that match on every field as equal", () => {
    expect(compareItems(item(), item())).toBe(0);
  });

  test("sorts a mixed list into the expected order", () => {
    const items = [
      item({ text: "Checked", checked: true, order: 1 }),
      item({ text: "Gap", order: 7 }),
      item({ text: "Second", order: 5, createdAt: 2_000 }),
      item({ text: "First", order: 2 }),
      item({ text: "Tied B", order: 5, createdAt: 1_000 }),
      item({ text: "Tied A", order: 5, createdAt: 1_000 }),
    ];

    const sorted = [...items].sort(compareItems).map((i) => i.text);

    expect(sorted).toEqual([
      "First",
      "Tied A",
      "Tied B",
      "Second",
      "Gap",
      "Checked",
    ]);
  });
});
