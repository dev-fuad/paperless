/**
 * paperless
 * _layout.tsx
 * created: 23/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { useColorScheme } from "react-native";

import { Slot } from "expo-router";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { AppBackground } from "@components";
import { useAppSettingsStore } from "@store/app-settings";

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

  return (
    <PaperProvider theme={themes[theme === "automatic" ? colorScheme : theme]}>
      <AppBackground>
        <Slot />
      </AppBackground>
    </PaperProvider>
  );
};

export default Layout;
