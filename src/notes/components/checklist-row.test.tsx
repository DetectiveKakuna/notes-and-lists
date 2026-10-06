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
      onToggleCheck={jest.fn()}
      onChangeText={jest.fn()}
      onPressDelete={jest.fn()}
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

  test("calls onToggleCheck when the checkbox is pressed", async () => {
    const onToggleCheck = jest.fn();
    await renderRow({ onToggleCheck });

    await fireEvent.press(screen.getByRole("checkbox"));

    expect(onToggleCheck).toHaveBeenCalledTimes(1);
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

  test("connects inputRef to the text field", async () => {
    const inputRef = jest.fn();
    await renderRow({ inputRef });

    expect(inputRef).toHaveBeenCalledWith(expect.anything());
  });

  test("hides the delete button until the text field is focused", async () => {
    await renderRow();

    expect(
      screen.queryByRole("button", { name: "Delete item" }),
    ).not.toBeOnTheScreen();
  });

  test("shows the delete button while the text field is focused", async () => {
    await renderRow();

    await fireEvent(screen.getByDisplayValue("Milk"), "focus");

    expect(
      screen.getByRole("button", { name: "Delete item" }),
    ).toBeOnTheScreen();
  });

  test("hides the delete button again when the text field loses focus", async () => {
    await renderRow();
    const input = screen.getByDisplayValue("Milk");

    await fireEvent(input, "focus");
    await fireEvent(input, "blur");

    expect(
      screen.queryByRole("button", { name: "Delete item" }),
    ).not.toBeOnTheScreen();
  });

  test("calls onPressDelete when the delete button is pressed", async () => {
    const onPressDelete = jest.fn();
    await renderRow({ onPressDelete });

    await fireEvent(screen.getByDisplayValue("Milk"), "focus");
    await fireEvent.press(screen.getByRole("button", { name: "Delete item" }));

    expect(onPressDelete).toHaveBeenCalledTimes(1);
  });
});
