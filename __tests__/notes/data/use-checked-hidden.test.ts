import { useCheckedHidden } from "@/notes/data/use-checked-hidden";
import { setCheckedHidden } from "@/notes/data/view-settings";
import { act, renderHook } from "@testing-library/react-native";

jest.mock("expo-sqlite/localStorage/install", () => ({}));

const saved = new Map<string, string>();

beforeAll(() => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => saved.get(key) ?? null,
      setItem: (key: string, value: string) => {
        saved.set(key, value);
      },
    },
  });
});

beforeEach(() => {
  saved.clear();
});

describe("useCheckedHidden", () => {
  test("returns false for a note with nothing saved", async () => {
    const { result } = await renderHook(() => useCheckedHidden("note1"));

    expect(result.current).toBe(false);
  });

  test("updates when the note's value is saved", async () => {
    const { result } = await renderHook(() => useCheckedHidden("note1"));

    await act(() => {
      setCheckedHidden("note1", true);
    });

    expect(result.current).toBe(true);
  });

  test("stays the same when another note's value is saved", async () => {
    const { result } = await renderHook(() => useCheckedHidden("note1"));

    await act(() => {
      setCheckedHidden("note2", true);
    });

    expect(result.current).toBe(false);
  });
});
