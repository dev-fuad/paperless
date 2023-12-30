/**
 * paperless
 * account.tsx
 * created: 25/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from "react";
import { StyleSheet } from "react-native";

import { Card, IconButton, Text } from "react-native-paper";

import { Account } from "@models";
import { formatAmount } from "@utils/formatter";
import { findChange } from "@utils/miscellaneous";
import { SCREEN_WIDTH } from "@utils/scale";

interface Props {
  account: Account;
}

export const AddAccountCard: React.FC = () => {
  return (
    <Card mode="outlined" style={[styles.card, styles.center]}>
      <IconButton icon="plus" mode="contained-tonal" />
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
    width: (SCREEN_WIDTH - 24) / 2,
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
