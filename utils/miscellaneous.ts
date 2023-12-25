export const findChange = (newAmount: number, oldAmount: number) => {
  const amount = ((newAmount - oldAmount) * 100) / oldAmount;
  return amount.toLocaleString('en-IN', { signDisplay: "exceptZero", maximumFractionDigits: 2 }) + '%';
};
