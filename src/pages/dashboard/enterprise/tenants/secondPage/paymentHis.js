"use client"
import React, { useEffect, useState } from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useTenantRentEnterprise from "@/store/enterpriseStore/rentPaymentEnterprise";
import Widget from "./paymentWidget";

const PaymentHis = ({ tenantData, id }) => {
  const [again, setAgain] = useState(false);
  const tenantId = tenantData?.data?._id
  const {
    data: paymentData,
    loading,
    fetchData
  } = useTenantRentEnterprise();

  useEffect(() => {
    fetchData(tenantId)
  }, [tenantData])


  const fetchDataAgain = () => {
    fetchData(tenantId)
    setAgain(false);
  }

  let allData = paymentData?.data ? paymentData?.data : []

  if (!Array.isArray(allData)) {
    allData = [];
  }
  // Total rent for all entries
  let totalRent = 0;
  for (const entry of allData) {
    totalRent += entry.totalRent;
  }

  // Total rent for entries with "SUCCESS" status
  let successTotalRent = 0;
  for (const entry of allData) {
    if (entry.status === "SUCCESS") {
      successTotalRent += entry.totalRent;
    }
  }

  const boxes = [
    {
      id: 1,
      bgColor: "successBg",
      textColor: "text-Success",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Total Payment",
      money: `${addCommasToNumber(totalRent)}`,
    },
    {
      id: 2,
      bgColor: "warningBg",
      textColor: "text-warning2",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Pending Rent",
      money: `${paymentData?.data?.[0]?.status === "SUCCESS" ? "N 0" : addCommasToNumber(successTotalRent)}`,
      dueDate: `Due date: ${changeBackendDateFormat(paymentData?.data?.[0]?.dueDate)}`
    }
  ];

  return (
    <div>
      <div className="flex flex-row gap-4 md:gap-2 md:justify-between">{
        boxes.map((data) => (
          <div key={data.id} className="w-full">
            <div className={`${data?.type === "Maintenance" ? "hidden md:block" : ""}  h-[85px] w-full md:max-w-[320px] py-2 flex flex-col justify-around border ${data?.border}  rounded-md px-[12px] bg-${data?.bgColor}`}>
              <div className={`${data?.textColor} text-[13px] font-[600] `}>{data?.type}</div>
              <div className={`text-[14px] font-[500] ${data?.textColor2}`}>{data?.money}</div>
              <div className="text-[10px] font-[400] text-BlackHomz">{data?.dueDate} </div>
            </div>
          </div>
        ))
      }
      </div>
      <div>
        <Widget again={again} setAgain={setAgain} fetchDataAgain={fetchDataAgain} Data={tenantData} id={id} />
      </div>
    </div>
  );
};

export default PaymentHis;
