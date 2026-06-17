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
    editTrade: (state, action) => {
      const { index, updatedTrade } = action.payload;
      if (index >= 0 && index < state.trade.length) {
        state.trade[index] = updatedTrade;
      }
    },
    updateTrade: (state, action) => {
      const index = state.trade.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.trade[index] = action.payload;
      }
    },
  },
});

export const { addTrade, deleteTrade, editTrade, updateTrade } =
  tradeSlice.actions;
export default tradeSlice.reducer;
