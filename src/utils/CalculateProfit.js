function CalculationProfit(saveData) {
  const buyTotal = saveData.buyPrice * saveData.quantity;
  const sellTotal = saveData.sellPrice * saveData.quantity;
  const profit = sellTotal - buyTotal;
  const roi = buyTotal > 0 ? ((profit / buyTotal) * 100).toFixed(2) : 0;

  return {
    ...saveData,
    profit: profit.toFixed(2),
    roi: parseFloat(roi),
  };
}

export default CalculationProfit;
