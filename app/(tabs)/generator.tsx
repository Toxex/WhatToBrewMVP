import { BeerWave } from "@/components/BeerWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { clearDatabase } from "@/services/clearDB";
import { generateSuggestedBrew } from "@/services/logicService";
import { Text } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function GeneratorScreen() {
  const [suggestion, setSuggestion] = useState<string | null>(null);

  async function generateSuggestion() {
    console.log("calculatedSuggestion: ");
    const calculatedSuggestion: any = await generateSuggestedBrew();
    console.log(calculatedSuggestion);
    setSuggestion(calculatedSuggestion);
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
        <TouchableOpacity style={styles.button} onPress={generateSuggestion}>
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
      <TouchableOpacity
        style={{ marginTop: 150 }}
        onPress={() => clearDatabase()}
      >
        <Text>Clear DB</Text>
      </TouchableOpacity>
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
