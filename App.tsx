import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { RecoilRoot } from "recoil";
import { Colors } from "./assets/color/color";
import IconButton from "./components/ui/IconButton";
import AuthContextProvider, { AuthContext } from "./data/auth-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
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

/* function BottomTabStack() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTintColor: "white",
        tabBarActiveTintColor: "#3c0a6b",
      }}
    >
      <BottomTab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={
          {
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          }
        }
      />
      <BottomTab.Screen
        name="User"
        component={WelcomeScreen}
        options={
          {
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          }
        }
      />
    </BottomTab.Navigator>
  );
}
 */
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
    /* screenOptions={{
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTintColor: "white",
        tabBarActiveTintColor: "#3c0a6b",
      }} */
    >
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
        component={WelcomeScreen}
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
  return (
    <RecoilRoot>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
{
  /* <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabStack} />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator> */
}
