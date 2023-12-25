/**
 * paperless
 * account.tsx
 * created: 25/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { Account } from '../../models/account';
import { formatAmount } from '../../utils/formatter';
import { findChange } from '../../utils/miscellaneous';
import { SCREEN_WIDTH } from '../../utils/scale';

interface Props {
  account: Account;
}

const RightContent = (props) => <IconButton {...props} icon="arrow-top-right" mode="contained" />

const AccountCard: React.FC<Props> = ({ account }) => {
  return (
    <Card mode="contained" style={styles.card}>
      <Card.Title
        title={formatAmount(account.closingBalance)}
        subtitle={findChange(account.closingBalance, account.openingBalance)}
        right={RightContent}
      />
      <Card.Content>
        <Text variant="titleLarge">{account.name}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (SCREEN_WIDTH - 22) / 2,
  },
});

export default AccountCard;
