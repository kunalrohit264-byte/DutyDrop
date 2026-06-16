import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTrade } from "./TradeSlice";

function TradeList() {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trade);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("trades", JSON.stringify(trades));
  }, [trades]);
  // CALCULATE TOTAL PROFIT AND ROI
  const totalProfit = trades.reduce(
    (sum, trade) => sum + (parseFloat(trade.profit) || 0),
    0,
  );
  const avgROI =
    trades.length > 0
      ? trades.reduce((sum, trade) => sum + (parseFloat(trade.roi) || 0), 0) /
        trades.length
      : 0;

  const handleDelete = (index) => {
    dispatch(deleteTrade(index));
  };

  const handleEdit = (trade) => {
    // Add edit action dispatch here when TradeSlice has editTrade action
  };

  return (
    <section className="space-y-6">
      <div className="border border-white/10 bg-slate-950/90 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 15l4-5 4 5 6-8"
                    stroke="#7c5cff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-100">
                  Trade History
                </h2>
                <p className="text-sm text-slate-400">
                  View all trades with profit, ROI and notes in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-slate-100">
              Trades: {trades.length}
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-slate-100">
              Total Profit:{" "}
              <span className="text-cyan-200">{totalProfit.toFixed(2)}</span>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-slate-100">
              Avg ROI:{" "}
              <span className="text-violet-200">{avgROI.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-800 bg-slate-950/80">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-200">
            <thead className="bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Buy</th>
                <th className="px-4 py-3">Sell</th>
                <th className="px-4 py-3">Profit</th>
                <th className="px-4 py-3">ROI</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/80">
              {trades.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No trades added yet.
                  </td>
                </tr>
              ) : (
                trades.map((trade, index) => (
                  <tr
                    key={trade.id ?? index}
                    className="transition hover:bg-slate-900/80"
                  >
                    <td className="px-4 py-4 text-slate-100">
                      {trade.asset ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-200">
                      {trade.quantity ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-200">
                      {trade.buyPrice ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-200">
                      {trade.sellPrice ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-cyan-200">
                      {trade.profit ?? "—"}
                    </td>
                    <td className="px-4 py-4 text-violet-200">
                      {trade.roi ? `${trade.roi}%` : "—"}
                    </td>
                    <td className="px-4 py-4 max-w-xs truncate text-slate-400">
                      {trade.notes ?? "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(trade)}
                          className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs text-slate-100 transition hover:bg-violet-500/20"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs text-slate-100 transition hover:bg-cyan-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TradeList;
