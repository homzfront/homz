"use client";
import "../globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Header from "./components/header";
import HeaderMobile from "./components/mobile_header";
import MarginWidthWrapper from "./components/margin-width-wrapper";
import PageWrapper from "./components/page-wrapper";
import SideNav from "./components/sideNav";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children,params }) {
  // console.log(searchValue);

  return (
    <div className="flex gap-3 md:gap-0">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>
            {children}
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
