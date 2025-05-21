import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { logFullDatabase } from "@/database/queries";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DebugScreen() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    console.log("debug screen online and running fine");
    async function fetchEverything() {
      console.log("Fetching everything is being");
      await logFullDatabase(); // logs everything to console
    }

    fetchEverything();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerText="Debug"
      headerImage={
        <Image
          source={require("@/assets/images/inventory-screen.png")}
          style={styles.inventory}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">FUCK YOU!</ThemedText>
        <ThemedText type="default">
          {rows.map((row, id) => (
            <Text key={id}>
              {JSON.stringify(row)}
              <TouchableOpacity
                onPress={() => row.id}
                style={styles.deleteButton}
              >
                <Text style={styles.cross}>×</Text>
              </TouchableOpacity>
            </Text>
          ))}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  inventory: {
    height: 378,
    width: 290,
    bottom: 0,
    top: 0,
    left: 125,
    position: "absolute",
  },
  deleteButton: {
    padding: 4,
    marginLeft: 10,
    backgroundColor: "transparent",
  },
  cross: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
  },
});
