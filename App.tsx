import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import AuthContextProvider from "./data/auth-context";
import EventScreen from "./screens/EventScreen";
import LoginScreen from "./screens/LoginScreen";
import MyStateScreen from "./screens/MyStateScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import StatisticsScreen from "./screens/StatisticsScreen";
import StopwatchScreen from "./screens/StopwatchScreen";
import TodoScreen from "./screens/TodoScreen";
const Stack = createNativeStackNavigator();
// const Tab = createMaterialTopTabNavigator();
// function StopwatchStack() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: {
//           color: Colors.basic.text_default,
//           fontSize: 18,
//           fontFamily: "Pretendard-Bold",
//         },
//         tabBarIndicatorStyle: { height: 3 },
//       }}
//     >
//       <Tab.Screen name="포모" component={Timer} />
//       <Tab.Screen name="스탑워치" component={StopwatchScreen} />
//     </Tab.Navigator>
//   );
// }
function AuthenticatedStack() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="목표"
        component={TodoScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="상태"
        component={MyStateScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="face" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="이벤트"
        component={EventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event-available" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="타이머"
        component={StopwatchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="통계"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="graph" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

const Auth = () => (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        title: "회원가입",
        headerStyle: {
          backgroundColor: "#8785FF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    /> */}
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        headerTitle: "", // 타이틀을 비워서 없앰
        headerBackTitle: "로그인 화면", // 뒤로가기 버튼 옆에 나올 문구
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  </Stack.Navigator>
);

const Root = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthenticatedStack"
        component={AuthenticatedStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    preLoad().then(() => {
      setIsReady(true);
      ExpoSplashScreen.hideAsync();
    });
  }, []);

  const fetchFonts = () => {
    return Font.loadAsync({
      "Pretendard-Bold": require("./assets/font/pretendard/Pretendard-Bold.otf"),
      "Pretendard-SemiBold": require("./assets/font/pretendard/Pretendard-SemiBold.otf"),
      "Pretendard-Regular": require("./assets/font/pretendard/Pretendard-Regular.otf"),
      "Pretendard-Medium": require("./assets/font/pretendard/Pretendard-Medium.otf"),
    });
  };

  const preLoad = async () => {
    await ExpoSplashScreen.preventAutoHideAsync();
    return await fetchFonts();
  };

  if (!isReady) {
    return null;
  }

  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <AuthContextProvider>
              <Root />
            </AuthContextProvider>
          </SafeAreaView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
