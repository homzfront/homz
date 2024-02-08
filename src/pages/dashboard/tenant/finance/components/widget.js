"use client";
import React, { useState } from "react";
import Wallet from "../wallet/wallet.js";
import RentSavings from "../rentSavings/rentSavings.js";

const Widget = () => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
  };

  

  return (
    <div>
      <div className="w-full h-auto py-2">
        <div className=" flex mt-5 gap-4  w-[571px] ">
          <div className="flex flex-col items-center gap-2 justify-center pl-8">
            <div
              className={`cursor-pointer flex flex-col items-center py-2 px-4 justify-center rounded-md ${
                !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChange}
              justify-center
            >
              <p className="text-[14px] font-500">Rent Savings</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center pr-8">
            <div
              className={`cursor-pointer flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeTwo}
            >
              <p className="text-[14px] font-500">Wallet</p>
            </div>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <RentSavings />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <Wallet activeTwo={activeTwo}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
