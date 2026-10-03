import { cn } from "@/utils/cn";

describe("cn", () => {
  test("a passed color replaces the default color", () => {
    expect(cn("font-plain text-on-surface", "text-primary")).toBe(
      "font-plain text-primary",
    );
  });

  test.each([
    ["text-on-surface", "text-lg"],
    ["text-body-large", "text-on-surface"],
    ["font-plain", "font-bold"],
  ])("keeps %s and %s because they set different properties", (a, b) => {
    expect(cn(a, b)).toBe(`${a} ${b}`);
  });

  test("a later type scale size replaces an earlier one", () => {
    expect(cn("text-body-large", "text-title-large")).toBe("text-title-large");
  });

  test("a later type scale size replaces an earlier font weight", () => {
    expect(cn("font-bold", "text-title-medium")).toBe("text-title-medium");
  });

  test("a later font weight is kept after a type scale size", () => {
    expect(cn("text-title-medium", "font-bold")).toBe(
      "text-title-medium font-bold",
    );
  });

  test("false and undefined inputs are ignored", () => {
    const isActive = false;

    expect(cn("text-on-surface", isActive && "text-primary", undefined)).toBe(
      "text-on-surface",
    );
  });
});
