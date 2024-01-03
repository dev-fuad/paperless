/**
 * paperless
 * _layout.tsx
 * created: 23/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

// polyfill
import "polyfill/groupBy";

import React from "react";
import { useColorScheme } from "react-native";

import { Stack } from "expo-router";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { enGB, registerTranslation } from "react-native-paper-dates";

import { useAppSettingsStore } from "@store/app-settings";

registerTranslation("en-GB", enGB);

const ROUNDNESS = 8;

const themes = {
  dark: {
    ...MD3DarkTheme,
    roundness: ROUNDNESS,
    colors: {
      ...MD3DarkTheme.colors,
      primary: "#C0FFEE",
      secondary: "#AED285",
      tertiary: "#C0FFEE",
    },
  },
  light: {
    ...MD3LightTheme,
    roundness: ROUNDNESS,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#3EB489",
      secondary: "#136F63",
      tertiary: "#3EB489",
    },
  },
};

const Layout: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = useAppSettingsStore((state) => state.theme);

  const selectedTheme = themes[theme === "automatic" ? colorScheme : theme];
  const backgroundColor = selectedTheme.colors.background;

  return (
    <PaperProvider theme={selectedTheme}>
      <Stack screenOptions={{ contentStyle: { backgroundColor } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings/index"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="account/create-account"
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "fade",
          }}
        />
      </Stack>
    </PaperProvider>
  );
};

export default Layout;
