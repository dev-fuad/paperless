import {
  AccountGroup,
  AccountType,
  TransactionGroup,
  TransactionType,
} from "@models";

export const seedAccountType: AccountType[] = [
  { id: "AccType_1", type: "saving", group: AccountGroup.assets },
  { id: "AccType_2", type: "checking", group: AccountGroup.assets },
  { id: "AccType_3", type: "cash", group: AccountGroup.assets },
  { id: "AccType_4", type: "virtual", group: AccountGroup.assets },
  { id: "AccType_5", type: "receivables", group: AccountGroup.assets },
  { id: "AccType_6", type: "payables", group: AccountGroup.liabilities },
  { id: "AccType_7", type: "other", group: AccountGroup.assets },
  { id: "AccType_8", type: "other", group: AccountGroup.liabilities },
];

export const seedTransactionTypes: TransactionType[] = [
  { id: "TxnType_1", name: "Other", group: TransactionGroup.expense },
  { id: "TxnType_2", name: "Other", group: TransactionGroup.income },
  { id: "TxnType_3", name: "Other", group: TransactionGroup.transfer },
];
