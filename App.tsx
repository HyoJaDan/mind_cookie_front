import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import AuthContextProvider from "./data/auth-context";
import WelcomeScreen from "./screens/MyRecord";
import ChallengeDetailScreen from "./screens/findChallenge/ChallengeDetail";
import AddChallenge from "./screens/findChallenge/addChallenge";
import { FindChallenge } from "./screens/findChallenge/findChallenge";
const Stack = createNativeStackNavigator();

function FindChallengeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindChallenge" component={FindChallenge} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
      <Stack.Screen name="AddChallenge" component={AddChallenge} />
    </Stack.Navigator>
  );
}
const Tab = createMaterialTopTabNavigator();

function AuthenticatedStack() {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="내 기록"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="face" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="챌린지"
        component={FindChallengeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="fire-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthenticatedStack />
    </NavigationContainer>
  );
}

function Root() {
  return <Navigation />;
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const fetchFonts = () => {
    return Font.loadAsync({
      "Pretendard-Bold": require("./assets/font/pretendard/Pretendard-Bold.otf"),
      "Pretendard-SemiBold": require("./assets/font/pretendard/Pretendard-SemiBold.otf"),
      "Pretendard-Regular": require("./assets/font/pretendard/Pretendard-Regular.otf"),
      "Pretendard-Medium": require("./assets/font/pretendard/Pretendard-Medium.otf"),
    });
  };

  const preLoad = async () => {
    return await fetchFonts();
  };
  useEffect(() => {
    preLoad().then((context) => {
      setIsReady(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isReady) {
    return null; // 또는 로딩 화면을 렌더링
  }

  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StatusBar style="dark" />
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: "blue",
    width: "90%", // 인디케이터의 너비를 90%로 설정하여 여백 생성
    marginLeft: "5%", // 인디케이터의 좌측 여백
    marginRight: "5%", // 인디케이터의 우측 여백
  },
});
