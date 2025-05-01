import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#235c5b',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: '',
          tabBarIcon: ({ color }) =><MaterialCommunityIcons name="home-outline" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="shares"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-timeline-variant" size={24} color="black" />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
