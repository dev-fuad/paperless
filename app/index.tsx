/**
 * paperless
 * index.tsx
 * created: 23/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

const App: React.FC = () => {
  const theme = useTheme();

  const backgroundColor = theme.colors.background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>App!</Text>
      <Link href="/home/" asChild>
        <Button>Goto Home</Button>
      </Link>
      <Link href="/settings/" asChild>
        <Button>Goto Settings</Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
