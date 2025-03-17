"use client";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Widget from "./paymentWidget";
import Dropdown from "../../components/dropDownTwo";
import ArrowDownDashes from "@/components/icons/arrowDownDashes";

const PaymentHis = ({
  tenantData,
  tenantId,
  rentInfo,
  fetchRentInformation,
  reFetchSummaryData,
  paymentData,
}) => {
  const boxes = [
    {
      id: 1,
      bgColor: "successBg",
      textColor: "text-Success",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Total Payment",
      money: `${addCommasToNumber(paymentData?.data?.totalAmountPaid)}`,
    },
    {
      id: 2,
      bgColor: "warningBg",
      textColor: "text-warning2",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Pending Rent",
      money: `${paymentData?.data?.pendingRent === null
        ? "0"
        : addCommasToNumber(paymentData?.data?.pendingRent)
        }`,
      dueDate: `${paymentData?.data?.pendingRent === null
        ? ""
        : `Due date: ${changeBackendDateFormat(paymentData?.data?.dueDate)}`
        }`,
    },
  ];

  const options = [
    { id: 1, label: "Current Period" },
    { id: 2, label: "Period 2" },
    { id: 3, label: "Period 1" },
  ];

  return (
    <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
      <div className="mb-4 p-4 bg-[#F6F6F6] rounded-[8px] flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between">
        <div className="flex gap-1 items-center">
          <ArrowDownDashes />
          <span className="font-normal text-GaryHomz text-sm">Tenancy Period</span>
        </div>
        <Dropdown
          options={options}
          onSelect={() => { }}
          selectOption={options?.[0]?.label}
          className={"bg-white"}
        />
      </div>
      <div className="flex flex-row gap-4 md:gap-2 md:justify-between">
        {boxes.map((data) => (
          <div key={data.id} className="w-full">
            <div
              className={`${data?.type === "Maintenance" ? "hidden md:block" : ""
                }  h-[85px] w-full md:max-w-[320px] py-2 flex flex-col justify-around border ${data?.border
                }  rounded-md px-[12px] bg-${data?.bgColor}`}
            >
              <div className={`${data?.textColor} text-[13px] font-[600] `}>
                {data?.type}
              </div>
              <div className={`text-[14px] font-[500] ${data?.textColor2}`}>
                <span style={{ fontFamily: "Arial", }}>₦</span>{data?.money}
              </div>
              <div className="text-[10px] font-[400] text-BlackHomz">
                {data?.dueDate}{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Widget
          tenantData={tenantData}
          tenantId={tenantId}
          rentInfo={rentInfo}
          fetchRentInformation={fetchRentInformation}
          reFetchSummaryData={reFetchSummaryData}
        />
      </div>
    </div>
  );
};

export default PaymentHis;
