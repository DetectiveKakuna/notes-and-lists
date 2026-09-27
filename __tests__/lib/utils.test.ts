import { cn } from "@/lib/utils";

describe("cn", () => {
  test("a passed color replaces the default color", () => {
    expect(cn("font-sans text-on-surface", "text-primary")).toBe(
      "font-sans text-primary",
    );
  });

  test("a size and a color are both kept", () => {
    expect(cn("text-on-surface", "text-lg")).toBe("text-on-surface text-lg");
  });

  test("a font family and a font weight are both kept", () => {
    expect(cn("font-sans", "font-bold")).toBe("font-sans font-bold");
  });

  test("false and undefined inputs are ignored", () => {
    const isActive = false;

    expect(cn("text-on-surface", isActive && "text-primary", undefined)).toBe(
      "text-on-surface",
    );
  });
});
