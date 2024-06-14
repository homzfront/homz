"use client"
import React, { useEffect } from "react";
import HomeCard from "../components/homeCard";
import RevCard from "../components/revCard";
import TenantsCard from "../components/tenantCard";
import Maintenance from "../components/maintenanceCard";
import Image from "next/image";
import Link from "next/link";
import useTenantOfAnEstate from "@/store/enterpriseStore/useTenantOfAnEstate";
import useEstateForOneStore from "@/store/useEstateForOne";

const Dashboard = ({id}) => {
  const { data: tenantData, loading, fetchData } = useTenantOfAnEstate();
  const { data: datas, fetchData: Fetch } = useEstateForOneStore();

  useEffect(() => {
    fetchData(id);
    Fetch(id)
  }, [id]);

  const data = tenantData?.results?.[0]?.data;
  return (
    <div className="w-full">
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
              href={"/dashboard/enterprise-property/estates"}
              className="text-[14px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/enterprise-property/estates"}
              className="text-[16px] font-[400] text-GrayHomz"
            >
                     {datas?.name ? datas?.name : "Property Name"}<> </>/
       
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Dashboard
            </div>
          </div>
        </div>
        <div className="mt-8 w-[784px] justify-between flex gap-5">
          <HomeCard revData={datas}/>
          <RevCard id={id}/>
        </div>
        <div className="mt-8 flex gap-5">
          <TenantsCard data={data}/>
          <Maintenance data={data} maintData={datas}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
