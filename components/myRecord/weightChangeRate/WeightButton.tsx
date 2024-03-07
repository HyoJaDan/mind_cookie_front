import { Pressable, StyleSheet, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { fontStyle } from "../../../assets/font/font";

export function WeightButton({
  handlePresentModalPress,
}: {
  handlePresentModalPress: Function;
}) {
  function pressHandler() {
    handlePresentModalPress();
  }

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={pressHandler}
        android_ripple={{ color: "#8785FF" }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#2D81FF", "#8785FF"]}
          style={styles.buttonInnerContainer}
        >
          <Text style={[styles.buttonText, fontStyle.BD16]}>
            몸무게 기록하기
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
    width: "100%",
  },
  buttonInnerContainer: {
    padding: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
