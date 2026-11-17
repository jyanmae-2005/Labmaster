import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from '../theme/ThemeProvider';

const tabIcons = {
  index: ['home-outline', 'home'],
  labs: ['flask-outline', 'flask'],
  progress: ['stats-chart-outline', 'stats-chart'],
  settings: ['settings-outline', 'settings'],
} as const;

function AppTabs() {
  const { colors, isDark } = useAppTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tabs
        screenOptions={({ route }) => {
          const [inactiveIcon, activeIcon] = tabIcons[route.name as keyof typeof tabIcons];
          return {
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
              height: 66,
              paddingTop: 7,
              paddingBottom: 8,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={(focused ? activeIcon : inactiveIcon) as keyof typeof Ionicons.glyphMap}
                size={size}
                color={String(color)}
              />
            ),
          };
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="labs" options={{ title: 'Labs' }} />
        <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      </Tabs>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppTabs />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
