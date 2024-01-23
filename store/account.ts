/**
 * paperless
 * account.ts
 * created: 31/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Account, AccountType } from "@models";
import { DUMMY_ACCOUNTS } from "@services/dummy-data";
import { seedAccountType } from "@services/seeds";

export interface AccountState {
  accountTypes: AccountType[];
  accounts: Account[];
  addAccountType: (accountType: AccountType) => void;
  removeAccountType: (accountTypeId: AccountType["id"]) => void;
  addAccount: (account: Account) => void;
  removeAccount: (accountId: Account["id"]) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accountTypes: seedAccountType,
      accounts: DUMMY_ACCOUNTS,
      addAccountType: (accountType) =>
        set((state) => ({
          accountTypes: [...state.accountTypes, accountType],
        })),
      removeAccountType: (accountTypeId) =>
        set((state) => ({
          accountTypes: state.accountTypes.filter(
            (accountType) => accountType.id !== accountTypeId,
          ),
        })),
      addAccount: (account) =>
        set((state) => ({ accounts: [...state.accounts, account] })),
      removeAccount: (accountId) =>
        set((state) => ({
          accounts: state.accounts.filter(
            (account) => account.id !== accountId,
          ),
        })),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
