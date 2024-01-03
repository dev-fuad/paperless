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

import { SelectInput, TextInput } from "@components";
import { useAccountStore } from "@store/account";

interface Props {}

const getKey = (item) => item.id;
const getLabel = (item) => item.type;
const getGroup = (item) => item.group;

const CreateAccount: React.FC<Props> = () => {
  const accountTypes = useAccountStore((state) => state.accountTypes);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");

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

      <TextInput mode="outlined" label="Opening Date" />

      <TextInput mode="outlined" label="Starting Balance" />

      <TextInput mode="outlined" label="Closing Balance" />

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
