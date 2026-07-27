import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "../../components/home/BottomNav";

export default function MainLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#080C14" }}
      edges={["left", "right", "bottom"]}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <BottomNav />
    </SafeAreaView>
  );
}