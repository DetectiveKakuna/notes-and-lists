import { AppTextInput } from "@/components/app-text-input";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { createRef } from "react";
import { type TextInput } from "react-native";

describe("AppTextInput", () => {
  test("shows its value", async () => {
    await render(<AppTextInput value="Milk" />);

    expect(screen.getByDisplayValue("Milk")).toBeOnTheScreen();
  });

  test("forwards TextInput props such as placeholder", async () => {
    await render(<AppTextInput placeholder="Title" />);

    expect(screen.getByPlaceholderText("Title")).toBeOnTheScreen();
  });

  test("calls onChangeText with the new text", async () => {
    const onChangeText = jest.fn();
    await render(<AppTextInput value="Milk" onChangeText={onChangeText} />);

    await fireEvent.changeText(screen.getByDisplayValue("Milk"), "Oat milk");

    expect(onChangeText).toHaveBeenCalledWith("Oat milk");
  });

  test("passes its ref to the underlying TextInput", async () => {
    const ref = createRef<TextInput>();
    await render(<AppTextInput ref={ref} value="Milk" />);

    expect(ref.current).not.toBeNull();
  });
});
