export interface Transaction {
  id: string;
  name: string;
  description?: string;
  amount: number;
  isCredit: boolean;
}