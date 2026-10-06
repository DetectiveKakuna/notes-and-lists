import { NewChecklistRow } from "@/notes/components/new-checklist-row";
import { fireEvent, render, screen } from "@testing-library/react-native";

describe("NewChecklistRow", () => {
  test("is a button named Add item", async () => {
    await render(<NewChecklistRow onPress={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Add item" })).toBeOnTheScreen();
  });

  test("calls onPress when pressed", async () => {
    const onPress = jest.fn();
    await render(<NewChecklistRow onPress={onPress} />);

    await fireEvent.press(screen.getByRole("button", { name: "Add item" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
