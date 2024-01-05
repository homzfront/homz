import React from "react";
import HomeCard from "../components/homeCard";
import RevCard from "../components/revCard";
import TenantsCard from "../components/tenantCard";
import Maintenance from "../components/maintenanceCard";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="w-[1147px]">
      <div className="px-8 py-8">
        <div className="mt-4">
          <div className="w-[475px] flex gap-2 items-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
              }
              alt=""
              height={16}
              width={16}
            />
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[14px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] font-[400] text-GrayHomz"
            >
              Estate Name<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Dashboard
            </div>
          </div>
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
