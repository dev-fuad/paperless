export enum FrequencyType {
  daily,
  weekly,
  monthly,
  yearly,
}

export enum FrequencyModulations {
  alternate,
  timesPerFrequency,
}

export enum TransactionGroup {
  income = "Income",
  expense = "Expense",
  transfer = "Transsfer",
}

export interface TransactionType {
  id: string;
  name: string;
  group: TransactionGroup;
}

export interface Transaction {
  id: string;
  name: string;
  description?: string;
  amount: number;
  date: string;

  type: TransactionType;
  image?: string;

  repeats?: boolean;
  frequencyType?: FrequencyType;
  frequncyModulation?: FrequencyModulations;
  modSequnce?: number[]; // Like (day, alternate, [2, 1]) -> every 2 days in 3 or (week, timesPerFrequency, [2]) -> twice a week
}

export const seedTransactionTypes: TransactionType[] = [
  { id: "TxnType_1", name: "Other", group: TransactionGroup.expense },
  { id: "TxnType_2", name: "Other", group: TransactionGroup.income },
  { id: "TxnType_3", name: "Other", group: TransactionGroup.transfer },
];
