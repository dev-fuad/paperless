import { Account, Transaction } from "@models";

import { seedAccountType, seedTransactionTypes } from "./seeds";

export const DUMMY_ACCOUNTS: Account[] = [
  {
    id: "acc_1",
    name: "Account 1",
    openingBalance: 90000,
    closingBalance: 100000,
    type: seedAccountType[0],
  },
  {
    id: "acc_2",
    name: "Account 2",
    openingBalance: 1000000,
    closingBalance: 850000,
    type: seedAccountType[1],
  },
  {
    id: "acc_3",
    name: "Account 3",
    openingBalance: 50000,
    closingBalance: 90000,
    type: seedAccountType[0],
  },
];

export const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_1",
    name: "To Mr. Chal Han",
    amount: 2000000,
    type: seedTransactionTypes[0],
    date: "23122023-1845",
  },
  {
    id: "txn_2",
    name: "Refund From Koppee",
    amount: 2000000,
    type: seedTransactionTypes[1],
    date: "23122023-1845",
  },
  {
    id: "txn_3",
    name: "To F&G Inc.",
    amount: 2000000,
    type: seedTransactionTypes[0],
    date: "23122023-1845",
  },
  {
    id: "txn_4",
    name: "To Self",
    amount: 2000000,
    type: seedTransactionTypes[2],
    date: "23122023-1845",
  },
];
