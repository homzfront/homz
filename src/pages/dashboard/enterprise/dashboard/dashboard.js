"use client";
import React, { useEffect } from "react";
import Card from "./components/estatecard/card";
import HomesCard from "./components/homescard/card";
import RevCard from "./components/revenue/card";
import TenantsCard from "./components/tenants/card";
import Maintenance from "./components/maintenance/card";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import useEnterpriseStatsStore from "@/store/enterpriseStore/enterpriseStats";
import useEnterpriseRevenueStore from "@/store/enterpriseStore/enterpriseRevenue";
import extractFirstName from "@/utils/extractFirstName";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const Dashboard = () => {
  const {
    data: profileData,
    loading: profileLoading,
    fetchData: fetchProfileData,
  } = useProfileEnterpriseMe();
  const {
    data: statsData,
    loading: statsLoading,
    fetchData: fetchStatsData,
  } = useEnterpriseStatsStore();

  const {
    data: revData,
    loading: revLoading,
    fetchData: fetchRevData,
  } = useEnterpriseRevenueStore();

  useEffect(() => {
    fetchProfileData();
    fetchStatsData();
    fetchRevData();
  }, []);

  return (
    <div className="dashboard h-[300px] [100%] flex flex-col">
      <div className="p-8 w-full pr-6 gap-5 flex flex-col">
        <div className="">
          <h1 className="text-[14px] sm:text-[23px] font-[700] text-BlackHomz">
            {profileData?.fullName
              ? ` Welcome back, ${extractFirstName(capitalizeFirstLetter(profileData?.fullName))}`
              : "Welcome back"}
          </h1>
          <p className="text-[13px] sm:text-[16px] font-[400] text-GrayHomz2">
            What will you like to do today?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <Card data={statsData} />
          <HomesCard statsData={statsData}/>
          <RevCard revData={revData}/>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-8 gap-5 w-full">
        <TenantsCard statsData={statsData}/>
        <Maintenance />
      </div>
    </div>
  );
};

export default Dashboard;
