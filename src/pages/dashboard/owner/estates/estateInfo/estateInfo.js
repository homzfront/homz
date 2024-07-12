"use client";
import React, { useEffect } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import MobileBackButton from "@/components/icons/mobileBackButton";
import { useRouter } from "next/navigation";
import WidgetMobile from "./widgetMobile";
import { useEstateForOneStore } from "@/store/useEstateForOne";

const EstateInfo = ({ id }) => {
  const { data, fetchData } = useEstateForOneStore();
  const route = useRouter()

  const goBack = () => {
    route.back();
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <div className="w-full p-8">
      <div>
        <div>
          <div className='flex w-full md:hidden gap-4 items-center'>
            <div onClick={goBack} className='cursor-pointer'>
              <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                <MobileBackButton />
              </div>
            </div>
            <div className="w-[90%] flex items-center">
              <Link
                href={"/dashboard/property-owner/estates"}
                className="text-[15px] md:text-[16px] truncate font-[400] text-GrayHomz"
              >
                {data?.name ? data?.name : "Property Name"}<> </>/
              </Link>
              <div className="text-[17px] md:text-[20px] font-[500] text-GrayHomz">
                Property Information
              </div>
            </div>
          </div>
          <div className="w-[475px] hidden md:flex gap-2 items-center">
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
              className="text-[14px] w-[80px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] truncate font-[400] text-GrayHomz"
            >
              {data?.name ? data?.name : "Property Name"}<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Information
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <Widget data={data} />
        </div>
        <div className="md:hidden">
          <WidgetMobile data={data}/>
        </div>
      </div>
    </div>
  );
};

export default EstateInfo;
