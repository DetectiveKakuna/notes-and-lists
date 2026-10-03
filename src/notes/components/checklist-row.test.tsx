import { ChecklistRow } from "@/notes/components/checklist-row";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof ChecklistRow>;

async function renderRow(overrides: Partial<Props> = {}) {
  await render(
    <ChecklistRow
      checked={false}
      text="Milk"
      onPressDrag={jest.fn()}
      onToggle={jest.fn()}
      onChangeText={jest.fn()}
      {...overrides}
    />,
  );
}

describe("ChecklistRow", () => {
  test("shows the item text in the input", async () => {
    await renderRow();

    expect(screen.getByDisplayValue("Milk")).toBeOnTheScreen();
  });

  test("labels the checkbox with the item text", async () => {
    await renderRow();

    expect(screen.getByRole("checkbox", { name: "Milk" })).toBeOnTheScreen();
  });

  test("labels the checkbox of an empty item", async () => {
    await renderRow({ text: "" });

    expect(
      screen.getByRole("checkbox", { name: "Empty item" }),
    ).toBeOnTheScreen();
  });

  test.each([true, false])(
    "reports checked=%s on the checkbox",
    async (checked) => {
      await renderRow({ checked });

      expect(screen.getByRole("checkbox", { checked })).toBeOnTheScreen();
    },
  );

  test("calls onToggle when the checkbox is pressed", async () => {
    const onToggle = jest.fn();
    await renderRow({ onToggle });

    await fireEvent.press(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test("calls onChangeText with the typed text", async () => {
    const onChangeText = jest.fn();
    await renderRow({ onChangeText });

    await fireEvent.changeText(screen.getByDisplayValue("Milk"), "Oat milk");

    expect(onChangeText).toHaveBeenCalledWith("Oat milk");
  });

  test("forwards View props such as testID", async () => {
    await renderRow({ testID: "row" });

    expect(screen.getByTestId("row")).toBeOnTheScreen();
  });
});
