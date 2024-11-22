"use client"
import React, { useEffect, useState } from "react";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import useTenantRentEnterprise from "@/store/enterpriseStore/rentPaymentEnterprise";
import Widget from "./paymentWidget";
import useRentSummaryTenant from "@/store/enterpriseStore/rentSummaryTenant";
import { getSpecificTenantRentInfo } from "@/api/tenantSevice";

const PaymentHis = ({ tenantData, id }) => {
  const [data, setData] = useState(null)
  const {
    data: paymentData,
    loading,
    fetchData
  } = useRentSummaryTenant();

  const rentInformation = async () => {
    try {
      const response = await getSpecificTenantRentInfo(
        `${tenantData.data.rentInfo._id}`
      );
      const rentInfo = response;
      setData(rentInfo);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (tenantData) {
      rentInformation()
    }
  }, [tenantData])

  useEffect(() => {
    fetchData(id, data?.upDateddata?.startDate, data?.upDateddata?.dueDate, data?.upDateddata?.rent)
  }, [data]);

  const reFetchData = () => {
    fetchData(id, data?.upDateddata?.startDate, data?.upDateddata?.dueDate, data?.upDateddata?.rent)
  }

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
      money: `${paymentData?.data?.pendingRent === null ? "₦ 0" : addCommasToNumber(paymentData?.data?.pendingRent)}`,
      dueDate: `${paymentData?.data?.pendingRent === null ? "" : `Due date: ${changeBackendDateFormat(paymentData?.data?.dueDate)}`}`
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
        <Widget Data={tenantData} id={id} reFetchData={reFetchData}/>
      </div>
    </div>
  );
};

export default PaymentHis;
