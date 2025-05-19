import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { deleteMalt, getAllMalt, insertMalt } from "@/database/queries";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MaltScreen() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    //put all hooks in the hooksfolder?
    insertMalt("Vienna", 15, "Austria", 20); // not functional atm
    fetchData();
  }, []);

  async function fetchData() {
    const result = await getAllMalt();
    setRows(result);
  }

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
    </ParallaxScrollView> //dropdowns for name, ebc, origin and button for addmalt?
    //  Adding new name ebc origin only in debug, for noew?
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
