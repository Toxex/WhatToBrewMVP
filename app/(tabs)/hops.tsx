import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HopService } from "@/services/hopService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function HopScreen() {
  const [hops, setHops] = useState<any[]>([]);
  const [number, changeNumber] = useState("");
  const [selectedHopId, setSelectedHopId] = useState<number | null>(null);

  const hopOptions = hops.map((hop) => ({
    label: hop.name,
    value: hop.id,
  }));

  useEffect(() => {
    async function loadHops() {
      const result = await HopService.fetchAll();
      setHops(result);
      // await HopService.addHop("East Kent Goldings", 7.4, "UK", 2);
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
      <ThemedView>
        <ThemedText type="subtitle">Add hop</ThemedText>
      </ThemedView>
      <Dropdown
        style={styles.dropdown}
        data={hopOptions}
        labelField="label"
        valueField="value"
        placeholder="Select hop"
        value={selectedHopId}
        onChange={(item) => changeNumber(item.value)}
      />
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={changeNumber}
          placeholder="Input grams of hop"
          placeholderTextColor={"white"}
          keyboardType="numeric"
          value={number}
        ></TextInput>
        <TouchableOpacity
          onPress={async () => {
            // await HopService.addHop(number);
            await handleReload();
          }}
        >
          <Text style={{ fontSize: 24 }}>💾</Text>
        </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    height: 40,
    width: 150,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    width: 150,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
});
