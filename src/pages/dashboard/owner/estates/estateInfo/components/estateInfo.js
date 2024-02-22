"use client";
import React, { useState } from "react";


const PropertyInfo = ({data}) => {
  if (data === undefined) {
    return;
  }
  console.log(data);
  return (
    <div className="">
      <div className="mt-8 rounded-[12px] text-[16px] font-[400] text-GrayHomz h-[351px] w-[1108px] bg-inputBg flex flex-col gap-2 p-8 justify-between">
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Name</p>
          <p className="font-[500] text-BlackHomz">{data?.name ? data?.name : "[Property Name]"}</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Location</p>
          <p className="font-[500] text-BlackHomz">{data?.location?.area ? `${data?.location?.area, data?.location?.state}` : "[Area], [State]"}</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Address</p>
          <p className="font-[500] text-BlackHomz">{data?.address ? data?.address : "[Property Address]"}</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Size</p>
          <p className="font-[500] text-BlackHomz">{data?.size ? `${data?.size} Sqm` : "0.00 Sqm"}</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Total No of Apartments in Property</p>
          <p className="font-[500] text-BlackHomz">{data?.numberOfHouses ? data?.numberOfHouses : "[Number of apartments]"}</p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <p className="w-[40%]">Property Description</p>
          <p className="font-[500] w-[58%] text-BlackHomz">{data?.description ? data?.description : "[Description entered by property manager]"}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
