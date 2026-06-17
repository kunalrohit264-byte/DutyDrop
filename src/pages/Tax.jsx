import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { setTaxRate } from "../feature/tax/TaxSlice";
import { calculateTax, calculateNetProfit } from "../utils/CalculateTax";

function Tax() {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trade || []);
  const taxRate = useSelector((state) => state.tax.taxRate || 20);
  const [customTaxRate, setCustomTaxRate] = useState(taxRate);

  // Calculate total profit
  const totalProfit = trades.reduce(
    (sum, trade) => sum + (parseFloat(trade.profit) || 0),
    0,
  );

  // Calculate taxes
  const totalTax = calculateTax(totalProfit, customTaxRate);
  const netProfit = calculateNetProfit(totalProfit, customTaxRate);

  // Winning trades tax
  const winningTrades = trades.filter((trade) => parseFloat(trade.profit) > 0);
  const winningTradesProfit = winningTrades.reduce(
    (sum, trade) => sum + (parseFloat(trade.profit) || 0),
    0,
  );
  const winningTradesTax = calculateTax(winningTradesProfit, customTaxRate);

  // Losing trades
  const losingTrades = trades.filter((trade) => parseFloat(trade.profit) < 0);
  const losingTradesProfit = losingTrades.reduce(
    (sum, trade) => sum + (parseFloat(trade.profit) || 0),
    0,
  );

  const handleTaxRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setCustomTaxRate(newRate);
    dispatch(setTaxRate(newRate));
  };

  // Chart Data - Profit vs Tax
  const profitVsTaxData =
    totalProfit > 0
      ? [
          {
            name: "Net Profit",
            value: parseFloat(netProfit),
            color: "#4ade80",
          },
          { name: "Tax", value: parseFloat(totalTax), color: "#fb923c" },
        ]
      : [];

  // Chart Data - Trade Performance
  const tradePerformanceData = [
    { name: "Winning Trades", value: winningTrades, color: "#4ade80" },
    { name: "Losing Trades", value: losingTrades, color: "#f87171" },
  ].filter((item) => item.value > 0);

  // Chart Data - Tax Rate Comparison
  const rateComparisonData =
    trades.length > 0
      ? [
          {
            asset: "Winning Trades",
            taxAmount: winningTradesTax,
            profit: winningTradesProfit,
          },
          {
            asset: "Losing Trades",
            taxAmount: Math.abs(losingTradesProfit),
            profit: Math.abs(losingTradesProfit),
          },
        ]
      : [];

  return (
    <section
      id="tax"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 py-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-2xl border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/40 transform transition-all duration-300 hover:scale-110">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Tax Calculator
            </h1>
            <p className="text-slate-400 mt-2">
              Calculate, manage, and optimize taxes on your trades
            </p>
          </div>
        </div>

        {/* Tax Rate Control */}
        <div className="border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm mb-12 shadow-xl shadow-orange-500/10 transform transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-center justify-between flex-col md:flex-row gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">
                🔧 Tax Rate Configuration
              </h2>
              <p className="text-slate-400">
                Adjust the tax rate to match your jurisdiction and trading
                strategy
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
              <div className="w-full md:w-56">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={customTaxRate}
                  onChange={handleTaxRateChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
              <div className="flex items-center gap-2 bg-slate-950/50 px-4 py-2 rounded-xl border border-orange-500/30">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={customTaxRate}
                  onChange={handleTaxRateChange}
                  className="w-16 px-2 py-1 bg-slate-950/50 border-0 text-orange-300 focus:outline-none font-bold text-lg"
                />
                <span className="text-orange-300 font-bold text-lg">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Tax Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Profit Card */}
          <div className="group border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                  Total Profit
                </p>
                <p
                  className={`text-3xl font-bold mt-2 transition-all ${totalProfit >= 0 ? "text-cyan-200 group-hover:text-cyan-100" : "text-red-300"}`}
                >
                  {totalProfit.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
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

          {/* Total Tax Card */}
          <div className="group border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-orange-300 transition-colors">
                  Total Tax
                </p>
                <p className="text-3xl font-bold text-orange-300 mt-2 group-hover:text-orange-200 transition-colors">
                  {totalTax.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  @ {customTaxRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"
                    fill="#fb923c"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Net Profit Card */}
          <div className="group border border-green-500/30 bg-gradient-to-br from-green-500/10 via-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-green-300 transition-colors">
                  Net Profit
                </p>
                <p
                  className={`text-3xl font-bold mt-2 transition-all ${netProfit >= 0 ? "text-green-300 group-hover:text-green-200" : "text-red-300"}`}
                >
                  {netProfit.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
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

          {/* Tax Efficiency Card */}
          <div className="group border border-violet-500/30 bg-gradient-to-br from-violet-500/10 via-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
                  Tax Efficiency
                </p>
                <p className="text-3xl font-bold text-violet-300 mt-2 group-hover:text-violet-200 transition-colors">
                  {totalProfit > 0
                    ? ((netProfit / totalProfit) * 100).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
              <div className="w-12 h-12 bg-violet-500/20 border border-violet-500/30 rounded-xl flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8L12 2Z"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    fill="#a78bfa"
                    fillOpacity="0.1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tax Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Winning Trades Tax */}
          <div className="border border-green-500/30 bg-gradient-to-br from-green-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-left-4 duration-500 delay-500">
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-3xl">✓</span>
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Winning Trades Tax
              </span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50 hover:bg-slate-950/80 transition-colors">
                <span className="text-slate-400">Total Trades</span>
                <span className="text-slate-100 font-bold">
                  {winningTrades.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50 hover:bg-slate-950/80 transition-colors">
                <span className="text-slate-400">Total Profit</span>
                <span className="text-green-300 font-bold">
                  {winningTradesProfit.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-green-500/20 pt-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <span className="text-slate-300 font-semibold">
                    Tax Payable
                  </span>
                  <span className="text-green-300 font-bold text-lg">
                    {winningTradesTax.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Losing Trades Impact */}
          <div className="border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-right-4 duration-500 delay-500">
            <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
              <span className="text-3xl">✕</span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Loss Analysis
              </span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50 hover:bg-slate-950/80 transition-colors">
                <span className="text-slate-400">Total Trades</span>
                <span className="text-slate-100 font-bold">
                  {losingTrades.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950/50 hover:bg-slate-950/80 transition-colors">
                <span className="text-slate-400">Total Loss</span>
                <span className="text-red-300 font-bold">
                  {losingTradesProfit.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-blue-500/20 pt-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <span className="text-slate-300 font-semibold">
                    Tax Deduction
                  </span>
                  <span className="text-blue-300 font-bold text-lg">
                    {Math.abs(losingTradesProfit).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Profit vs Tax Pie Chart */}
          {profitVsTaxData.length > 0 && (
            <div className="border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-100 mb-6">
                💰 Profit vs Tax Breakdown
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={profitVsTaxData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(2)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {profitVsTaxData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Trade Performance Pie Chart */}
          {tradePerformanceData.length > 0 && (
            <div className="border border-green-500/30 bg-gradient-to-br from-green-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
              <h3 className="text-lg font-bold text-slate-100 mb-6">
                📊 Trade Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={tradePerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tradePerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Tax Rate Comparison Bar Chart */}
        {rateComparisonData.length > 0 && (
          <div className="border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 mb-12">
            <h3 className="text-lg font-bold text-slate-100 mb-6">
              📈 Profit & Tax Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rateComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="asset" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="#4ade80" name="Profit" />
                <Bar dataKey="taxAmount" fill="#fb923c" name="Tax" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Tax Summary */}
        <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-slate-950 p-8 rounded-2xl backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            📊 Tax Summary Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10">
              <p className="text-slate-400 text-sm font-medium mb-2">
                Total Trades Analyzed
              </p>
              <p className="text-3xl font-bold text-slate-100">
                {trades.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10">
              <p className="text-slate-400 text-sm font-medium mb-2">
                Avg Tax Per Trade
              </p>
              <p className="text-3xl font-bold text-orange-300">
                {trades.length > 0 ? (totalTax / trades.length).toFixed(2) : 0}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/10">
              <p className="text-slate-400 text-sm font-medium mb-2">
                Effective Tax Rate
              </p>
              <p className="text-3xl font-bold text-violet-300">
                {totalProfit > 0
                  ? ((totalTax / totalProfit) * 100).toFixed(2)
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tax;
