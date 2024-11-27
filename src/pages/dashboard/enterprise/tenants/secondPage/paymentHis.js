"use client";
import React from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Widget from "./paymentWidget";

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
          ? "₦ 0"
          : addCommasToNumber(paymentData?.data?.pendingRent)
        }`,
      dueDate: `${paymentData?.data?.pendingRent === null
          ? ""
          : `Due date: ${changeBackendDateFormat(paymentData?.data?.dueDate)}`
        }`,
    },
  ];

  return (
    <div>
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
                {data?.money}
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
