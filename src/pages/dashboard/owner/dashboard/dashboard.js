"use client";
import React, { useState } from "react";
import Card from "./components/estatecard/card";
import HomesCard from "./components/homescard/card";
import RevCard from "./components/revenue/card";
import TenantsCard from "./components/tenants/card";
import Maintenance from "./components/maintenance/card";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "../sidebar/MobileNav";

const Dashboard = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="flex flex-col overflow-x-hidden dashboard md:px-[2rem] md:grid md:grid-flow-col">
      <div className={!showSideNav && "hidden"}>
        <MobileNav closeDash={() => setShowSideNav(false)} />
      </div>
      <div className={!showSideNav ? "block w-[375px]" : "hidden"}>
        <div className="pt-4 pb-8 gap-5 w-[375px] md:w-[957px] ">
          <div className="flex justify-between pt-[0px] p-4 items-center md:hidden">
            <div>
              <Link href={"/"}>
                <Image
                  src={"/Homz_Logo_Blue.png"}
                  alt="HOMZ"
                  height={20}
                  className="cursor-pointer "
                  width={80}
                />
              </Link>
            </div>
            <div>
              <button onClick={toggleSideNav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className=" p-4">
            <h1 className="text-[16px] md:text-[23px] font-[700] text-BlackHomz">
              Welcome back, Victor
            </h1>
            <p className="text-[12px] md:text-[16px] font-[400] text-GrayHomz2">
              What will you like to do today?
            </p>
          </div>
          <div className="block w-[375px] px-4 md:hidden my-1 ">
            <input
              type="text"
              className="border searchPane h-[40px] pl-8 rounded-md w-[335px]"
              placeholder="search"
            />

            <Image
              src={
                "/static/dashboard/enterprisemanager/header/search-normal.png"
              }
              alt=""
              className="relative bottom-[25px] left-[13px] "
              height={15}
              width={15}
            />
          </div>
          <div className="flex gap-5 flex-col md:flex-row">
            <Card />
            <HomesCard />
            <RevCard />
          </div>
        </div>
        <div className="flex  w-[375px] gap-5 border-gray flex-col md:flex-row md:w-[961px] ">
          <TenantsCard />
          <Maintenance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
