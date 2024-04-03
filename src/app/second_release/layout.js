"use client";
import "./globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Header from "../../pages/Second_Release/components/admin_header";
import HeaderMobile from "../../pages/Second_Release/components/mobile_header";
import MarginWidthWrapper from "../../pages/Second_Release/components/margin-width-wrapper";
import PageWrapper from "../../pages/Second_Release/components/page-wrapper";
import SideNav from "../../pages/Second_Release/components/adminSideNav";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children,params }) {
  const [searchValue, setSearchValue] = useState("");
  // console.log(searchValue);
  params.search = searchValue;
  return (
    <div className="flex gap-3 md:gap-0">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header setSearchValue={setSearchValue} searchValue={searchValue} />
          <HeaderMobile setSearchValue={setSearchValue} />
          <PageWrapper>
            {children}
          </PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
