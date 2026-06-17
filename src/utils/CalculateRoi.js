// Calculate ROI (Return on Investment)
const calculateROI = (buyPrice, sellPrice, quantity) => {
  if (!buyPrice || !sellPrice || !quantity || buyPrice <= 0) {
    return 0;
  }

  const totalCost = buyPrice * quantity;
  const totalRevenue = sellPrice * quantity;
  const profit = totalRevenue - totalCost;
  const roi = ((profit / totalCost) * 100).toFixed(2);

  return parseFloat(roi);
};

// Calculate profit
const calculateProfit = (buyPrice, sellPrice, quantity) => {
  if (!buyPrice || !sellPrice || !quantity) {
    return 0;
  }

  const totalCost = buyPrice * quantity;
  const totalRevenue = sellPrice * quantity;
  const profit = totalRevenue - totalCost;

  return parseFloat(profit.toFixed(2));
};

export { calculateROI, calculateProfit };
export default calculateROI;
