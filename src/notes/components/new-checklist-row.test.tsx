import { NewChecklistRow } from "@/notes/components/new-checklist-row";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("NewChecklistRow", () => {
  test("shows an Add item label", async () => {
    await render(<NewChecklistRow onPress={jest.fn()} />);

    expect(screen.getByText("Add item")).toBeOnTheScreen();
  });

  test("calls onPress when pressed", async () => {
    const onPress = jest.fn();
    await render(<NewChecklistRow onPress={onPress} />);

    await fireEvent.press(screen.getByText("Add item"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
