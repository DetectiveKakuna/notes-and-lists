import {
  getCheckedHidden,
  setCheckedHidden,
  subscribeCheckedHidden,
} from "@/notes/data/view-settings";

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

describe("getCheckedHidden and setCheckedHidden", () => {
  test("read false when nothing has been saved", () => {
    expect(getCheckedHidden("note1")).toBe(false);
  });

  test("read back a saved true", () => {
    setCheckedHidden("note1", true);

    expect(getCheckedHidden("note1")).toBe(true);
  });

  test("read back a saved false that replaced a true", () => {
    setCheckedHidden("note1", true);
    setCheckedHidden("note1", false);

    expect(getCheckedHidden("note1")).toBe(false);
  });

  test("keep each note's value separate", () => {
    setCheckedHidden("note1", true);

    expect(getCheckedHidden("note2")).toBe(false);
  });
});

describe("subscribeCheckedHidden", () => {
  test("calls a subscriber after a value is saved", () => {
    const listener = jest.fn();
    const unsubscribe = subscribeCheckedHidden(listener);

    setCheckedHidden("note1", true);

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  test("saves the value before calling subscribers", () => {
    let seen: boolean | undefined;
    const unsubscribe = subscribeCheckedHidden(() => {
      seen = getCheckedHidden("note1");
    });

    setCheckedHidden("note1", true);

    expect(seen).toBe(true);
    unsubscribe();
  });

  test("stops calling a subscriber after it unsubscribes", () => {
    const listener = jest.fn();
    const unsubscribe = subscribeCheckedHidden(listener);

    unsubscribe();
    setCheckedHidden("note1", true);

    expect(listener).not.toHaveBeenCalled();
  });
});
