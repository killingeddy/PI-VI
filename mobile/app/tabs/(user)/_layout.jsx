import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#235c5b",
        tabBarInactiveTintColor: "#c3c3c3",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
      initialRouteName="(auth)"
    >
      <Tabs.Screen
        name="(auth)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Carteira",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="user_shares"
        options={{
          title: "Recomendações",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-star-outline"
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
