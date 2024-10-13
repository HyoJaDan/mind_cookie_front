import { Ionicons } from "@expo/vector-icons"; // Ionicons 아이콘 사용
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import {
  Alert,
  BackHandler,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState } from "recoil";
import { fontStyle } from "../assets/font/font";
import { apiClient } from "../data/apiClient";
import { baseURLData } from "../data/userData";

const logout = async (navigation: any) => {
  await AsyncStorage.removeItem("user_token");
  navigation.replace("Auth");
};

const deleteAccount = async (baseURL: string, navigation: any) => {
  await apiClient(baseURL, "/member/delete", "DELETE");

  await AsyncStorage.removeItem("user_token");
  navigation.replace("Auth");
};

export function DrawerContent(props: DrawerContentComponentProps) {
  const [baseURL] = useRecoilState(baseURLData);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = async () => {
    await logout(props.navigation);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "경고",
      "회원 탈퇴 시 기존 정보는 모두 삭제되고 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: async () => {
            await deleteAccount(baseURL, props.navigation);
          },
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={fontStyle.MD18}>로그아웃</Text>
        </TouchableOpacity>
        <View style={styles.spacing} />
        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
          <Ionicons
            name="person-remove-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={fontStyle.MD18}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          문의사항이 있으면 {"\n"} 아래 메일로 보내주세요.
        </Text>
        <TouchableOpacity
          style={styles.emailContainer}
          onPress={() => Linking.openURL("mailto:kopasd992@gmail.com")}
        >
          <Text style={styles.email}>kopasd992@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  spacing: {
    height: 20,
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  footerText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
    textAlign: "center",
  },
  emailContainer: {
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  email: {
    fontSize: 16,
    color: "#1e90ff",
    textDecorationLine: "underline",
  },
});
