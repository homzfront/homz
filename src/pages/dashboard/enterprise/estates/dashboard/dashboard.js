import React from "react";
import HomeCard from "../components/homeCard";
import RevCard from "../components/revCard";
import TenantsCard from "../components/tenantCard";
import Maintenance from "../components/maintenanceCard";
import ToggleReturn from "../components/Return";

const Dashboard = () => {
  return (
    <div className="w-[1068px]">
      <div className="px-8 py-8">
        <div className="mt-4">
          <ToggleReturn
            first={"Go Back"}
            second={"Estate Name"}
            third={"Dashboard"}
            href2={"/dashboard/enterprise-property/estates"}
            href1={"/dashboard/enterprise-property/estates"}
          />
        </div>
        <div className="mt-8 w-[784px] justify-between flex gap-5">
          <HomeCard />
          <RevCard />
        </div>
        <div className="mt-8 flex gap-5">
          <TenantsCard />
          <Maintenance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
