import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaltService } from "@/services/maltService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function MaltScreen() {
  const [malts, setMalts] = useState<any[]>([]);
  const [selectedMalts, setSelectedMalts] = useState<any[]>([]);
  const [selectedMaltId, setSelectedMaltId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const maltOptions = malts.map((malt) => ({
    label: malt.name,
    value: malt.id,
  }));

  useEffect(() => {
    async function loadMalts() {
      const allMalts = await MaltService.fetchAll();
      const selected = await MaltService.fetchAllSelected();
      setMalts(allMalts);
      if (selected) setSelectedMalts(selected);
    }
    loadMalts();
  }, []);

  async function handleReload() {
    const allMalts = await MaltService.fetchAll();
    const selected = await MaltService.fetchAllSelected();
    setMalts(allMalts);
    if (selected) setSelectedMalts(selected);
  }

  async function handleAdd() {
    if (selectedMaltId !== null && amount) {
      await MaltService.insertMaltAmount(selectedMaltId, parseInt(amount));
      await handleReload();
      setAmount("");
      setSelectedMaltId(null);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F1D6A9", dark: "#4E3A1E" }}
      headerText="Malts"
      headerImage={
        <Image
          source={require("@/assets/images/barley2.png")}
          style={styles.maltLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">List of Malts</ThemedText>
        {selectedMalts.map((malt, id) => (
          <ThemedView key={id} style={styles.maltRow}>
            <Text style={styles.maltText}>
              {malt.name} - {malt.amountInGrams}g
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await MaltService.removeSelectedMalt(malt.selectedId);
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
        <ThemedText type="subtitle">Add Malt</ThemedText>
      </ThemedView>

      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        data={maltOptions}
        labelField="label"
        valueField="value"
        placeholder="Select malt"
        value={selectedMaltId}
        onChange={(item) => setSelectedMaltId(item.value)}
      />

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          placeholder="Weight in grams"
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
  maltLogo: {
    height: 450,
    width: 450,
    top: -50,
    left: 165,
    position: "absolute",
  },
  maltRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  maltText: {
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
