import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];
type MaterialCommunityIconName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];
type FontAwesome6IconName = ComponentProps<typeof FontAwesome6>["name"];

type IconSymbolName =
  | "house.fill" //SAMTLIGA SF IKONER BEHÖVER BYTAS (förutom backpack)
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "wineglass"
  | "backpack";

// mappar SF Symbols till ikoner från MaterialIcons, MaterialCommunityIcons eller FontAwesome6
const MAPPING: Record<
  IconSymbolName,
  | { lib: "MaterialIcons"; name: MaterialIconName }
  | { lib: "MaterialCommunityIcons"; name: MaterialCommunityIconName }
  | { lib: "FontAwesome6"; name: FontAwesome6IconName }
> = {
  "house.fill": { lib: "MaterialCommunityIcons", name: "barley" },
  "paperplane.fill": { lib: "MaterialCommunityIcons", name: "hops" },
  "chevron.left.forwardslash.chevron.right": {
    lib: "FontAwesome6",
    name: "flask-vial",
  },
  wineglass: { lib: "MaterialIcons", name: "sports-bar" },
  backpack: { lib: "MaterialIcons", name: "backpack" },
  "chevron.right": { lib: "MaterialIcons", name: "chevron-right" },
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const icon = MAPPING[name];

  if (icon.lib === "MaterialIcons") {
    return (
      <MaterialIcons name={icon.name} size={size} color={color} style={style} />
    );
  } else if (icon.lib === "FontAwesome6") {
    return (
      <FontAwesome6 name={icon.name} size={size} color={color} style={style} />
    );
  }

  return (
    <MaterialCommunityIcons
      name={icon.name}
      size={size}
      color={color}
      style={style}
    />
  );
}
