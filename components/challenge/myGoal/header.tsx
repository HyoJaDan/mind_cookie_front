import { Text } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";

export function Header({ text }: { text: string }) {
  return (
    <Text style={[fontStyle.BD20, { color: Colors.basic.text_light }]}>
      {text}
    </Text>
  );
}
