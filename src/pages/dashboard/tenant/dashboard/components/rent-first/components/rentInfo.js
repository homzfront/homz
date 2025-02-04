"use client"
import HomeTenant from "@/components/icons/homeTenant";
import addCommasToNumber from "@/utils/addCommasToNumber";
import addYearsToValues from "@/utils/addYearsToNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import React from "react";

const RentInfo = ({data}) => {
 
  return (
    <div className="w-full sm:w-[58%]">
      <div
        className="bg-cover h-auto sm:h-[204px] w-full rounded-[12px] p-[24px] "
        style={{
          background: "#006AFF",
          backgroundImage: `url(/static/dashboard/tenant/dashboard/backgroundImage.png)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <HomeTenant />
            <div>
              <p className="text-[16px] font-[500] text-white">
                Rent Information
              </p>
              <p className="text-[11px] font-[400] text-white">
                Here are details of your current rental period.
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-[400] text-white">
              Tenancy Start Date
            </p>
            <p className="text-[11px] font-[500] text-white">
              {changeBackendDateFormat(data?.rentInfo?.startDate)}
            </p>
          </div>
        </div>
        {!data || data === null ? (
          <div>
            <div className="hidden sm:flex gap-4 mt-8">
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
                <p className="text-[11px] font-[400] text-white">Amount</p>
                <p className="text-[18px] font-[500] text-white">-</p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
                <p className="text-[11px] font-[400] text-white">
                  Rent Duration
                </p>
                <p className="text-[18px] font-[500] text-white">-</p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
                <p className="text-[11px] font-[400] text-white">
                  Payment Status
                </p>
                <p className="text-[18px] font-[500] text-white">-</p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg">
                <p className="text-[11px] font-[400] text-white">
                  Next Due Date
                </p>
                <p className="text-[18px] font-[500] text-white">-</p>
              </div>
            </div>

            <div className="sm:hidden gap-4 mt-4">
              <div className="flex gap-1">
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Tenancy Start Date
                  </p>
                  <p className="text-[9px] font-[500] text-white">-</p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">Amount</p>
                  <p className="text-[9px] font-[500] text-white">-</p>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Rent Duration
                  </p>
                  <p className="text-[9px] font-[500] text-white">-</p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Payment Status
                  </p>
                  <p className="text-[9px] font-[500] text-white">-</p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Next Due Date
                  </p>
                  <p className="text-[9px] font-[500] text-white">-</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="hidden sm:flex gap-4 mt-8">
              <div className="h-[68px] px-2 py-3 w-[140px] bg-lightblue rounded-lg flex justify-between flex-col">
                <p className="text-[11px] font-[400] text-white mb-2">Amount</p>
                <p className={`text-[11px] font-[500] text-white`}>
                <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rentInfo?.totalRent)}
                </p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
                <p className="text-[11px] font-[400] text-white mb-2">
                  Rent Duration
                </p>
                <p className={`text-[11px] font-[500] text-white`}>
                  {addYearsToValues(data?.rentInfo?.duration)}
                </p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
                <p className="text-[11px] font-[400] text-white mb-2">
                  Payment Status
                </p>
                <p
                  className={`text-white border border-white text-[11px] font-[400] ${
                    data?.rentInfo?.paymentStatus === "paid" ? "bg-Success" : ""
                  } ${data?.rentInfo?.paymentStatus === "over due" ? "bg-error" : ""} ${
                    data?.rentInfo?.paymentStatus === "pending" ? "bg-warning2" : ""
                  } rounded-lg w-[70%] text-center p-1 mt-[-2px]`}
                >
                  {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                </p>
              </div>
              <div className="h-[68px] px-2 py-3 w-[134px] bg-lightblue rounded-lg flex justify-between flex-col">
                <p className="text-[11px] font-[400] text-white mb-2">
                  Next Due Date
                </p>
                <p className={`text-[11px] font-[500] text-white`}>
                  {changeBackendDateFormat(data?.rentInfo?.dueDate)}
                </p>
              </div>
            </div>

            <div className="sm:hidden gap-4 mt-4">
              <div className="flex gap-1">
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Tenancy Start Date
                  </p>
                  <p className="text-[9px] font-[500] text-white">
                    {changeBackendDateFormat(data?.rentInfo?.startDate)}
                  </p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">Amount</p>
                  <p className={`text-[9px] font-[500] text-white`}>
                  <span style={{ fontFamily: "Arial", }}>₦</span>{addCommasToNumber(data?.rentInfo?.totalRent)}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-2">
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Rent Duration
                  </p>
                  <p className={`text-[9px] font-[500] text-white`}>
                    {addYearsToValues(data?.rentInfo?.duration)}
                  </p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Payment Status
                  </p>
                  <p className={`text-[9px] font-[500] text-white`}>
                    {capitalizeFirstLetter(data?.rentInfo?.paymentStatus)}
                  </p>
                </div>
                <div className="bg-BlueHomz4 rounded-[8px] px-2 py-1">
                  <p className="text-[8px] font-[400] text-BlueHomz2">
                    Next Due Date
                  </p>
                  <p className={`text-[9px] font-[500] text-white`}>
                    {changeBackendDateFormat(data?.rentInfo?.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentInfo;
