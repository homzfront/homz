import React from "react";
import Header from "@/pages/dashboard/tenant/header/header";
import Sidebar from "@/pages/dashboard/tenant/sidebar/sidebar";
import { TanstackProvider } from "@/app/providers/TanstackProvider";
const Layout = ({ children }) => {
  return (
    <div className="dashboard_main">
      <Sidebar />
      <div className="w-full">
        <Header />
        <TanstackProvider>
          <div>{children}</div>
        </TanstackProvider>
        {/* {children} */}
      </div>
    </div>
  );
};

export default Layout;
