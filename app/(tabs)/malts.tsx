import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaltService } from "@/services/maltService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MaltScreen() {
  const [malts, setMalts] = useState<any[]>([]);

  useEffect(() => {
    async function loadMalts() {
      const result = await MaltService.fetchAll();
      setMalts(result);
      await MaltService.addMalt("test", 1, "test", 1);
    }
    loadMalts();
  }, []);

  async function handleReload() {
    const result = await MaltService.fetchAll();
    setMalts(result);
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
          {malts.map((malt, id) => (
            <Text key={id}>
              {JSON.stringify(malt)}
              <TouchableOpacity
                onPress={async () => {
                  await MaltService.removeMalt(malt.id);
                  await handleReload();
                }}
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
