/**
 * paperless
 * index.tsx
 * created: 20/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import Animated from "react-native-reanimated";

import { transition } from "@animations/view-all-accounts";
import { AccountItem } from "@components";
import { useAccountStore } from "@store/account";

const AnimatedAction = Animated.createAnimatedComponent(Appbar.Action);

interface Props {}

const Index: React.FC<Props> = () => {
  const router = useRouter();
  const accounts = useAccountStore((state) => state.accounts);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <AnimatedAction
          sharedTransitionTag="all-account-tag"
          sharedTransitionStyle={transition}
          icon="chevron-left"
          mode="contained"
          onPress={router.back}
        />
      </Appbar.Header>

      <FlatList
        data={accounts}
        renderItem={({ item }) => <AccountItem account={item} />}
        keyExtractor={(account) => account.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
  },
});

export default Index;
