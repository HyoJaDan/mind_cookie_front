import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IUser } from "../../../data/myRecord/userData";
import { putUserData } from "../../../data/myRecord/userDataHandler";

interface IProps {
  handlePresentModalPress: Function;
  id: number;
  user: IUser;
  setUser: Function;
}

export function WeightButtonModal({
  handlePresentModalPress,
  id,
  user,
  setUser,
}: IProps) {
  const [inputValue, setInputValue] = useState("");
  const pressHandler = async () => {
    const data = await putUserData(id as number, inputValue);
    if (data) setUser(data); // 비동기 요청 성공 후 userData 상태 업데이트
    handlePresentModalPress();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.Content}>
        <Text style={[fontStyle.BD20, { color: Colors.grayscale.gray900 }]}>
          오늘의 몸무게는...
        </Text>
        <BottomSheetTextInput
          maxLength={3}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          style={styles.TextInput}
          onChangeText={setInputValue}
        />
      </View>
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
            <Text style={[styles.buttonText, fontStyle.BD16]}>확인</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",

    padding: 16,
  },
  Content: {
    gap: 24,
  },
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
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.primary.primary,
    height: 52,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
  },
  keybordScreen: {
    flex: 1,
  },
});
