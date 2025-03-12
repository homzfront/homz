"use client";
import React from "react";
import Maintenance from "./maintenance/card";
import RentFirst from "./rent-first/rentFirst";
import RentSecond from "./rent-second/rentSecond";
import BillPayment from "./billPayment/billPayment";
// import tenantProfile from "@/store/tenantStore/tenantProfile";
import extractFirstName from "@/utils/extractFirstName";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Loading from "@/components/mainmenu/loading";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import MiniAvatar from "@/components/icons/miniAvatar";
import ArrowSmallBlueWithDownDash from "@/components/icons/arrowSmallBlueWithDownDash";
import { checkMissingFields } from "@/utils/checkMissingFields";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter()
  const {
    data
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await api.get("/tenants/me");
    },
    placeholderData: keepPreviousData,
    select: (users) => {
      return users.data.data;
    },
    // enabled: enable,
  });

  const { isPending, data: rentData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await api.get(`/rentInformation/tenant`);
    },
    placeholderData: keepPreviousData,
    select: (users) => {
      return users.data.data;
    },
    // enabled: enable,
  });

  const result = checkMissingFields(data);
  
  return (
    <div className={`${isPending && "animate-pulse pointer-events-none"} dashboard h-[300px] w-full flex flex-col`}>
      <div className="p-8 w-full pr-6 gap-5 flex flex-col">

        <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between">
          <div className="">
            <h1 className="text-[14px] sm:text-[23px] font-[700] text-BlackHomz">
              {data?.fullName
                ? `Hello, ${extractFirstName(
                  capitalizeFirstLetter(data?.fullName)
                )}`
                : "Hello"}
            </h1>
            <p className="text-[13px] sm:text-[16px] font-[400] text-GrayHomz2">
              What will you like to do today?
            </p>
          </div>
          <div className="md:w-[450px] bg-[#F6F6F6] p-3 text-[13px] leading-[19.5px] font-medium rounded-[12px]">
            <div className="flex gap-3 items-center">
              <div className="w-[33px] h-[33px] bg-white rounded-full flex justify-center items-center">
                <MiniAvatar />
              </div>
              <p className="text-BlackHomz">Profile Completion</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <div className="md:w-[70%] h-[16px] bg-white rounded-[8px]">
                <div className={`text-white font-[11px] h-full flex justify-center items-center rounded-[8px] bg-BlueHomz`} style={{ width: `${result?.donePercentage?.toFixed(0)}%` }}>
                  {result?.donePercentage > 12 ? `${result?.donePercentage.toFixed(0)}%` : "" }
                </div>
              </div>
              <button onClick={()=>router.push("/dashboard/tenant/profile?tab=personalInfo")} className="md:w-[30%] flex items-center gap-1 text-BlueHomz">
                Complete Profile <ArrowSmallBlueWithDownDash />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <RentFirst data={rentData} />
          <RentSecond />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row px-8 w-full pr-6 gap-5">
        <BillPayment />
        <Maintenance />
      </div>
    </div>
  );
};

export default Dashboard;
