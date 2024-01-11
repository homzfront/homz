import React from "react";
import Maintenance from "./components/maintenance/card";
import RentFirst from "./components/rent-first/rentFirst";
import RentSecond from "./components/rent-second/rentSecond";
import BillPayment from "./components/billPayment/billPayment";

const dashboard = () => {
  return (
    <div className="dashboard h-[300px] w-[1147px] grid grid-flow-col">
      <div className="p-8 w-[1147px] pr-6 gap-5 flex flex-col">
        <div className="">
          <h1 className="text-[23px] font-[700] text-BlackHomz">
            Hello, Daniella
          </h1>
          <p className="text-[16px] font-[400] text-GrayHomz2">
            What will you like to do today?
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <RentFirst />
          <RentSecond />
        </div>
      </div>
      <div className="flex px-8 w-[1147px] pr-6 gap-5 border-gray">
        <BillPayment />
        <Maintenance />
      </div>
    </div>
  );
};

export default dashboard;
