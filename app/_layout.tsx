import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import NavBar from "@/lib/components/navbar";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Monomaniac One": require("../assets/fonts/MonomaniacOne-Regular.ttf"),
    "PlusJakartaSans": require("../assets/fonts/PlusJakartaSans-VariableFont_wght.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>Loading fonts...</Text>;
  }

  return (
    <>
      <NavBar></NavBar>
      <Slot />
    </>
  );
}
