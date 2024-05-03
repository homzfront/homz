"use client";
import "@/app/globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Header from "./components/header";
import HeaderMobile from "./components/mobile_header";
import SideNav from "./components/sideNav";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {

  return (
    <div className=" gap-3 md:gap-0 dashboard_main">
      <SideNav />
      <main className="w-full ">
          <Header />
          <HeaderMobile />
          <div className="w-full flex flex-col justify-center items-center px-10">
            {children}
          </div>
      </main>
    </div>
  );
}
