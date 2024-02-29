"use client"
import React, { useEffect } from "react";
import Card from "./components/estatecard/card";
import HomesCard from "./components/homescard/card";
import RevCard from "./components/revenue/card";
import TenantsCard from "./components/tenants/card";
import Maintenance from "./components/maintenance/card";
import useProfileOwnerMe from "@/store/propertyOwnerStore/useProfileOwnerMe";
import usePropertyOwnerStatsStore from "@/store/propertyOwnerStore/ownerStats";
import usePropertyOwnerRevenueStore from "@/store/propertyOwnerStore/ownerRevenue";
import extractFirstName from "@/utils/extractFirstName";

const dashboard = () => {

  const {
    data: profileData,
    loading: profileLoading,
    fetchData: fetchProfileData,
  } = useProfileOwnerMe();
  const {
    data: statsData,
    loading: statsLoading,
    fetchData: fetchStatsData,
  } = usePropertyOwnerStatsStore();

  const { data: revData,
    loading: revLoading,
    fetchData: fetchRevData,
  } = usePropertyOwnerRevenueStore();

  useEffect(() => {
    fetchProfileData();
    fetchStatsData();
    fetchRevData()
  }, [])

  console.log(profileData);
  console.log(statsData);
  console.log(revData);


  return (
    <div className="dashboard w-[100%] flex flex-col">
      <div className="p-8 gap-5 flex flex-col w-full">
        <div className="">
          <h1 className="text-[14px] sm:text-[23px] font-[700] text-BlackHomz">
            {profileData?.fullName
              ? ` Welcome back, ${extractFirstName(profileData?.fullName)}`
              : "Welcome back"}
          </h1>
          <p className="text-[13px] sm:text-[16px] font-[400] text-GrayHomz2">What will you like to do today?</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <Card data={statsData} />
          <HomesCard statsData={statsData} />
          <RevCard revData={revData} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-8 gap-5 w-full">
        <TenantsCard statsData={statsData}/>
        <Maintenance />
      </div>
    </div>
  );
};

export default dashboard;
