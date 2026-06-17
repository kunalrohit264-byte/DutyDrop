import { createSlice, createSelector } from "@reduxjs/toolkit";

const taxSlice = createSlice({
  name: "tax",
  initialState: {
    taxRate: 20, // Default 20% tax rate
    holdingPeriod: 365, // Days for long-term vs short-term
  },

  reducers: {
    setTaxRate: (state, action) => {
      state.taxRate = action.payload;
    },
    setHoldingPeriod: (state, action) => {
      state.holdingPeriod = action.payload;
    },
  },
});

export const { setTaxRate, setHoldingPeriod } = taxSlice.actions;

// Selectors
export const selectTaxRate = (state) => state.tax.taxRate;
export const selectHoldingPeriod = (state) => state.tax.holdingPeriod;

// Calculate tax selector
export const selectTaxCalculations = createSelector(
  (state) => state.trades.trade,
  (state) => state.tax.taxRate,
  (trades, taxRate) => {
    const totalProfit = trades.reduce(
      (sum, trade) => sum + (parseFloat(trade.profit) || 0),
      0,
    );
    const totalTax = (totalProfit * taxRate) / 100;
    const netProfit = totalProfit - totalTax;

    const profitableTrades = trades.filter(
      (trade) => parseFloat(trade.profit) > 0,
    );
    const profitableTradeTax = profitableTrades.reduce((sum, trade) => {
      const profit = parseFloat(trade.profit) || 0;
      return sum + (profit * taxRate) / 100;
    }, 0);

    return {
      totalProfit: totalProfit.toFixed(2),
      taxRate,
      totalTax: totalTax.toFixed(2),
      netProfit: netProfit.toFixed(2),
      profitableTradeTax: profitableTradeTax.toFixed(2),
      tradesCount: trades.length,
      profitableTradesCount: profitableTrades.length,
    };
  },
);

export default taxSlice.reducer;
