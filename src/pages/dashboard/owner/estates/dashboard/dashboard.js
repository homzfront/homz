"use client"
import React, { useEffect } from "react";
import HomeCard from "../components/homeCard";
import RevCard from "../components/revCard";
import TenantsCard from "../components/tenantCard";
import Maintenance from "../components/maintenanceCard";
import Image from "next/image";
import Link from "next/link";
import MobileBackButton from "@/components/icons/mobileBackButton";
import { useRouter } from "next/navigation";
import { useEstateForOneStore, usePropertyLandlordTenant } from "@/store/enterpriseStore/useEstateForOne";

const Dashboard = ({ id }) => {
  const { data: tenants, fetchData: fetchEstateData } = usePropertyLandlordTenant();
  const { data, fetchData } = useEstateForOneStore();
  const route = useRouter()

  const goBack = () => {
    route.back();
  };
  
  useEffect(() => {
    fetchEstateData(1, id);
    fetchData(id);
  }, []);

  return (
    <div className="w-full">
      <div className="px-8 py-8">
        <div className="mt-4">
          <div className='flex w-full md:hidden gap-4 items-center'>
            <div onClick={goBack} className='cursor-pointer'>
              <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                <MobileBackButton />
              </div>
            </div>
            <div className="w-[90%] flex items-center">
              <Link
                href={"/dashboard/property-owner/estates"}
                className="text-[16px] truncate font-[400] text-GrayHomz"
              >
                {data?.name ? data?.name : "Property Name"}<> </>/
              </Link>
              <div className="text-[20px] font-[500] text-GrayHomz">
                Dashboard
              </div>
            </div>
          </div>
          <div className="hidden w-[475px] md:flex gap-2 items-center">
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[14px] w-[80px] font-[400] text-GrayHomz2 flex items-center gap-1"
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
                }
                alt=""
                height={16}
                width={16}
              />
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] truncate font-[400] text-GrayHomz"
            >
                {data?.name ? data?.name : "Property Name"}<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Dashboard
            </div>
          </div>
        </div>
        <div className="mt-8 w-full md:w-[784px] justify-between flex gap-5">
          <div className="md:w-[50%]">
            <HomeCard Data={data} />
          </div>
          <div className="md:w-[50%]">
            <RevCard id={id} />
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row gap-5">
          <TenantsCard tenants={tenants?.[0]?.data} />
          <Maintenance id={id} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
