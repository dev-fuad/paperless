/**
 * paperless
 * account.tsx
 * created: 25/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

import { transition } from "@animations/view-all-accounts";
import { Account } from "@models";
import { formatAmount } from "@utils/formatter";
import { findChange } from "@utils/miscellaneous";
import { SCREEN_WIDTH, isWideScreen } from "@utils/scale";

const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

interface Props {
  account: Account;
}

export const MoreAccountCard: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const backgroundColor = theme.colors.elevation.level1;

  const onMoreCardPress = useCallback(() => {
    router.push("/account/");
  }, []);

  return (
    <Card
      mode="outlined"
      style={[styles.card, { backgroundColor }]}
      onPress={onMoreCardPress}
    >
      <Card.Content style={styles.center}>
        <AnimatedIcon
          sharedTransitionTag="all-account-tag"
          sharedTransitionStyle={transition}
          icon="chevron-right"
          mode="contained-tonal"
        />
        <Text variant="titleLarge">View All</Text>
      </Card.Content>
    </Card>
  );
};

const ExpandButton = (props) => (
  <IconButton {...props} icon="arrow-top-right" mode="contained-tonal" />
);

const AccountCard: React.FC<Props> = ({ account }) => {
  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title
        title={formatAmount(account.closingBalance)}
        subtitle={findChange(account.closingBalance, account.openingBalance)}
        right={ExpandButton}
        rightStyle={styles.expandButton}
      />
      <Card.Content>
        <Text variant="titleLarge">{account.name}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: isWideScreen ? 200 : (SCREEN_WIDTH - 24) / 2,
  },
  expandButton: {
    marginTop: -20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountCard;
