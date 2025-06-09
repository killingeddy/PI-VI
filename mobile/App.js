import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToastManager from "toastify-react-native/components/ToastManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import UserSharesScreen from "./screens/user/shares";
import UserWalletScreen from "./screens/user/wallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import Register from "./screens/auth/register";
import Profile from "./screens/auth/profile";
import { StatusBar } from "expo-status-bar";
import Login from "./screens/auth/login";
import HomeScreen from "./screens/home";
import React from "react";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserShares" component={UserSharesScreen} />
      <Stack.Screen name="UserWallet" component={UserWalletScreen} />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#235c5b",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: { fontSize: 14 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Auth"
          component={AuthStack}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="dark" />
      <ToastManager />
    </NavigationContainer>
  );
}
