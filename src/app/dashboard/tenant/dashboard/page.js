"use client";
import Dashboard from "./component/dashboard";
import React from "react";



const App = () => {
  return (
    <div className="overflow-y-auto h-screen scrollbar-container">
      <Dashboard />
    </div>
  );
};

export default App;
