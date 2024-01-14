/**
 * paperless
 * create-account.tsx
 * created: 01/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { CalcInput, DatetimePicker, SelectInput, TextInput } from "@components";
import { useAccountStore } from "@store/account";

interface Props {}

const getKey = (item) => item.id;
const getLabel = (item) => item.type;
const getGroup = (item) => item.group;

const CreateAccount: React.FC<Props> = () => {
  const accountTypes = useAccountStore((state) => state.accountTypes);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [openingDate, setOpeningDate] = useState<Date | undefined>(undefined);
  const [openingBalance, setOpeningBalance] = useState("");
  const [closingBalance, setClosingBalance] = useState("");

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

      <TextInput mode="outlined" label="Notes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default CreateAccount;
