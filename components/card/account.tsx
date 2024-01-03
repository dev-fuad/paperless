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

import { Account } from "@models";
import { formatAmount } from "@utils/formatter";
import { findChange } from "@utils/miscellaneous";
import { SCREEN_WIDTH, isWideScreen } from "@utils/scale";

interface Props {
  account: Account;
}

export const AddAccountCard: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const backgroundColor = theme.colors.elevation.level1;

  const onAddCardPress = useCallback(() => {
    router.push("/account/create-account");
  }, []);

  return (
    <Card
      mode="outlined"
      style={[styles.card, { backgroundColor }]}
      onPress={onAddCardPress}
    >
      <Card.Content style={styles.center}>
        <IconButton icon="plus" mode="contained-tonal" />
        <Text variant="titleLarge">Add Account</Text>
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
