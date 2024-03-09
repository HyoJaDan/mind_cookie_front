import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IUser } from "../../../data/myRecord/userData";
import { putUserData } from "../../../data/myRecord/userDataHandler";
import { DefaultButton } from "../../../uitl/defaultBotton";

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
      <DefaultButton pressHandler={pressHandler} text="확인" />
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
/*  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
  },
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDAD7",
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginVertical: 10,
    padding: 14,
    // 새로운 스타일 속성 추가
    flex: 1, // 확장하여 부모 컨테이너를 꽉 채움
  },
  input: {
    flex: 1, // 입력 필드가 컨테이너의 남은 공간을 모두 차지하도록 설정
    // 높이, 배경색, 테두리 등의 스타일 제거
    // padding을 조정하거나 제거하여 입력 필드 스타일을 간소화
  },
  deleteText: {
    color: "red",
    marginLeft: 10,
    // 삭제 텍스트 스타일 추가
  }, */
