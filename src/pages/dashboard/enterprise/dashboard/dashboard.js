import React from "react";
import Card from "./components/estatecard/card";
import HomesCard from "./components/homescard/card";
import RevCard from "./components/revenue/card";
import TenantsCard from "./components/tenants/card";
import Maintenance from "./components/maintenance/card";

const dashboard = () => {
  return (
    <div className="dashboard h-[300px] max-w-[100%] grid grid-flow-col">
      <div className="p-8 w-[1081px] pr-6 gap-5 flex flex-col">
        <div className="">
          <h1 className="text-[23px] font-[700] text-BlackHomz">
            Welcome back, Victor
          </h1>
          <p className="text-[16px] font-[400] text-GrayHomz2">What will you like to do today?</p>
        </div>
        <div className="flex gap-5">
          <Card />
          <HomesCard />
          <RevCard />
        </div>
      </div>
      <div className="flex px-8 w-[1081px] pr-6 gap-5 border-gray">
        <TenantsCard />
        <Maintenance />
      </div>
    </div>
  );
};

export default dashboard;
