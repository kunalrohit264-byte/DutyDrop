import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrade } from "../feature/trades/TradeSlice";
import { calculateROI, calculateProfit } from "../utils/CalculateRoi";
import {
  calculateTax,
  calculateNetProfit,
  calculateAfterTaxPrice,
} from "../utils/CalculateTax";

function AddTrade() {
  const dispatch = useDispatch();
  const taxRate = useSelector((state) => state.tax.taxRate || 20);

  const [formData, setFormData] = useState({
    asset: "",
    quantity: "",
    buyPrice: "",
    sellPrice: "",
    notes: "",
  });

  const [calculations, setCalculations] = useState({
    profit: 0,
    roi: 0,
    tax: 0,
    netProfit: 0,
    afterTaxPrice: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      updateCalculations(updated);
      return updated;
    });
  };

  const updateCalculations = (data) => {
    const buyPrice = parseFloat(data.buyPrice) || 0;
    const sellPrice = parseFloat(data.sellPrice) || 0;
    const quantity = parseFloat(data.quantity) || 0;

    const profit = calculateProfit(buyPrice, sellPrice, quantity);
    const roi = calculateROI(buyPrice, sellPrice, quantity);
    const tax = calculateTax(profit, taxRate);
    const netProfit = calculateNetProfit(profit, taxRate);
    const afterTaxPrice = calculateAfterTaxPrice(
      sellPrice,
      profit,
      quantity,
      taxRate,
    );

    setCalculations({
      profit: profit.toFixed(2),
      roi: roi.toFixed(2),
      tax: tax.toFixed(2),
      netProfit: netProfit.toFixed(2),
      afterTaxPrice: afterTaxPrice.toFixed(2),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.asset ||
      !formData.quantity ||
      !formData.buyPrice ||
      !formData.sellPrice
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newTrade = {
      id: Date.now(),
      asset: formData.asset,
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
      sellPrice: parseFloat(formData.sellPrice),
      profit: parseFloat(calculations.profit),
      roi: parseFloat(calculations.roi),
      tax: parseFloat(calculations.tax),
      netProfit: parseFloat(calculations.netProfit),
      afterTaxPrice: parseFloat(calculations.afterTaxPrice),
      notes: formData.notes,
      date: new Date().toISOString(),
    };

    dispatch(addTrade(newTrade));
    setFormData({
      asset: "",
      quantity: "",
      buyPrice: "",
      sellPrice: "",
      notes: "",
    });
    setCalculations({
      profit: 0,
      roi: 0,
      tax: 0,
      netProfit: 0,
      afterTaxPrice: 0,
    });
    alert("Trade added successfully!");
  };

  return (
    <section
      id="add-trade"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 py-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-2xl border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                fill="#ffffff"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Add Trade</h1>
            <p className="text-slate-400 mt-1">
              Record a new trade with automatic ROI and tax calculations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 rounded-2xl backdrop-blur-sm"
            >
              <div className="space-y-6">
                {/* Asset */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Asset Name *
                  </label>
                  <input
                    type="text"
                    name="asset"
                    value={formData.asset}
                    onChange={handleChange}
                    placeholder="e.g., Bitcoin, Ethereum, AAPL"
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                  />
                </div>

                {/* Quantity and Prices */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Buy Price *
                    </label>
                    <input
                      type="number"
                      name="buyPrice"
                      value={formData.buyPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Sell Price *
                    </label>
                    <input
                      type="number"
                      name="sellPrice"
                      value={formData.sellPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any notes about this trade..."
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 transform hover:scale-105"
                >
                  Add Trade
                </button>
              </div>
            </form>
          </div>

          {/* Calculations Section */}
          <div className="space-y-4">
            {/* Profit Card */}
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-medium mb-2">Profit</p>
              <p
                className={`text-3xl font-bold ${parseFloat(calculations.profit) >= 0 ? "text-cyan-200" : "text-red-300"}`}
              >
                {calculations.profit}
              </p>
            </div>

            {/* ROI Card */}
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-medium mb-2">ROI %</p>
              <p
                className={`text-3xl font-bold ${parseFloat(calculations.roi) >= 0 ? "text-green-300" : "text-red-300"}`}
              >
                {calculations.roi}%
              </p>
            </div>

            {/* Tax Card */}
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-medium mb-2">
                Tax ({taxRate}%)
              </p>
              <p className="text-3xl font-bold text-orange-300">
                {calculations.tax}
              </p>
            </div>

            {/* Net Profit Card */}
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-medium mb-2">
                Net Profit (After Tax)
              </p>
              <p
                className={`text-3xl font-bold ${parseFloat(calculations.netProfit) >= 0 ? "text-green-200" : "text-red-300"}`}
              >
                {calculations.netProfit}
              </p>
            </div>

            {/* After Tax Price Card */}
            <div className="border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-slate-400 text-sm font-medium mb-2">
                After Tax Price / Unit
              </p>
              <p className="text-3xl font-bold text-violet-300">
                {calculations.afterTaxPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddTrade;
