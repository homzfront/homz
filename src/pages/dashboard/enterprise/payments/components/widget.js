"use client";
import React, { useState } from "react";
import Tenants from "../tenantPage/tenants.js";
import Wallet from "../wallet/wallet.js";
import { useSearchParams } from "next/navigation.js";

const Widget = () => {
  const urlParams = useSearchParams();
  const tab = urlParams.get("tab")

  const [active, setActive] = useState(tab ? tab === 'payment' : true);
  const [activeTwo, setActiveTwo] = useState(tab === 'wallet');

  const handlePageChange = () => {
    setActive(true);
    setActiveTwo(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(false);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className=" flex mt-5 gap-4 md:w-[571px] cursor-pointer">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${active ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
              onClick={handlePageChange}
              justify-center
            >
              <p className="text-[14px] font-500">Tenants</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
              onClick={handlePageChangeTwo}
            >
              <p className="text-[14px] font-500">Wallet</p>
            </div>
          </div>
        </div>
        <div className=" my-5 rounded-[12px]">
          <div className={`${active ? "inline" : "hidden"}`}>
            <Tenants />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <Wallet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
