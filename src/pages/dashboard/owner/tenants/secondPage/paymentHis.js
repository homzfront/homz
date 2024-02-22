import React from "react";
import Box from "../../components/box";
import Table from "../components/table";

const PaymentHis = (data) => {
  return (
    <div className="">
      <div className="flex gap-4">
        <Box
          bgColor={"successBg"}
          textColor={"text-Success"}
          textColor2={"text-BlackHomz"}
          border={"border-white"}
          type={"Total Payment"}
          money={"N2,500,000"}
        />
        <Box
          bgColor={"warningBg"}
          textColor={"text-warning2"}
          textColor2={"text-BlackHomz"}
          border={"border-white"}
          type={"Pending Rent"}
          money={"N2,500,000"}
          dueDate={"Due date: 4th January, 2024"}
        />
        <Box
          bgColor={"whiteblue"}
          textColor={"text-BlueHomz"}
          textColor2={"text-BlackHomz"}
          border={"border-white"}
          type={"Maintenance"}
          money={`${data?.data?.data?.maintenanceRequests ? data?.data?.data?.maintenanceRequests?.length : "0"} Active Requests`}
        />
      </div>
      <div>
        <Table tenantData={data}/>
      </div>
    </div>
  );
};

export default PaymentHis;
