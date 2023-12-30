export enum AccountGroup {
  default = "(No-Grouped)",
  assets = "Assets",
  liabilities = "Liabilities",
}

export type AccountType = {
  id: string;
  type: string;
  group: AccountGroup;
};

export interface Account {
  id: string;
  openingBalance: number;
  closingBalance: number;
  name: string;
  type: AccountType;

  note?: string;
  isHidden?: boolean;

  // for credit accounts
  creditLimit?: number;
  creditCutOffDate?: string;
  creditDueDate?: string;
}

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
