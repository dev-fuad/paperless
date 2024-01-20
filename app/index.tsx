import { StyleSheet, View } from "react-native";

import { AddAccountCard } from "@components/card/account";
import { Link } from "expo-router";
import { Appbar, Button, Card, Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

import { AccountCard, TransactionItem } from "@components";
import { useAccountStore } from "@store/account";
import { useTransactionStore } from "@store/transaction";

import FAB from "./FAB";

const AnimatedAction = Animated.createAnimatedComponent(Appbar.Action);

export default function Page() {
  const theme = useTheme();
  const accounts = useAccountStore((state) => state.accounts);
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content color={theme.colors.secondary} title="PAPERLESS" />

        <Link href="/settings/" asChild>
          <AnimatedAction
            sharedTransitionTag="actionIcon"
            icon="tune-vertical"
            mode="contained"
          />
        </Link>
      </Appbar.Header>

      <View style={styles.greetings}>
        <Text>Good Morning,</Text>
        <Text>Fuad Mohammed Firoz</Text>
      </View>

      <View style={styles.cards}>
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
        <AddAccountCard />
      </View>

      <Card mode="outlined" style={styles.bottomCard}>
        <Card.Title
          title="Transactions"
          right={() => <Button>View All</Button>}
        />
        <Card.Content>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </Card.Content>
      </Card>
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetings: {
    marginBottom: 25,
    marginHorizontal: 10,
    marginTop: 45,
  },
  cards: {
    columnGap: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    marginVertical: 20,
    rowGap: 4,
  },
  bottomCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
    marginBottom: -1,
  },
});
