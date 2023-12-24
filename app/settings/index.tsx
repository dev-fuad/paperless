/**
 * paperless
 * index.tsx
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSettingsStore } from '../../store/app-settings';

const Settings: React.FC = () => {
  const theme = useAppSettingsStore((state) => state.theme);
  const updateTheme = useAppSettingsStore((state) => state.updateTheme);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings</Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={(value) => updateTheme(value ? 'dark' : 'light')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
