/**
 * paperless
 * transaction.tsx
 * created: 25/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useMemo } from "react";

import { List, Text, useTheme } from "react-native-paper";

import { Transaction, TransactionGroup } from "@models";
import { formatAmount } from "@utils/formatter";

interface Props {
  transaction: Transaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const theme = useTheme();

  const config = useMemo(() => {
    const result = {
      icon: "bank-transfer-out",
      color: theme.colors.error,
    };
    if (transaction.type.group === TransactionGroup.income) {
      result.icon = "bank-transfer-in";
      result.color = theme.colors.primary;
    } else if (transaction.type.group === TransactionGroup.transfer) {
      result.icon = "bank-transfer";
      result.color = theme.colors.secondary;
    }
    return result;
  }, [transaction.type.group]);

  return (
    <List.Item
      title={transaction.name}
      left={(props) => <List.Icon {...props} icon={config.icon} />}
      right={(props) => (
        <Text
          {...props}
          variant="titleSmall"
          style={[props.style, { color: config.color }]}
        >
          {formatAmount(transaction.amount)}
        </Text>
      )}
    />
  );
};

export default TransactionItem;
