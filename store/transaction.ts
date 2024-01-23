/**
 * paperless
 * transaction.ts
 * created: 31/12/2023
 * Fuad Mohd. Firoz
 *
 * @format
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Transaction, TransactionType } from "@models";
import { DUMMY_TRANSACTIONS } from "@services/dummy-data";
import { seedTransactionTypes } from "@services/seeds";

export interface TransactionState {
  transactionTypes: TransactionType[];
  transactions: Transaction[];
  addTransactionType: (transactionType: TransactionType) => void;
  removeTransactionType: (transactionTypeId: TransactionType["id"]) => void;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: Transaction["id"]) => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactionTypes: seedTransactionTypes,
      transactions: DUMMY_TRANSACTIONS,
      addTransactionType: (transactionType) =>
        set((state) => ({
          transactionTypes: [...state.transactionTypes, transactionType],
        })),
      removeTransactionType: (transactionTypeId) =>
        set((state) => ({
          transactionTypes: state.transactionTypes.filter(
            (transactionType) => transactionType.id !== transactionTypeId,
          ),
        })),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, transaction],
        })),
      removeTransaction: (transactionId) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== transactionId,
          ),
        })),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
