import { getNotes, updateNote } from "@/notes/data/notes-store";
import { useNote, useNotes } from "@/notes/data/use-notes";
import { act, renderHook } from "@testing-library/react-native";

describe("useNotes", () => {
  test("returns the store's notes", async () => {
    const { result } = await renderHook(() => useNotes());

    expect(result.current).toBe(getNotes());
  });

  test("updates when a note changes", async () => {
    const { result } = await renderHook(() => useNotes());
    const target = getNotes()[0];

    await act(() => {
      updateNote(target.id, { ...target, title: "Renamed" });
    });

    const updated = result.current.find((note) => note.id === target.id);
    expect(result.current).toBe(getNotes());
    expect(updated?.title).toBe("Renamed");
  });
});

describe("useNote", () => {
  test("returns the note with the given id", async () => {
    const target = getNotes()[0];

    const { result } = await renderHook(() => useNote(target.id));

    expect(result.current).toBe(target);
  });

  test("returns undefined for an unknown id", async () => {
    const { result } = await renderHook(() => useNote("missing"));

    expect(result.current).toBeUndefined();
  });

  test("returns the new version after the note changes", async () => {
    const target = getNotes()[0];
    const renamed = { ...target, title: "Renamed again" };
    const { result } = await renderHook(() => useNote(target.id));

    await act(() => {
      updateNote(target.id, renamed);
    });

    expect(result.current).toBe(renamed);
  });
});
