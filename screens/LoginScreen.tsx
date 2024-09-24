import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fontStyle } from "../assets/font/font";
import SpashIcon from "../assets/icon/main.svg";
import { baseURLData, userToken } from "../data/userData";
import { DefaultButton } from "../uitll/defaultButton";

function LoginScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const setUserToken = useSetRecoilState(userToken);
  const baseURL = useRecoilValue(baseURLData);
  const URL = baseURL.split("/api")[0];

  const handleLogin = async () => {
    if (!userId || !userPassword) {
      Alert.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    let dataToSend = {
      username: userId,
      password: userPassword,
    };

    try {
      let response = await fetch(`${URL}/login`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      // 응답에서 Authorization 헤더 추출
      const authToken = response.headers.get("Authorization");

      if (authToken != null) setUserToken(authToken);

      setLoading(false);
      if (authToken) {
        await AsyncStorage.setItem("user_token", authToken);
        // navigation.replace("AuthenticatedStack");
        navigation.navigate("SplashScreen");
      } else {
        Alert.alert("아이디와 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <View style={styles.container}>
      <SpashIcon />
      <Text>
        <Text style={[fontStyle.BD36, { color: "#2D81FF" }]}>마인드 쿠키</Text>
        <Text style={fontStyle.BD24}>에</Text>
      </Text>
      <Text style={[fontStyle.BD24, { marginBottom: 50 }]}>
        오신 것을 환영해요
      </Text>
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
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
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          blurOnSubmit={false}
        />
      </KeyboardAvoidingView>
      {loading ? (
        <ActivityIndicator size="large" color="#307ecc" />
      ) : (
        <View>
          <DefaultButton pressHandler={handleLogin} text="로그인" />
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.registerText}>마인드 쿠키가 처음이신가요?</Text>
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
    paddingVertical: 70,
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
    textDecorationLine: "underline", // 밑줄 추가 (필요 시)
  },
});

export default LoginScreen;
