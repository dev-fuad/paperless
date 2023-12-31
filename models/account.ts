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
