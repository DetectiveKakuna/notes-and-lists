import { AppText } from "@/components/app-text";
import { fireEvent, render, screen } from "@testing-library/react-native";

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
