"use client"
import React, { useEffect } from "react";
import Maintenance from "./components/maintenance/card";
import RentFirst from "./components/rent-first/rentFirst";
import RentSecond from "./components/rent-second/rentSecond";
import BillPayment from "./components/billPayment/billPayment";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import extractFirstName from "@/utils/extractFirstName";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const Dashboard = () => {
  const { data, loading, fetchData } = tenantProfile();

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="dashboard h-[300px] w-full flex flex-col">
      <div className="p-8 w-full pr-6 gap-5 flex flex-col">
        <div className="">
          <h1 className="text-[14px] sm:text-[23px] font-[700] text-BlackHomz">
            {data?.fullName
              ? `Hello, ${extractFirstName(capitalizeFirstLetter(data?.fullName))}`
              : "Hello"}
          </h1>
          <p className="text-[13px] sm:text-[16px] font-[400] text-GrayHomz2">
            What will you like to do today?
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <RentFirst />
          <RentSecond />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-8 w-full pr-6 gap-5">
        <BillPayment />
        <Maintenance />
      </div>
    </div>
  );
};

export default Dashboard;
