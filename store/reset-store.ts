import { DevSettings } from "react-native";

import { useAccountStore } from "./account";
import { useTransactionStore } from "./transaction";

export const resetStore = () => {
  useAccountStore.persist.clearStorage();
  useTransactionStore.persist.clearStorage();
};

DevSettings.addMenuItem("Reset Store", resetStore);
