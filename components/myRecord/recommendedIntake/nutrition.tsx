import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { Commonstyles } from "../../../uitll/defaultStyle";
import Circle from "./circle";

interface NutritionProps {
  color: string;
  icon: ReactNode;
  text: string;
  amount: number | undefined;
}

export const Nutrition: React.FC<NutritionProps> = ({
  color,
  icon,
  text,
  amount,
}) => (
  <View style={Commonstyles.Line}>
    <View style={styles.Component}>
      <Circle size={45} color={color}>
        {icon}
      </Circle>
      <Text style={[fontStyle.SB15, { color: Colors.basic.text_default }]}>
        {text}
      </Text>
    </View>
    <View style={styles.FontStyle}>
      <Text style={(fontStyle.BD16, { color: Colors.basic.text_light })}>
        {amount}
      </Text>
      <Text style={(fontStyle.BD16, { color: Colors.basic.text_extralight })}>
        g
      </Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  Component: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  FontStyle: {
    flexDirection: "row",
  },
});
