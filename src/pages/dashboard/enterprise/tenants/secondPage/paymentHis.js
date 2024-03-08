"use client"
import React, { useEffect } from "react";
import Box from "../../components/box";
import Table from "../components/table";
import useRentPaymentStore from "@/store/enterpriseStore/rentPaymentInfo";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";

const PaymentHis = ({tenantData}) => {
  const tenantId = tenantData?.data?._id
  console.log(tenantId);
  const {
    data,
    loading,
    fetchData
  } = useRentPaymentStore();

  useEffect(() => {
    fetchData()
  }, [])

console.log(data)
console.log(tenantData);
  const boxes = [
    {
      id: 1,
      bgColor: "successBg",
      textColor: "text-Success",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Total Payment",
      money: `${addCommasToNumber(data?.totalRent)}`,
    },
    {
      id: 2,
      bgColor: "warningBg",
      textColor: "text-warning2",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Pending Rent",
      money: `${data?.rentInfo?.paymentStatus === "paid" ? "------" : addCommasToNumber(data?.totalRent) }`,
      dueDate: `${changeBackendDateFormat(data?.dueDate)}`
    },
    {
      id: 3,
      bgColor: "whiteblue",
      textColor: "text-BlueHomz",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Maintenance",
      money: `${tenantData?.data?.maintenanceRequests?.length ? tenantData?.data?.maintenanceRequests?.length : "0"} Active Requests`,
    }
  ]

  return (
    <div>
      <div className="flex gap-4">{
        boxes.map((data) => (
          <div key={data.id} className="w-full">
            <div className={`h-[80px] min-w-[180px] max-w-[220px] py-2 flex flex-col justify-around border ${data?.border}  rounded-md px-[12px] bg-${data?.bgColor}`}>
              <div className={`${data?.textColor} text-[13px] font-[600] `}>{data?.type}</div>
              <div className={`text-[14px] font-[500] ${data?.textColor2}`}>{data?.money}</div>
              <div className="text-[10px] font-[400] text-BlackHomz">{data?.dueDate} </div>
            </div>
          </div>
        ))
      }
      </div>
      <div>
        <Table tenantData={tenantData} data={data}/>
      </div>
    </div>
  );
};

export default PaymentHis;
