import React from "react";
import Dashboard from "@/pages/dashboard/enterprise/dashboard/dashboard";

export const metadata = {
  title: "Enterprise"
}

const App = () => {
  return (
    <div className="overflow-y-auto h-screen scrollbar-containerII">
      <Dashboard />
    </div>
  );
};

export default App;
