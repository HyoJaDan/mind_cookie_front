import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSetRecoilState } from "recoil";
import { fontStyle } from "../assets/font/font";
import SpashIcon from "../assets/icon/splashIcon.svg";
import { userToken } from "../data/user/userData";
import { DefaultButton } from "../uitll/defaultButton";

function RegisterScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const setUserToken = useSetRecoilState(userToken);
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const handleRegister = async () => {
    if (!userId) {
      Alert.alert("아이디를 입력해주세요.");
      return;
    }
    if (!userPassword) {
      Alert.alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!userName) {
      Alert.alert("이름을 입력해주세요.");
      return;
    }
    setLoading(true);

    let dataToSend = {
      username: userId,
      password: userPassword,
    };

    try {
      await fetch("http://localhost:8080/join", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setLoading(false);
      Alert.alert("회원가입 완료");
      navigation.replace("Auth");
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert("회원가입 실패", "서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <SpashIcon />
      <Text style={fontStyle.BD36}>회원가입</Text>
      <Text style={[fontStyle.BD24, { marginBottom: 50 }]}>
        나만의 습관을 시작해보세요!
      </Text>

      <TextInput
        style={styles.input}
        placeholder={"아이디"}
        onChangeText={(userId) => setUserId(userId)}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordInputRef.current && passwordInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        placeholder={"비밀번호"}
        onChangeText={(userPassword) => setUserPassword(userPassword)}
        autoCapitalize="none"
        secureTextEntry={true}
        ref={passwordInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          nameInputRef.current && nameInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <TextInput
        style={styles.input}
        placeholder={"이름"}
        onChangeText={(userName) => setUserName(userName)}
        autoCapitalize="none"
        ref={nameInputRef}
        returnKeyType="done"
        onSubmitEditing={handleRegister}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#307ecc" />
      ) : (
        <View>
          <DefaultButton pressHandler={handleRegister} text="회원가입" />
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.registerText}>
              이미 계정이 있으신가요? 로그인하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#2D81FF", // 파란색 텍스트
    textDecorationLine: "underline", // 밑줄 추가
  },
});

export default RegisterScreen;
