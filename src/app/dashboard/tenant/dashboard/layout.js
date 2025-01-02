"use client"
import React from "react";
import Header from "@/pages/dashboard/tenant/header/header";
import Sidebar from "@/pages/dashboard/tenant/sidebar/sidebar";
const Layout = ({ children }) => {
  return (
    <div className="dashboard_main">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
