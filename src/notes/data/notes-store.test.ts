import { type Note, type TextNote } from "@/notes/types";

function textNote(overrides: Partial<TextNote> = {}): TextNote {
  return {
    id: "note",
    ownerId: "owner",
    sharedIds: [],
    title: "Note",
    order: 1,
    createdAt: 1_000,
    updatedAt: 1_000,
    type: "text",
    body: "",
    ...overrides,
  };
}

const mockSeedData: Note[] = [
  textNote({ id: "c", order: 3 }),
  textNote({ id: "a", order: 1 }),
  textNote({ id: "b", order: 2 }),
];

jest.mock("@/notes/data/seed-data", () => ({ SeedData: mockSeedData }));

let store: typeof import("@/notes/data/notes-store");

// Each test loads a fresh copy of the store, so changes don't carry over.
beforeEach(() => {
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    store = require("@/notes/data/notes-store");
  });
});

function findNote(notes: Note[], id: string): Note | undefined {
  return notes.find((note) => note.id === id);
}

describe("getNotes", () => {
  test("starts with the sample notes in sorted order", () => {
    expect(store.getNotes().map((note) => note.id)).toEqual(["a", "b", "c"]);
  });

  test("leaves the sample data in its original order", () => {
    store.getNotes();

    expect(mockSeedData.map((note) => note.id)).toEqual(["c", "a", "b"]);
  });

  test("returns the same array until something changes", () => {
    expect(store.getNotes()).toBe(store.getNotes());
  });
});

describe("updateNote", () => {
  test("replaces the note with the new version", () => {
    const renamed = textNote({ id: "b", order: 2, title: "Renamed" });

    store.updateNote("b", renamed);

    expect(findNote(store.getNotes(), "b")).toBe(renamed);
  });

  test("produces a new array and leaves the old one unchanged", () => {
    const before = store.getNotes();

    store.updateNote("b", textNote({ id: "b", order: 2, title: "Renamed" }));

    expect(store.getNotes()).not.toBe(before);
    expect(findNote(before, "b")?.title).toBe("Note");
  });

  test("keeps the other notes as the same objects", () => {
    const before = store.getNotes();

    store.updateNote("b", textNote({ id: "b", order: 2, title: "Renamed" }));

    const after = store.getNotes();
    expect(findNote(after, "a")).toBe(findNote(before, "a"));
    expect(findNote(after, "c")).toBe(findNote(before, "c"));
  });

  test("keeps the notes sorted after an update", () => {
    store.updateNote("c", textNote({ id: "c", order: 0 }));

    expect(store.getNotes().map((note) => note.id)).toEqual(["c", "a", "b"]);
  });
});

describe("saveNote", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("passes the current time to the edit", () => {
    jest.spyOn(Date, "now").mockReturnValue(5_000);
    const edit = jest.fn((now: number) =>
      textNote({ id: "b", order: 2, updatedAt: now }),
    );

    store.saveNote("b", edit);

    expect(edit).toHaveBeenCalledWith(5_000);
  });

  test("stores the note the edit returns", () => {
    const edited = textNote({ id: "b", order: 2, title: "Renamed" });

    store.saveNote("b", () => edited);

    expect(findNote(store.getNotes(), "b")).toBe(edited);
  });

  test("calls subscribers after saving", () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribeToNotes(listener);

    store.saveNote("b", (now) =>
      textNote({ id: "b", order: 2, updatedAt: now }),
    );

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});

describe("subscribeToNotes", () => {
  test("calls a subscriber after an update", () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribeToNotes(listener);

    store.updateNote("b", textNote({ id: "b", order: 2 }));

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  test("updates the notes before calling subscribers", () => {
    let seen: string | undefined;
    const unsubscribe = store.subscribeToNotes(() => {
      seen = findNote(store.getNotes(), "b")?.title;
    });

    store.updateNote("b", textNote({ id: "b", order: 2, title: "Renamed" }));

    expect(seen).toBe("Renamed");
    unsubscribe();
  });

  test("stops calling a subscriber after it unsubscribes", () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribeToNotes(listener);

    unsubscribe();
    store.updateNote("b", textNote({ id: "b", order: 2 }));

    expect(listener).not.toHaveBeenCalled();
  });
});
