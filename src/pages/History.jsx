import React from "react";
import TradeList from "../feature/trades/TradeList";

function History() {
  return (
    <section
      id="history"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <TradeList />
      </div>
    </section>
  );
}

export default History;
