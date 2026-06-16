import { createSlice } from "@reduxjs/toolkit";

const loadStoredTrades = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("trades");
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Failed to load stored trades", error);
    return [];
  }
};

const tradeSlice = createSlice({
  name: "trades",
  initialState: {
    trade: loadStoredTrades(),
  },

  reducers: {
    addTrade: (state, action) => {
      state.trade.push(action.payload);
    },
    deleteTrade: (state, action) => {
      state.trade.splice(action.payload, 1);
    },
  },
});

export const { addTrade, deleteTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
