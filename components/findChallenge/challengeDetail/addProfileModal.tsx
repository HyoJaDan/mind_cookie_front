import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import { IUserInProfile } from "../../../data/user/userData";
import { DefaultButton } from "../../../uitll/defaultButton";

interface AddProfileModalProps {
  handlePresentModalPress: () => void;
  user: IUserInProfile;
  setName: (user: IUserInProfile) => void;
}

export function AddProfileModal({
  handlePresentModalPress,
  user,
  setName,
}: AddProfileModalProps) {
  const [inputData, setInputDate] = useState(user.userName);
  const pressHandler = async () => {
    setName({ ...user, userName: inputData });
    handlePresentModalPress();
  };
  return (
    <View style={styles.bottomSheetContent}>
      <View>
        <Text style={[fontStyle.BD16, styles.header]}>프로필 설정</Text>
        <View style={styles.pictureGap}>
          <View style={styles.Circle} />
        </View>
        <View style={styles.nickNameHeader}>
          <Text style={[fontStyle.BD15, { color: Colors.basic.text_light }]}>
            닉네임
          </Text>
          <Text
            style={[fontStyle.RG15, { color: Colors.basic.text_extralight }]}
          >
            (한글, 영문 6자 이내)
          </Text>
        </View>
        <View style={styles.goalInputContainer}>
          <TextInput
            style={styles.input}
            placeholder={user.userName}
            onChangeText={setInputDate}
            value={inputData}
          />
        </View>
      </View>
      <DefaultButton pressHandler={pressHandler} text="확인" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
    gap: 27,
    justifyContent: "space-between",
  },
  header: {
    color: Colors.grayscale.gray900,
    marginBottom: 35,
  },
  Circle: {
    borderRadius: 64,
    backgroundColor: Colors.grayscale.gray200,
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureGap: {
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  nickNameHeader: {
    flexDirection: "row",
    gap: 4,
  },
  goalInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.grayscale.gray300,
    borderRadius: 8,
  },
});
