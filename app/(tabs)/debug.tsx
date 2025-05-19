import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { deleteMalt, getAllMalt } from "@/database/queries";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function DebugScreen() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Helper to load malt rows
  async function fetchData() {
    const result = await getAllMalt();
    setRows(result);
  }

  // Delete malt by id and refresh list
  async function handleDelete(id: number) {
    await deleteMalt(id);
    await fetchData();
  }

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
        <ThemedText type="title">List of malt</ThemedText>
        <ThemedText type="default">
          {rows.map((row, id) => (
            <Text key={id}>
              {JSON.stringify(row)}
              <TouchableOpacity
                onPress={() => handleDelete(row.id)}
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
