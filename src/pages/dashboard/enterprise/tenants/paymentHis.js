import React from "react";
import Box from "./components/box";
import Table from "./components/table";

const PaymentHis = () => {
  return (
    <div className="">
      <div className="flex gap-4">
        <Box
          bgColor={"successBg"}
          textColor={"Success"}
          type={"Total Payment"}
          money={"N2,500,000"}
        />
        <Box
          bgColor={"warningBg"}
          textColor={"warning2"}
          type={"Pending Rent"}
          money={"N2,500,000"}
          dueDate={"Due date: 4th January, 2024"}
        />
        <Box
          bgColor={"whiteblue"}
          textColor={"BlueHomz"}
          type={"Maintenance"}
          money={"2 Active Requests"}
        />
      </div>
      <div>
        <Table/>
      </div>
    </div>
  );
};

export default PaymentHis;
