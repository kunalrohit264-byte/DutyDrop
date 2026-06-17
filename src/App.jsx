import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTrade from "./pages/AddTrade";
import Tax from "./pages/Tax";
import History from "./pages/History";

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <Navbar />

      {/* Dashboard Section */}
      <Dashboard />

      {/* Add Trade Section */}
      <AddTrade />

      {/* Tax Section */}
      <Tax />

      {/* History Section */}
      <History />
    </div>
  );
}

export default App;
