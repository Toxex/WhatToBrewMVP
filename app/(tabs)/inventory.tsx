import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function generatorScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerText="Inventory"
      headerImage={
        <Image
          source={require("@/assets/images/inventory-screen.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Generator</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 378,
    width: 290,
    bottom: 0,
    top: 0,
    left: 125,
    position: "absolute",
  },
});
