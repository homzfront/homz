"use client";
import React, { useState } from "react";
import Maintenance from "./components/maintenance/card";
import RentFirst from "./components/rent-first/rentFirst";
import RentSecond from "./components/rent-second/rentSecond";
import BillPayment from "./components/billPayment/billPayment";
import MobileNav from "../sidebar/MobileNav";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  

  const toggleSideNavs = () => {
    setShow(!show);
  };
  return (
    <div className="flex flex-col overflow-x-hidden dashboard md:px-[2rem] md:grid md:grid-flow-col">
      <div className={!show && "hidden"}>
      <MobileNav closeSideNav={() => setShow(false)} />

      </div>
    <div className={!show ? "block" : "hidden md:block"}>
        <div className="pt-4 pb-8 gap-5 w-[100%] md:w-[1042px] ">
          <div className="flex justify-between gap-5 pt-[0px] p-4 md:p-0  md:pb-4 items-center md:hidden">
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
              <button onClick={toggleSideNavs}>
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
          <div className=" p-4 md:p-0 md:pb-2">
            <h1 className="text-[16px] md:text-[23px] font-[700] text-BlackHomz">
              Hello, Daniella
            </h1>
            <p className="text-[12px] md:text-[16px] font-[400] text-GrayHomz2">
              What will you like to do today?
            </p>
          </div>
          <div className="block md:hidden my-1 px-4 p-0">
            <input
              type="text"
              className="border h-[40px] pl-8 rounded-md w-[375px]"
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
          <div className="flex w-full flex-col p-4 md:p-0 gap-8 md:flex-row md:flex-wrap">
            <RentFirst />
            <RentSecond />
          </div>
        </div>
        <div className="flex w-[375px] p-4 gap-5 md:p-3 border-gray flex-col md:flex-row md:w-[100%] ">
          <BillPayment />
          <Maintenance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
