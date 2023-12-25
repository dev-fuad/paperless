/**
 * paperless
 * index.tsx
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "expo-router";
import { Appbar, List, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSettingsStore } from "@store/app-settings";

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const theme = useAppSettingsStore((state) => state.theme);
  const updateTheme = useAppSettingsStore((state) => state.updateTheme);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon="chevron-left"
          mode="contained"
          onPress={navigation.goBack}
        />
      </Appbar.Header>

      <List.Item
        title="Dark Mode"
        right={() => (
          <Switch
            value={theme === "dark"}
            onValueChange={(value) => updateTheme(value ? "dark" : "light")}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
