import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CalculationProfit from "../../utils/CalculateProfit";
import { addTrade } from "./TradeSlice";
function TradeForm() {
  const dispatch = useDispatch();
  const [asset, setAsset] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [notes, setNotes] = useState("");
  const handleRest = () => {
    setAsset("");
    setQuantity("");
    setBuyPrice("");
    setSellPrice("");
    setNotes("");
  };
  const handleSave = () => {
    if (!asset || !quantity || !buyPrice || !sellPrice) {
      alert("Please fill in all fields (notes are optional)");
      return;
    }

    const tradeData = {
      asset,
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
      sellPrice: Number(sellPrice),
      notes,
    };

    const result = CalculationProfit(tradeData);
    dispatch(addTrade(result));
    handleRest();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-8 text-slate-100">
      <div className="w-full max-w-3xl rounded-[28px] p-7 bg-white/5 border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-300/10 via-violet-500/5 to-violet-500/10 border border-violet-500/20"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12h18"
                stroke="#00e0ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M6 7l6 10 6-10"
                stroke="#7c5cff"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold text-slate-50">Add Trade</div>
            <div className="text-xs text-slate-400">
              Quickly log trades and preview profit & ROI
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400" htmlFor="asset">
              Asset
            </label>
            <input
              id="asset"
              className="bg-transparent border-b-2 border-slate-600 focus:border-violet-500 px-2 pb-2 text-sm text-white outline-none placeholder:text-slate-500 transition"
              placeholder="e.g. BTC/USDT or AAPL"
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              className="bg-transparent border-b-2 border-slate-600 focus:border-violet-500 px-2 pb-2 text-sm text-white outline-none placeholder:text-slate-500 transition"
              placeholder="0.00"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400" htmlFor="buy">
              Buy Price
            </label>
            <input
              id="buy"
              className="bg-transparent border-b-2 border-slate-600 focus:border-violet-500 px-2 pb-2 text-sm text-white outline-none placeholder:text-slate-500 transition"
              placeholder="0.00"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400" htmlFor="sell">
              Sell Price
            </label>
            <input
              id="sell"
              className="bg-transparent border-b-2 border-slate-600 focus:border-violet-500 px-2 pb-2 text-sm text-white outline-none placeholder:text-slate-500 transition"
              placeholder="0.00"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-400" htmlFor="notes">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              className="bg-transparent border border-slate-600 focus:border-violet-500 p-3 text-sm text-white rounded-2xl min-h-[5.25rem] resize-y placeholder:text-slate-500 outline-none transition"
              placeholder="Add any context or tags"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-2xl border border-white/10 px-3 py-2 text-slate-400 disabled:cursor-not-allowed disabled:opacity-70"
                onClick={() => handleRest()}
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-2xl border border-violet-500/40 bg-gradient-to-r from-violet-500/20 to-cyan-500/10 px-4 py-2 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                onClick={() => handleSave()}
              >
                Save Trade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeForm;
