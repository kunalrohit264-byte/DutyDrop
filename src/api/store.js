import { configureStore } from "@reduxjs/toolkit";
import tradeReducer from "../feature/trades/TradeSlice";

export const store = configureStore({
  reducer: {
    trades: tradeReducer,
  },
});
