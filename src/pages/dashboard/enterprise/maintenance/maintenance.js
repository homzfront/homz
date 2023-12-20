import React from "react";
import Filter from "./components/filter";
import Box from "../components/box";
import MaintenanceTable from "./components/maintenanceTable";

const Maintenance = () => {
  return (
    <div className="relative block w-[1080px] p-8">
      <div className="">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-[500] text-BlackHomz">Maintenance</p>
          <Filter />
        </div>
        <div className="absolute border-t w-full left-0 top-[105px]">
        </div>
        <div className="flex gap-4 mt-[70px]">
          <Box
            type={"Total Requests"}
            money={"200"}
            border={"border-BlueHomz"}
            textColor={"text-BlueHomz"}
            textColor2={"text-BlueHomz"}
            bgColor={"whiteblue"}
          />
          <Box
            type={"Pending Request"}
            money={"100"}
            border={"border-warning2"}
            textColor={"text-warning2"}
            textColor2={"text-BlackHomz"}
            bgColor={"warningBg"}
          />
          <Box
            type={"Resolved Requests"}
            money={"100"}
            border={"border-Success"}
            textColor={"text-Success"}
            textColor2={"text-BlackHomz"}
            bgColor={"successBg"}
          />
        </div>

        <div>
          <MaintenanceTable/>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
