import { createSlice, createSelector } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    filter: "all", // all, winning, losing
    sortBy: "date", // date, profit, roi
    sortOrder: "desc", // asc, desc
  },

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    resetDashboard: (state) => {
      state.filter = "all";
      state.sortBy = "date";
      state.sortOrder = "desc";
    },
  },
});

export const { setFilter, setSortBy, setSortOrder, resetDashboard } =
  dashboardSlice.actions;

// Selectors
export const selectFilter = (state) => state.dashboard.filter;
export const selectSortBy = (state) => state.dashboard.sortBy;
export const selectSortOrder = (state) => state.dashboard.sortOrder;

// Calculate metrics selector
export const selectDashboardMetrics = createSelector(
  (state) => state.trades.trade,
  (trades) => {
    const totalTrades = trades.length;
    const totalProfit = trades.reduce(
      (sum, trade) => sum + (parseFloat(trade.profit) || 0),
      0,
    );
    const winningTrades = trades.filter(
      (trade) => parseFloat(trade.profit) > 0,
    ).length;
    const losingTrades = trades.filter(
      (trade) => parseFloat(trade.profit) < 0,
    ).length;
    const breakEvenTrades = totalTrades - winningTrades - losingTrades;
    const winningRatio =
      totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;
    const avgProfit =
      totalTrades > 0 ? (totalProfit / totalTrades).toFixed(2) : 0;
    const avgROI =
      totalTrades > 0
        ? trades.reduce((sum, trade) => sum + (parseFloat(trade.roi) || 0), 0) /
          totalTrades
        : 0;

    return {
      totalTrades,
      totalProfit: totalProfit.toFixed(2),
      winningTrades,
      losingTrades,
      breakEvenTrades,
      winningRatio,
      avgProfit,
      avgROI: avgROI.toFixed(2),
    };
  },
);

export default dashboardSlice.reducer;
