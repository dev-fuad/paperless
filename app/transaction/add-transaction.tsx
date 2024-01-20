/**
 * paperless
 * add-transaction.tsx
 * created: 20/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { Appbar, Button, SegmentedButtons } from "react-native-paper";
import Animated from "react-native-reanimated";
import uuid from "react-native-uuid";

import { CalcInput, DatetimePicker, SelectInput, TextInput } from "@components";
import { Transaction, TransactionGroup, TransactionType } from "@models";
import { useTransactionStore } from "@store/transaction";

const AnimatedAction = Animated.createAnimatedComponent(Appbar.Action);

interface Props {}

const getKey = (item) => item.id;
const getLabel = (item) => item?.name ?? "";

const icon = {
  [TransactionGroup.expense]: "bank-transfer-out",
  [TransactionGroup.income]: "bank-transfer-in",
  [TransactionGroup.transfer]: "bank-transfer",
};

const buttons = Object.entries(TransactionGroup).map(([key, value]) => ({
  value: key,
  label: value,
  icon: icon[value],
  showSelectedCheck: true,
}));

const AddTransaction: React.FC<Props> = () => {
  const router = useRouter();
  const transactionTypes = useTransactionStore(
    (state) => state.transactionTypes,
  );
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState(new Date());
  const [transactionGroup, setTransactionGroup] = useState("expense");
  const [transactionType, setTransactionType] = useState<TransactionType>();
  const [description, setDescription] = useState("");

  const filteredTypes = useMemo(
    () =>
      transactionTypes.filter(
        (type) => type.group === TransactionGroup[transactionGroup],
      ),
    [transactionGroup],
  );

  const canAdd = useMemo(
    () => name && amount && transactionType,
    [amount, name, transactionType],
  );

  const saveTransaction = useCallback(() => {
    const transaction = {
      id: uuid.v4(),
      name,
      description,
      type: transactionType,
      date: date.toISOString(),
      amount: Number(amount) * 100,
    } as Transaction;

    addTransaction(transaction);
    router.back();
  }, [amount, date, description, name, transactionType]);

  return (
    <View style={styles.container}>
      <AnimatedAction
        sharedTransitionTag="add-transaction-tag"
        icon="chevron-left"
        mode="contained"
        onPress={router.back}
      />
      <TextInput
        left={<TextInput.Icon icon="alphabetical" />}
        label="Payee / Item"
        value={name}
        onChangeText={setName}
      />

      <SegmentedButtons
        value={transactionGroup}
        multiSelect={false}
        onValueChange={setTransactionGroup}
        buttons={buttons}
      />

      <CalcInput label="Amount" value={amount} onChangeText={setAmount} />

      <DatetimePicker label="Date" selectedDate={date} onSelect={setDate} />

      <SelectInput
        items={filteredTypes}
        getKey={getKey}
        getLabel={getLabel}
        label="Category"
        selected={transactionType}
        onSelect={setTransactionType}
      />

      <TextInput
        left={<TextInput.Icon icon="alphabetical" />}
        multiline
        label="Note"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        mode="outlined"
        icon="swap-horizontal"
        disabled={!canAdd}
        style={styles.submit}
        onPress={saveTransaction}
      >
        Save Transaction
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    padding: 20,
    rowGap: 20,
  },
  submit: {
    alignSelf: "center",
    marginTop: 10,
    width: "80%",
  },
});

export default AddTransaction;
