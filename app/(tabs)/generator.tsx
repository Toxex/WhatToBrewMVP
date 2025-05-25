import { BeerWave } from "@/components/BeerWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function GeneratorScreen() {
  const suggestionList = ["IPA", "Stout", "Lager"];
  const [suggestion, setSuggestion] = useState<string | null>(null);

  function randomizeSuggestion() {
    const randomIndex = Math.floor(Math.random() * suggestionList.length);
    const randomSuggestion = suggestionList[randomIndex];
    setSuggestion(randomSuggestion);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#134B16" }}
      headerText="What To Brew?"
      headerImage={
        <Image
          source={require("@/assets/images/generator-brown.png")}
          style={styles.generatorLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <TouchableOpacity style={styles.button} onPress={randomizeSuggestion}>
          <ThemedText type="title">
            Generate
            <BeerWave />
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {suggestion && (
        <ThemedView>
          <ThemedText style={styles.suggestionPreText}>
            Based on your inventory, you should make a:
          </ThemedText>
          <ThemedText type="title" style={styles.suggestion}>
            {suggestion}
          </ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  generatorLogo: {
    height: 378,
    width: 290,
    bottom: 0,
    top: 20,
    left: 210,
    position: "absolute",
  },
  button: {
    padding: 4,
    backgroundColor: "grey",
    borderColor: "white",
    borderWidth: 2,
    color: "black",
  },
  titleContainer: {
    alignSelf: "center",
    flexDirection: "row",
    flex: 1,
    width: "auto",
    color: "black",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  suggestion: {
    alignSelf: "center",
    marginTop: 50,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  suggestionPreText: {
    alignSelf: "center",
    marginTop: 50,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
