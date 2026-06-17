// Calculate Tax based on profit
const calculateTax = (profit, taxRate = 20) => {
  if (!profit || profit <= 0) {
    return 0;
  }

  const tax = (profit * taxRate) / 100;
  return parseFloat(tax.toFixed(2));
};

// Calculate net profit after tax
const calculateNetProfit = (profit, taxRate = 20) => {
  const tax = calculateTax(profit, taxRate);
  const netProfit = profit - tax;
  return parseFloat(netProfit.toFixed(2));
};

// Calculate after tax price per unit
const calculateAfterTaxPrice = (sellPrice, profit, quantity, taxRate = 20) => {
  if (!sellPrice || !quantity || quantity <= 0) {
    return 0;
  }

  const tax = calculateTax(profit, taxRate);
  const afterTaxPerUnit = (sellPrice - tax / quantity).toFixed(2);
  return parseFloat(afterTaxPerUnit);
};

export { calculateTax, calculateNetProfit, calculateAfterTaxPrice };
export default calculateTax;
