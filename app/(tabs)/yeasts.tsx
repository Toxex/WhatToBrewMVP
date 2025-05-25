import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { YeastService } from "@/services/yeastService";

export default function YeastScreen() {
  const [yeasts, setYeasts] = useState<any[]>([]);
  const [selectedYeasts, setSelectedYeasts] = useState<any[]>([]);
  const [selectedYeastId, setSelectedYeastId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const yeastOptions = yeasts.map((yeast) => ({
    label: yeast.name,
    value: yeast.id,
  }));

  useEffect(() => {
    async function loadYeasts() {
      const allYeasts = await YeastService.fetchAll();
      const selected = await YeastService.fetchAllSelected();
      setYeasts(allYeasts);
      if (selected) setSelectedYeasts(selected);
    }
    loadYeasts();
  }, []);

  async function handleReload() {
    const allYeasts = await YeastService.fetchAll();
    const selected = await YeastService.fetchAllSelected();
    setYeasts(allYeasts);
    if (selected) setSelectedYeasts(selected);
  }

  async function handleAdd() {
    if (selectedYeastId !== null && amount) {
      await YeastService.insertYeastAmount(selectedYeastId, parseInt(amount));
      await handleReload();
      setAmount("");
      setSelectedYeastId(null);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerText="Yeasts"
      headerImage={
        <Image
          source={require("@/assets/images/yeast.png")}
          style={styles.yeastLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">List of Yeasts</ThemedText>
        {selectedYeasts.map((yeast, id) => (
          <ThemedView key={id} style={styles.yeastRow}>
            <Text style={styles.yeastText}>
              {yeast.name} - {yeast.amountOfPackages} packages
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await YeastService.removeSelectedYeast(yeast.selectedId);
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
        <ThemedText type="subtitle">Add Yeast</ThemedText>
      </ThemedView>

      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        data={yeastOptions}
        labelField="label"
        valueField="value"
        placeholder="Select yeast"
        value={selectedYeastId}
        onChange={(item) => setSelectedYeastId(item.value)}
      />

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          placeholder="Number of packages"
          placeholderTextColor={"white"}
          keyboardType="numeric"
          value={amount}
        />
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ fontSize: 24 }}>💾</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  yeastLogo: {
    height: 400,
    width: 400,
    bottom: -60,
    left: -35,
    position: "absolute",
  },
  yeastRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  yeastText: {
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
