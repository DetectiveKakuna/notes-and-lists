import { AppText } from "@/components/app-text";
import { Collapsible } from "@/components/collapsible";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof Collapsible>;

async function renderCollapsible(overrides: Partial<Props> = {}) {
  await render(
    <Collapsible
      label="3 checked items"
      color="#000000"
      onToggle={jest.fn()}
      {...overrides}
    >
      <AppText>Milk</AppText>
    </Collapsible>,
  );
}

describe("Collapsible", () => {
  test("shows its label on the header button", async () => {
    await renderCollapsible();

    expect(
      screen.getByRole("button", { name: "3 checked items" }),
    ).toBeOnTheScreen();
  });

  test("hides its content by default", async () => {
    await renderCollapsible();

    expect(screen.queryByText("Milk")).not.toBeOnTheScreen();
  });

  test("shows its content when expanded", async () => {
    await renderCollapsible({ isExpanded: true });

    expect(screen.getByText("Milk")).toBeOnTheScreen();
  });

  test.each([true, false])(
    "reports expanded=%s on the header",
    async (isExpanded) => {
      await renderCollapsible({ isExpanded });

      expect(
        screen.getByRole("button", { expanded: isExpanded }),
      ).toBeOnTheScreen();
    },
  );

  test("calls onToggle when the header is pressed", async () => {
    const onToggle = jest.fn();
    await renderCollapsible({ onToggle });

    await fireEvent.press(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
