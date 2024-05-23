"use client";
import "@/app/globals.css";
import React from "react";
import Header from "./components/header";
import HeaderMobile from "./components/mobile_header";
import SideNav from "./components/sideNav";
import WithAuth from "@/utils/withAuth";


const RootLayout = ({ children }) => {

  return (
    <div className="gap-3 md:gap-0 dashboard_main">
      <SideNav />
      <main className="md:block w-full">
        <Header />
        <div className=" w-full">
          <HeaderMobile />
        </div>
        <div className="w-full flex flex-col justify-center items-center px-8">
          {children}
        </div>
      </main>
    </div>
  );
}


export default WithAuth(RootLayout);