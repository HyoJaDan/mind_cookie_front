import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";

export default function WeightChangeRate() {
  return (
    <View style={styles.Wrapper}>
      <Text style={[fontStyle.BD20, styles.Texts]}>체중변화량</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    width: 335,
    gap: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 24,
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
  Texts: {
    color: Colors.basic.text_default,
  },
});
