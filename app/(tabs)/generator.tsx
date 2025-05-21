import { BeerWave } from "@/components/BeerWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function GeneratorScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerText="What To Brew?"
      headerImage={
        <Image
          source={require("@/assets/images/generator-brown.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Generator</ThemedText>
        <BeerWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 378,
    width: 290,
    bottom: 0,
    top: 20,
    left: 210,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});
