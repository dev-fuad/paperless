import {
  AccountGroup,
  AccountType,
  TransactionGroup,
  TransactionType,
} from "@models";

export const seedAccountType: AccountType[] = [
  { id: "AccType_1", type: "Saving", group: AccountGroup.assets },
  { id: "AccType_2", type: "Checking", group: AccountGroup.assets },
  { id: "AccType_3", type: "Cash", group: AccountGroup.assets },
  { id: "AccType_4", type: "Virtual", group: AccountGroup.assets },
  { id: "AccType_5", type: "Receivables", group: AccountGroup.assets },
  { id: "AccType_6", type: "Payables", group: AccountGroup.liabilities },
  { id: "AccType_7", type: "Other", group: AccountGroup.assets },
  { id: "AccType_8", type: "Other", group: AccountGroup.liabilities },
];

export const seedTransactionTypes: TransactionType[] = [
  { id: "TxnType_1", name: "Other", group: TransactionGroup.expense },
  { id: "TxnType_2", name: "Other", group: TransactionGroup.income },
  { id: "TxnType_3", name: "Other", group: TransactionGroup.transfer },
];
