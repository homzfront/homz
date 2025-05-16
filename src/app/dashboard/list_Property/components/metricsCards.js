"use client";
import Image from "next/image";
import { React, useEffect, useState } from "react";
import api from "@/utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import AlermOrange from "@/components/icons/alermOrange";
import Link from "next/link";

const UpperMetrics = ({ isBusinessInfoUpdate }) => {
  const { data: metricsData } = useQuery({
    queryKey: ["metric"],
    queryFn: async () => {
      return await api.get(`/properties/property/metric`);
    },
    placeholderData: keepPreviousData,
    select: (metric) => {
      return metric.data.data;
    },
    // enabled: true,
  });

  const metricsStructure = [
    {
      name: "Listings",
      image: "buliding",
      aka: "totalListing",
    },
    {
      name: "Call Clicks",
      image: "mouse-circle",
      aka: "totalCallClicks",
    },
    {
      name: "WhatsApp Messages",
      image: "blue-whatsapp",
      aka: "totalMessages",
    },
    {
      name: "Views",
      image: "blue-eye",
      aka: "totalViews",
    },
  ];

  const combinedMetrics = metricsStructure.map((metric) => ({
    ...metric,
    value: metricsData?.[metric.aka] ?? 0,
  }));
  return (
    <div className="w-full mx-auto space-y-5">
      <p className="font-[500] text-[20px] py-2">Dashboard</p>
      {isBusinessInfoUpdate && (
        <div className="flex gap-2 items-center sm:pr-6">
          <div className="sm:block hidden">
            <AlermOrange />
          </div>
          <div className="w-full bg-[#FCF3EB] text-black py-[8px] flex px-[16px] rounded-xl overflow-hidden cursor-pointer">
            <div className="w-full py-[8px] flex sm:items-center sm:justify-between items-start px-[16px] rounded-xl overflow-hidden cursor-pointer sm:flex-row flex-col">
              <p className="font-[500] sm:eading-[150%] sm:text-[16px]">
                Help potential clients reach you easily! Update your business
                information now.
              </p>
              <Link
                href="/dashboard/list_Property/Profile?tab=business"
                className="flex gap-[8px] text-[#DC6803] rounded-[2.82px] py-[8.45px] sm:px-[16px] items-center justify-center text-[14px]"
              >
                <span>Update Now</span>
                <span>
                  <Image
                    src={`/static/images/arrow-right-orange.svg`}
                    alt=""
                    width={16}
                    height={16}
                    className="w-[16px] h-[16px]"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-4 grid-cols-2 gap-[12px] sm:pr-4 mx-auto ">
        {combinedMetrics.map((item, ind) => (
          <div
            className="sm:w-[228px] w-full sm:h-[110px] h-full rounded-[8px] gap-[10px] flex flex-col items-start justify-start p-[16px] border border-[#94a0b1]"
            key={ind}
            style={{
              background: item.name === "Listings" ? "#EEF5FF" : "#F6F6F6",
            }}
          >
            <p className="sm:text-[16px] text-[14px] font-[500] leading-[150%] text-[#202020]">
              {item.value}
            </p>

            <div className="flex items-center justify-between w-full">
              <p className="font-[500] text-[13px] sm:leading-[150%] leading-[120%] text-[#4E4E4E]">
                Total <br />
                {item.name}
              </p>
              <p
                className="w-[48px] h-[48px] rounded-[24px] flex items-center justify-center p-[12px]"
                style={{
                  background: item.name === "Listings" ? "#006AFF" : "#FFFFFF",
                }}
              >
                <Image
                  src={`/static/images/${item.image}.svg`}
                  alt=""
                  width={20}
                  height={20}
                  className="w-[24px] h-[24px]"
                />
              </p>
            </div>
          </div>
        ))}

        {/* <div className=""></div> */}
      </div>
    </div>
  );
};
export default UpperMetrics;
