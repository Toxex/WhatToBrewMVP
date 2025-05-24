import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HopService } from "@/services/hopService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HopScreen() {
  const [hops, setHops] = useState<any[]>([]);

  useEffect(() => {
    async function loadHops() {
      const result = await HopService.fetchAll();
      setHops(result);
      await HopService.addHop("East Kent Goldings", 7.4, "UK", 2);
    }
    loadHops();
  }, []);

  async function handleReload() {
    const result = await HopService.fetchAll();
    setHops(result);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerText="Hops"
      headerImage={
        <Image
          source={require("@/assets/images/hops.png")}
          style={styles.hopLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">List of Hops</ThemedText>
        <ThemedText type="default">
          {hops.map((hop, id) => (
            <Text key={id}>
              {JSON.stringify(hop)}
              <TouchableOpacity
                onPress={async () => {
                  await HopService.removeHop(hop.id);
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  hopLogo: {
    height: 350,
    width: 450,
    bottom: -60,
    left: 75,
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
