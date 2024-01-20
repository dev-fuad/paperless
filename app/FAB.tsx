/**
 * paperless
 * FAB.tsx
 * created: 18/01/2024
 * Fuad Mohd. Firoz
 *
 * @format
 */

import React, { useCallback, useState } from "react";

import { useRouter } from "expo-router";
import { FAB as PaperFAB, FABGroupProps, useTheme } from "react-native-paper";

const FAB: React.FC<
  Omit<FABGroupProps, "open" | "icon" | "visible" | "actions" | "onStateChange">
> = () => {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const onStateChange: FABGroupProps["onStateChange"] = useCallback(
    (state) => setOpen(state.open),
    [],
  );

  return (
    <PaperFAB.Group
      visible
      backdropColor={theme.colors.background}
      variant="surface"
      open={open}
      icon="plus"
      actions={[
        {
          icon: "bank-plus",
          label: "Add Account",
          onPress: () => router.push("/account/create-account"),
        },
        {
          icon: "swap-horizontal",
          label: "Add Transaction",
          onPress: () => router.push("/transaction/add-transaction"),
        },
      ]}
      onStateChange={onStateChange}
    />
  );
};

export default FAB;
