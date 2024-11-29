"use client";
import React, { useEffect, useState } from "react";
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
import useEnterprisePlans from "@/store/enterpriseStore/enterprisePlans";
import { checkPlanLimits } from "@/utils/checkPlanLimits";
import { isTrialExpired } from "@/utils/compareTrialTime";
import ExpiredPlanModal from "../components/expiredPlanModal";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [reachedLimit, setReachedLimit] = useState(null);
  const [openPurchasePlan, setOpenPurchasePlan] = useState(false);
  const router = useRouter();
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

  const { data: enterprisePlans, fetchData: fetchEnterprisePlans } =
    useEnterprisePlans();

  useEffect(() => {
    fetchProfileData();
    fetchStatsData();
    fetchRevData();
    fetchEnterprisePlans();
  }, []);

  useEffect(() => {
    const values = checkPlanLimits(
      enterprisePlans,
      profileData?.planName,
      profileData?.estates?.length,
      profileData?.propertyOwners?.length,
      profileData?.tenants?.length,
      profileData?.IsExpired
    );
    setReachedLimit(values);
  }, [enterprisePlans, profileData]);

  const goToplan = () => {
    router.push("/plans");
  };

  const openAddProperty = () => {
    if (reachedLimit?.reachedMaxEstates) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (reachedLimit?.expiredPlan) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else if (isTrialExpired(profileData?.trialEndDate)) {
      setOpenPurchasePlan(!openPurchasePlan);
    } else {
      router.push("/dashboard/enterprise-property/estates?tab=addProperty");
    }
  };

  return (
    <div className="dashboard h-[300px] [100%] flex flex-col">
      {openPurchasePlan && reachedLimit?.enterprisePlanName === "Enterprise Free" && !reachedLimit?.expiredPlan && isTrialExpired(profileData?.trialEndDate) && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={"Your Trial Has Ended"}
            body={
              "Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."
            }
            button={"Buy Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      )}
      {openPurchasePlan && !reachedLimit?.expiredPlan && reachedLimit?.reachedMaxEstates && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={"Property Limit Exceeded"}
            body={
              "Don’t miss out! Buy a plan now to continue enjoying uninterrupted access to all features."
            }
            button={"Upgrade Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      )}
      {openPurchasePlan && reachedLimit?.expiredPlan && (
        <div className="absolute top-0 z-20 h-screen px-8 md:px-0 w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <ExpiredPlanModal
            header={`${reachedLimit?.enterprisePlanName} Plan Expired`}
            body={`Your ${reachedLimit?.enterprisePlanName} ${reachedLimit?.interval} plan has expired. Renew now to continue enjoying all features!`}
            button={"Upgrade Plan"}
            buttonTwo={"close"}
            returnHome={goToplan}
            returnHomeTwo={() => setOpenPurchasePlan(false)}
          />
        </div>
      )}
      <div className="p-8 w-full md:pr-6 gap-5 flex flex-col">
        <div className="">
          <h1 className="text-[14px] md:text-[23px] font-[700] text-BlackHomz">
            {profileData?.fullName
              ? ` Welcome back, ${extractFirstName(
                capitalizeFirstLetter(profileData?.fullName)
              )}`
              : "Welcome back"}
          </h1>
          <p className="text-[13px] md:text-[16px] font-[400] text-GrayHomz2">
            What will you like to do today?
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <Card data={statsData} openAddProperty={openAddProperty} />
          <HomesCard statsData={statsData} />
          <RevCard revData={revData} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row px-8 gap-5 w-full">
        <TenantsCard statsData={statsData} />
        <Maintenance />
      </div>
    </div>
  );
};

export default Dashboard;
