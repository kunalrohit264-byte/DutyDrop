import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import calculateTax from "../utils/CalculateTax";

function Dashboard() {
  const trades = useSelector((state) => state.trades.trade || []);

  // Calculate metrics
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

  // TAXES CALCULATION DOING
  const resultTax = calculateTax(totalProfit);

  // Chart Data - Trade Distribution
  const tradeDistributionData = [
    { name: "Winning", value: winningTrades, color: "#4ade80" },
    { name: "Losing", value: losingTrades, color: "#f87171" },
    { name: "Break Even", value: breakEvenTrades, color: "#cbd5e1" },
  ].filter((item) => item.value > 0);

  // Chart Data - Profit Trend (simulated from trades)
  const profitTrendData = trades.map((trade, index) => ({
    name: `Trade ${index + 1}`,
    profit: parseFloat(trade.profit) || 0,
    roi: parseFloat(trade.roi) || 0,
  }));

  // Chart Data - Asset Distribution
  const assetDistribution = {};
  trades.forEach((trade) => {
    if (trade.asset) {
      assetDistribution[trade.asset] =
        (assetDistribution[trade.asset] || 0) + 1;
    }
  });
  const assetDistributionData = Object.entries(assetDistribution).map(
    ([asset, count]) => ({
      asset,
      trades: count,
    }),
  );

  return (
    <main
      id="dashboard"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Logo */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-violet-800 rounded-2xl border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-500/20 flex-shrink-0">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 15l4-5 4 5 6-8"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
            <p className="text-slate-400 mt-1">
              Trading performance overview and metrics
            </p>
          </div>
        </div>

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Trades Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Trades
                </p>
                <p className="text-3xl font-bold text-slate-100 mt-2">
                  {totalTrades}
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15 10H23L17 15L19 23L12 18L5 23L7 15L1 10H9L12 2Z"
                    fill="#a78bfa"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Profit Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Profit
                </p>
                <p
                  className={`text-3xl font-bold mt-2 ${totalProfit >= 0 ? "text-cyan-200" : "text-red-300"}`}
                >
                  {totalProfit.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                    fill="#06b6d4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Winning Ratio Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Winning Ratio
                </p>
                <p className="text-3xl font-bold text-green-300 mt-2">
                  {winningRatio}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    fill="#4ade80"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Winning Trades Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Winning Trades
                </p>
                <p className="text-3xl font-bold text-green-300 mt-2">
                  {winningTrades}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8L12 2Z"
                    stroke="#4ade80"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="#4ade80"
                    fillOpacity="0.1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Losing Trades Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Losing Trades
                </p>
                <p className="text-3xl font-bold text-red-300 mt-2">
                  {losingTrades}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
                    fill="#f87171"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Break Even Trades Card */}
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm hover:border-slate-600/50 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Break Even</p>
                <p className="text-3xl font-bold text-slate-300 mt-2">
                  {breakEvenTrades}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-500/10 border border-slate-500/20 rounded-xl flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                    fill="#cbd5e1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trade Distribution Pie Chart */}
          {tradeDistributionData.length > 0 && (
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                📊 Trade Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Asset Distribution Bar Chart */}
          {assetDistributionData.length > 0 && (
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                📈 Assets by Trade Count
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assetDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="asset" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                  />
                  <Bar dataKey="trades" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Profit Trend Chart */}
        {profitTrendData.length > 0 && (
          <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm mb-8">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              📉 Profit Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={{ fill: "#4ade80" }}
                  name="Profit"
                />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4" }}
                  name="ROI %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Summary Info */}
        <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">
            Trading Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Trades</span>
                <span className="text-slate-100 font-semibold">
                  {totalTrades}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Profit</span>
                <span
                  className={`font-semibold ${totalProfit >= 0 ? "text-cyan-200" : "text-red-300"}`}
                >
                  {totalProfit.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Win Rate</span>
                <span className="text-green-300 font-semibold">
                  {winningRatio}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Success/Failure</span>
                <span className="text-slate-100 font-semibold">
                  {winningTrades}/{losingTrades}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
