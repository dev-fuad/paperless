/**
 * paperless
 * index.tsx
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { Appbar, List, Switch } from "react-native-paper";
import Animated from "react-native-reanimated";

import { useAppSettingsStore } from "@store/app-settings";

const AnimatedAction = Animated.createAnimatedComponent(Appbar.Action);

const Settings: React.FC = () => {
  const router = useRouter();
  const theme = useAppSettingsStore((state) => state.theme);
  const updateTheme = useAppSettingsStore((state) => state.updateTheme);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <AnimatedAction
          sharedTransitionTag="actionIcon"
          icon="chevron-left"
          mode="contained"
          onPress={router.back}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
