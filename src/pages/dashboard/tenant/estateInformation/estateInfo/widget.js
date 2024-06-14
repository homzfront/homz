"use client";
import React, { useState } from "react";
import Documents from "./estateInfoPage/documents.js";
import EstateInfoP from "./estateInfoPage/estateInfoP.js";

const Widget = ({data}) => {
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
      <div className="w-full h-auto py-4">
        <div className=" flex mt-5 gap-4 justify-between w-[90%] sm:w-[300px] cursor-pointer">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
                !active ? "bg-BlueHomz text-white" : "sm:text-BlackHomz text-BlueHomz bg-walletBg sm:bg-none"
              }`}
              onClick={handlePageChange}
              justify-center
            >
              <p className="text-[11px] sm:text-[14px] font-500">Property Information</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeTwo ? "bg-BlueHomz text-white" : "sm:text-BlackHomz text-BlueHomz bg-walletBg sm:bg-none"
              }`}
              onClick={handlePageChangeTwo}
            >
              <p className="text-[11px] sm:text-[14px] font-500">Documents</p>
            </div>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <EstateInfoP data={data} />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <Documents  data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
