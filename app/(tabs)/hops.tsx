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
  const [selectedHops, setSelectedHops] = useState<any[]>([]);
  const [selectedHopId, setSelectedHopId] = useState<number | null>(null);
  const [amount, changeNumber] = useState("");

  const hopOptions = hops.map((hop) => ({
    label: hop.name,
    value: hop.id,
  }));

  useEffect(() => {
    async function loadHops() {
      const selectedHops = await HopService.fetchAllSelected();
      setSelectedHops(selectedHops);
      const result = await HopService.fetchAll();
      setHops(result);
    }
    loadHops();
  }, []);

  async function handleReload() {
    const selectedHops = await HopService.fetchAllSelected();
    setSelectedHops(selectedHops);
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
        {selectedHops.map((hop, id) => (
          <ThemedView key={id} style={styles.hopRow}>
            <Text style={styles.hopText}>{JSON.stringify(hop)}</Text>
            <TouchableOpacity
              onPress={async () => {
                await HopService.removeSelectedHop(hop.id);
                await handleReload();
              }}
              style={styles.deleteButton}
            >
              <Text style={styles.cross}>×</Text>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">Add hop</ThemedText>
      </ThemedView>
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        data={hopOptions}
        labelField="label"
        valueField="value"
        placeholder="Select hop"
        value={selectedHopId}
        onChange={(item) => setSelectedHopId(item.value)}
      />
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={changeNumber}
          placeholder="Weight in grams"
          placeholderTextColor={"white"}
          keyboardType="numeric"
          value={amount}
        ></TextInput>
        <TouchableOpacity
          onPress={async () => {
            if (selectedHopId !== null && amount) {
              await HopService.insertHopAmount(selectedHopId, parseInt(amount));
              await handleReload();
            }
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
  hopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  hopText: {
    color: "white",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "transparent",
    margin: 0,
  },
  cross: {
    color: "red",
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    width: 150,
    padding: 10,
    borderColor: "white",
    color: "white",
    marginTop: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: 170,
    padding: 10,
    borderColor: "white",
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
});
