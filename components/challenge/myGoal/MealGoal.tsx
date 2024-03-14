import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { Header } from "./header";

export function MealGoal() {
  return (
    <View style={styles.Wrapper}>
      <Header text="식단" />
      <View style={styles.Content}>
        <Text>MealGoal</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Wrapper: { gap: 8 },
  Content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 15,
    alignItems: "flex-start",
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
  },
});
