import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RecoilRoot } from "recoil";
import { Colors } from "./assets/color/color";
import AuthContextProvider, { AuthContext } from "./data/auth-context";
import WelcomeScreen from "./screens/MyRecord";
import LoginScreen from "./screens/initScreen/LoginScreen";
import SignupScreen from "./screens/initScreen/SignupScreen";

import ChallengeDetailScreen from "./screens/findChallenge/ChallengeDetail";
import { FindChallenge } from "./screens/findChallenge/findChallenge";
import IconButton from "./uitll/ui/IconButton";

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
function FindChallengeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindChallenge" component={FindChallenge} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
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
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
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
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      await SplashScreen.preventAutoHideAsync();
      const storageToken = await AsyncStorage.getItem("token");

      if (storageToken) {
        authCtx.authenticate(storageToken);
      }

      await SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  /* const preloadAssets = () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font: any) => Font.loadAsync(font));

    const imagesToLoad = [require("./assets/picture/meRecord/Spoon.svg")];

    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all<void | Asset[]>([...fontPromises, ...imagePromises]);
  }; */
  const fetchFonts = () => {
    return Font.loadAsync({
      /* Pretendard: require("/assets/font/pretendard/PretendardVariable.ttf"), 
       "Pretendard-Light": require("./assets/font/pretendard/Pretendard-Light.otf"), 
       "Pretendard-Black": require("./assets/font/pretendard/Pretendard-Black.otf"), 
       "Pretendard-ExtraBold": require("./assets/font/pretendard/Pretendard-ExtraBold.otf"),
      "Pretendard-Thin": require("./assets/font/pretendard/Pretendard-Thin.otf"),
      "Pretendard-ExtraLight": require("./assets/font/pretendard/Pretendard-ExtraLight.otf"), */
      "Pretendard-Bold": require("./assets/font/pretendard/Pretendard-Bold.otf"),
      "Pretendard-SemiBold": require("./assets/font/pretendard/Pretendard-SemiBold.otf"),
      "Pretendard-Regular": require("./assets/font/pretendard/Pretendard-Regular.otf"),
      "Pretendard-Medium": require("./assets/font/pretendard/Pretendard-Medium.otf"),
    });
  };

  const preLoad = async () => {
    return await fetchFonts();
  };
  /* const preLoad = async () => {
    return await Promise.all([fetchFonts() , preloadAssets()]);
  }; */
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
