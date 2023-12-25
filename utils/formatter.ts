export const formatAmount = (amount: number) => {
  return (amount / 100).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};
