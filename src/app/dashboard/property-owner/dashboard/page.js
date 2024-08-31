import Dashboard from "@/pages/dashboard/owner/dashboard/dashboard";
import React from "react";

export const metadata = {
  title: "Landlord"
}

const App = () => {
  return (
    <div className="overflow-y-auto h-screen scrollbar-container">
      <Dashboard />
    </div>
  );
};

export default App;
