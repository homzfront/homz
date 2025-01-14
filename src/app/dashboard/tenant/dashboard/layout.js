// "use client"
import React from "react";
import Header from "@/pages/dashboard/tenant/header/header";
import Sidebar from "@/pages/dashboard/tenant/sidebar/sidebar";
import { TanstackProvider } from "@/app/providers/TanstackProvider";

export const metadata = {
  title: "Tenant",
};
const Layout = ({ children }) => {
  return (
    <div className="dashboard_main">
      <TanstackProvider>
        <Sidebar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </TanstackProvider>
    </div>
  );
};

export default Layout;
