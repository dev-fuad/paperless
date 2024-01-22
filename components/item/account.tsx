/**
 * paperless
 * account.tsx
 * created: 20/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useMemo } from "react";

import { List, Text, useTheme } from "react-native-paper";

import { Account } from "@models";
import { formatAmount } from "@utils/formatter";

interface Props {
  account: Account;
}

const AccountItem: React.FC<Props> = ({ account }) => {
  const theme = useTheme();

  const config = useMemo(() => {
    const result = {
      icon: "trending-neutral",
      color: theme.colors.scrim,
    };
    if (account.openingBalance > account.closingBalance) {
      result.icon = "trending-up";
      result.color = theme.colors.primary;
    } else if (account.openingBalance < account.closingBalance) {
      result.icon = "trending-down";
      result.color = theme.colors.error;
    }
    return result;
  }, [theme.colors.primary, account.closingBalance, account.openingBalance]);

  return (
    <List.Item
      title={account.name}
      left={(props) => <List.Icon {...props} icon={config.icon} />}
      right={(props) => (
        <Text
          {...props}
          variant="titleSmall"
          style={[props.style, { color: config.color }]}
        >
          {formatAmount(account.closingBalance)}
        </Text>
      )}
    />
  );
};

export default AccountItem;
