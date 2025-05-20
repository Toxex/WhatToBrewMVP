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
      headerText="Malts"
      headerImage={
        <Image
          source={require("@/assets/images/barley2.png")}
          style={styles.maltLogo}
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
  maltLogo: {
    height: 450,
    width: 450,
    top: -50,
    left: 165,
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
