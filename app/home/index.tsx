import { StyleSheet, View } from "react-native";

import { Link } from "expo-router";
import { Appbar, Button, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { AccountCard, TransactionItem } from "@components";

const DUMMY_ACCOUNTS = [
  {
    id: "acc_1",
    name: "Account 1",
    openingBalance: 90000,
    closingBalance: 100000,
  },
  {
    id: "acc_2",
    name: "Account 2",
    openingBalance: 1000000,
    closingBalance: 850000,
  },
  {
    id: "acc_3",
    name: "Account 3",
    openingBalance: 50000,
    closingBalance: 90000,
  },
];

const DUMMY_TRANSACTIONS = [
  { id: "txn_1", name: "To Mr. Chal Han", amount: 2000000, isCredit: false },
  { id: "txn_2", name: "Refund From Koppee", amount: 2000000, isCredit: true },
  { id: "txn_3", name: "To F&G Inc.", amount: 2000000, isCredit: false },
  { id: "txn_4", name: "To Elec Bill", amount: 2000000, isCredit: false },
];

export default function Page() {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Action icon="chevron-left" mode="contained" />
        <Appbar.Content title="" />
        <Appbar.Action
          icon="arrow-top-right"
          mode="contained"
          onPress={() => {}}
        />

        <Link href="/settings/" asChild>
          <Appbar.Action icon="tune-vertical" mode="contained" />
        </Link>
      </Appbar.Header>

      <View style={styles.greetings}>
        <Text>Good Morning,</Text>
        <Text>Fuad Mohammed Firoz</Text>
      </View>

      <View style={styles.cards}>
        {DUMMY_ACCOUNTS.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </View>

      <Card mode="contained">
        <Card.Title
          title="Transactions"
          right={() => <Button>View All</Button>}
        />
        <Card.Content>
          {DUMMY_TRANSACTIONS.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greetings: {
    marginTop: 35,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    marginVertical: 10,
    rowGap: 2,
    columnGap: 2,
  },
});
