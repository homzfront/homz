import React, { useEffect } from "react";
import Box from "../../components/box";
import Table from "../components/table";
import useTenantRentPaymentOwner from "@/store/propertyOwnerStore/rentPaymentTenant";
import addCommasToNumber from "@/utils/addCommasToNumber";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Dropdown from "@/pages/dashboard/enterprise/components/dropDownTwo";
import ArrowDownDashes from "@/components/icons/arrowDownDashes";

const PaymentHis = (data) => {
  const tenantId = data?.data?.data?._id
  const {
    data: paymentData,
    loading,
    fetchData
  } = useTenantRentPaymentOwner();

  useEffect(() => {
    fetchData(tenantId)
  }, [data])

  const allData = paymentData?.data ? paymentData?.data : []

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
      money: `${paymentData?.data?.[0]?.status === "SUCCESS" ? "0" : addCommasToNumber(successTotalRent)}`,
      dueDate: `${changeBackendDateFormat(paymentData?.data?.[0]?.dueDate)}`
    },
    {
      id: 3,
      bgColor: "whiteblue",
      textColor: "text-BlueHomz",
      textColor2: "text-BlackHomz",
      border: "border-white",
      type: "Maintenance",
      money: `${data?.data?.data?.maintenanceRequests ? data?.data?.data?.maintenanceRequests?.length : "0"} Active Requests`,
    }
  ]
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
      <div className="flex gap-4">{
        boxes.map((data) => (
          <div key={data.id} className="w-full">
            <div className={`h-[80px] min-w-[180px] max-w-[220px] py-2 flex flex-col justify-around border ${data?.border}  rounded-md px-[12px] bg-${data?.bgColor}`}>
              <div className={`${data?.textColor} text-[13px] font-[600] `}>{data?.type}</div>
              <div className={`text-[14px] font-[500] ${data?.textColor2}`}><span className={`${data.type === "Maintenance" && "hidden"}`} style={{ fontFamily: "Arial" }}>₦</span>{data?.money}</div>
              <div className="text-[10px] font-[400] text-BlackHomz">{data?.dueDate} </div>
            </div>
          </div>
        ))
      }
      </div>
      <div>
        <Table tenantData={data} datas={paymentData} />
      </div>
    </div>
  );
};

export default PaymentHis;
