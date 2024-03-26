"use client"
import React, { useEffect, useState } from "react";
import Card from "./components/estatecard/card";
import HomesCard from "./components/homescard/card";
import RevCard from "./components/revenue/card";
import TenantsCard from "./components/tenants/card";
import Maintenance from "./components/maintenance/card";
import useProfileOwnerMe from "@/store/propertyOwnerStore/useProfileOwnerMe";
import usePropertyOwnerStatsStore from "@/store/propertyOwnerStore/ownerStats";
import usePropertyOwnerRevenueStore from "@/store/propertyOwnerStore/ownerRevenue";
import extractFirstName from "@/utils/extractFirstName";
import ShowKindlyWait from "./components/kindlywait/showKindlyWait";
import useBodyScroll from "@/utils/useBodyScroll";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import useClickOutside from "@/utils/clickOutside";
import LandLordInactiveStore from "@/store/landLordInactiveStore/landLordInactiveStore";

const Dashboard = () => {
  const [showKindlyWait, setShowKindlyWait] = useState(false)
  const dropdownRef = useClickOutside(() => setShowKindlyWait(false));

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

  const { middle, setProfileData } = LandLordInactiveStore();

  useEffect(() => {
    fetchProfileData();
    fetchStatsData();
    fetchRevData()
  }, [])

  useEffect(() => {
    if (profileData) {
      setProfileData(profileData)
      // setShowKindlyWait(true)
    }
  }, [profileData])

  useEffect(() => {
    if (middle === true) {
      setShowKindlyWait(true)

    }
  }, [middle])

  useBodyScroll([middle])

  return (
    <div>
      {showKindlyWait && <ShowKindlyWait dropdownRef={dropdownRef} />}
      <div className="dashboard w-[100%] flex flex-col">
        <div className="p-8 gap-5 flex flex-col w-full">
          <div className="">
            <h1 className="text-[14px] sm:text-[23px] font-[700] text-BlackHomz">
              {profileData?.fullName
                ? ` Hello, ${extractFirstName(capitalizeFirstLetter(profileData?.fullName))}`
                : "Hello"}
            </h1>
            <p className="text-[13px] sm:text-[16px] font-[400] text-GrayHomz2">What will you like to do today?</p>
          </div>
          <div className={`flex flex-col sm:flex-row gap-5 ${middle ? "hidden" : ""} `}>
            <Card data={statsData} />
            <HomesCard statsData={statsData} />
            <RevCard revData={revData} />
          </div>
        </div>
        <div className={`flex flex-col sm:flex-row px-8 gap-5 w-full ${middle ? "hidden" : ""}`}>
          <TenantsCard statsData={statsData} />
          <Maintenance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
