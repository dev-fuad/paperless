/**
 * paperless
 * create-account.tsx
 * created: 01/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";

import { CalcInput, DatetimePicker, SelectInput, TextInput } from "@components";
import { Account, AccountType } from "@models";
import { useAccountStore } from "@store/account";

interface Props {}

const getKey = (item) => item.id;
const getLabel = (item) => item?.type ?? "";
const getGroup = (item) => item.group;

const CreateAccount: React.FC<Props> = () => {
  const router = useRouter();
  const accountTypes = useAccountStore((state) => state.accountTypes);
  const addAccount = useAccountStore((state) => state.addAccount);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>();
  const [openingDate, setOpeningDate] = useState<Date | undefined>(new Date());
  const [openingBalance, setOpeningBalance] = useState("0");
  const [closingBalance, setClosingBalance] = useState("0");
  const [note, setNote] = useState("");

  const saveAccount = useCallback(() => {
    const account = {
      id: uuid.v4(),
      openingBalance: Number(openingBalance) * 100,
      closingBalance: Number(closingBalance) * 100,
      name: accountName,
      type: accountTypes.find((type) => type.id === accountType?.id),

      note,
    } as Account;

    addAccount(account);
    router.back();
  }, [openingBalance, closingBalance, accountName, accountType, note]);

  const canSave = useMemo(
    () => accountName && accountType?.id,
    [accountName, accountType],
  );

  return (
    <View style={styles.container}>
      <TextInput
        left={<TextInput.Icon icon="alphabetical" />}
        label="Account Name"
        value={accountName}
        onChangeText={setAccountName}
      />

      <SelectInput
        items={accountTypes}
        getKey={getKey}
        getLabel={getLabel}
        groupBy={getGroup}
        label="Account Type"
        selected={accountType}
        onSelect={setAccountType}
      />

      <DatetimePicker
        label="Opening Date"
        selectedDate={openingDate}
        onSelect={setOpeningDate}
      />

      <CalcInput
        label="Starting Balance"
        value={openingBalance}
        onChangeText={setOpeningBalance}
      />

      <CalcInput
        label="Closing Balance"
        value={closingBalance}
        onChangeText={setClosingBalance}
      />

      <TextInput
        mode="outlined"
        label="Notes"
        value={note}
        onChangeText={setNote}
      />

      <Button
        mode="outlined"
        icon="bank-plus"
        disabled={!canSave}
        style={styles.submit}
        onPress={saveAccount}
      >
        Create Account
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
  },
  submit: {
    alignSelf: "center",
    marginTop: 10,
    width: "80%",
  },
});

export default CreateAccount;
