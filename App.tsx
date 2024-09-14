import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import AuthContextProvider from "./data/auth-context";
import LoginScreen from "./screens/LoginScreen";
import MyStateScreen from "./screens/MyStateScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SplashScreen from "./screens/SplashScreen";
import TodoScreen from "./screens/TodoScreen";
const Stack = createNativeStackNavigator();

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
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        title: "회원가입", //Set Header Title
        headerStyle: {
          backgroundColor: "#8785FF", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
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
          <StatusBar style="dark" />
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
