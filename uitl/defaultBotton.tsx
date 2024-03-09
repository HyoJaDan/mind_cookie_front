import { LinearGradient } from "expo-linear-gradient";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fontStyle } from "../assets/font/font";

interface IProps {
  pressHandler: (event: GestureResponderEvent) => void;
  text: string;
}
export const DefaultButton = ({ pressHandler, text }: IProps) => {
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
          <Text style={[styles.buttonText, fontStyle.BD16]}>{text}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInnerContainer: {
    padding: 16,
    elevation: 2,
    minWidth: "100%",
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonOuterContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
});
