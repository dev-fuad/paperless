/**
 * paperless
 * _layout.tsx
 * created: 23/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useAppSettingsStore } from '../store/app-settings';
import { AppBackground } from '../components';

const themes = {
  dark: {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#C0FFEE',
      secondary: '#136F63',
    },
  },
  light: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#3EB489',
      secondary: '#136F63',
    },
  },
};

const Layout: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = useAppSettingsStore((state) => state.theme);

  return (
    <PaperProvider theme={themes[theme === 'automatic' ? colorScheme : theme]}>
      <AppBackground>
        <Slot />
      </AppBackground>
    </PaperProvider>
  );
};

export default Layout;
