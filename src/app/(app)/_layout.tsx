import { Drawer } from "expo-router/drawer";

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ drawerLabel: "Notes", title: "Notes" }} />
    </Drawer>
  );
}
