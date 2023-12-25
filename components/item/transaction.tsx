/**
 * paperless
 * transaction.tsx
 * created: 25/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React from 'react';
import { List, Text } from 'react-native-paper';
import { Transaction } from '../../models/transaction';
import { formatAmount } from '../../utils/formatter';

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  return (
    <List.Item
      title={transaction.name}
      left={(props) => <List.Icon {...props} icon={transaction.isCredit ? 'bank-transfer-in' : 'bank-transfer-out'} />}
      right={(props) => <Text {...props} variant="titleSmall">{formatAmount(transaction.amount)}</Text>}
    />
  );
};

export default TransactionItem;
