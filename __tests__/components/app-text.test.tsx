import { AppText, getTextVariantClasses } from "@/components/app-text";
import { type TextVariant, TypeScale } from "@/theme/typography";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("getTextVariantClasses", () => {
  test.each<[TextVariant, string]>([
    ["displayLarge", "font-brand text-display-large"],
    ["headlineSmall", "font-brand text-headline-small"],
    ["titleMedium", "font-plain text-title-medium"],
    ["bodyLarge", "font-plain text-body-large"],
    ["labelSmall", "font-plain text-label-small"],
  ])("%s uses %s", (variant, expected) => {
    expect(getTextVariantClasses(variant)).toBe(expected);
  });

  test.each(Object.keys(TypeScale) as TextVariant[])(
    "%s uses the font role from the type scale",
    (variant) => {
      expect(getTextVariantClasses(variant)).toContain(
        `font-${TypeScale[variant].role}`,
      );
    },
  );
});

describe("AppText", () => {
  test("renders its children", async () => {
    await render(<AppText>Groceries</AppText>);

    expect(screen.getByText("Groceries")).toBeOnTheScreen();
  });

  test("forwards Text props such as numberOfLines", async () => {
    await render(<AppText numberOfLines={2}>A long note preview</AppText>);

    expect(screen.getByText("A long note preview")).toHaveProp(
      "numberOfLines",
      2,
    );
  });

  test("forwards onPress", async () => {
    const onPress = jest.fn();
    await render(<AppText onPress={onPress}>Try again</AppText>);

    await fireEvent.press(screen.getByText("Try again"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
