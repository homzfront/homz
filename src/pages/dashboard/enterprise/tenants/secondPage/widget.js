"use client";
import React, { useState } from "react";
import Link from "next/link";
import RentInfo from "./rentInfo";
import PaymentHis from "./paymentHis";
import Maintenance from "./maintenance";

const Widget = ({ data }) => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
  };
  return (
    <div>
      <div className=" inline-block min-w-[650px] w-[100%] h-auto p-4  shadow-md bg-white rounded-[12px]">
        <div className="flex mt-5 gap-4 cursor-pointer w-full">
          <div
            className={`rounded-md h-[37px] w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${
              !active ? "bg-BlueHomz text-white " : ""
            }`}
            onClick={handlePageChange}
          >
            <p>Rent Information</p>
          </div>
          <div
            className={`rounded-md h-[37px] w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${
              activeTwo ? "bg-BlueHomz text-white " : ""
            }`}
            onClick={handlePageChangeTwo}
          >
            <p>Payment History</p>
          </div>
          <div
            className={`rounded-md h-[37px] flex flex-row gap-1 w-[auto] px-4 text-[14px] font-[500] py-2 text-center ${
              activeThree ? "bg-BlueHomz text-white " : ""
            }`}
            onClick={handlePageChangeThree}
          >
            <p>Maintenance Request</p>
            <span
              className={` rounded-[40%] w-[30px] ${
                activeThree
                  ? "bg-white text-GrayHomz"
                  : "bg-whiteblue text-BlueHomz "
              }`}
            >
              {data?.data?.maintenanceRequests?.length}
            </span>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <RentInfo profile={data} />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <PaymentHis tenantData={data}/>
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <Maintenance  data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
