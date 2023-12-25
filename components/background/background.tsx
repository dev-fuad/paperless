/**
 * paperless
 * background.tsx
 * created: 24/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { useTheme } from "react-native-paper";

const Background: React.FC<ViewProps> = (props) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.background;

  return (
    <View
      {...props}
      style={[styles.container, { backgroundColor }, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Background;
