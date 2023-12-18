import React from "react";
import HomeCard from "../components/homeCard";
import RevCard from "../components/revCard";
import Return from "../components/Return";
import TenantsCard from "../components/tenantCard";
import Maintenance from "../components/maintenanceCard";

const Dashboard = () => {
  return (
    <div className="w-[1068px]">
      <div className="px-8 py-8">
        <div className="mt-4">
          <Return
            first={"Go Back"}
            second={"Estate Name"}
            third={"Dashboard"}
            href2={"/dashboard/enterprise-property/estates"}
            href3={""}
            href1={""}
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
