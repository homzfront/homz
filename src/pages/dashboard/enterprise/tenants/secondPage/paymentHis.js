import React from "react";
import Box from "../../components/box";
import Table from "../components/table";

const PaymentHis = ({tenantData}) => {

  console.log(tenantData);

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
          money={`${tenantData?.data?.maintenanceRequests?.length} Active Requests`}
        />
      </div>
      <div>
        <Table tenantData={tenantData}/>
      </div>
    </div>
  );
};

export default PaymentHis;
