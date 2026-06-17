import { configureStore } from "@reduxjs/toolkit";
import tradeReducer from "../feature/trades/TradeSlice";
import dashboardReducer from "../feature/dashboard/DashboardSlice";
import taxReducer from "../feature/tax/TaxSlice";

export const store = configureStore({
  reducer: {
    trades: tradeReducer,
    dashboard: dashboardReducer,
    tax: taxReducer,
  },
});
