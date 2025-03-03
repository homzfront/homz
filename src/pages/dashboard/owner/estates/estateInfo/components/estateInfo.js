"use client";
import React, { useState } from "react";


const PropertyInfo = ({ data }) => {
  if (data === undefined) {
    return;
  }

  return (
    <div className="">
      <p className="md:hidden font-[700] text-[16px] text-BlueHomz">
        Property Information
      </p>
      <div className="mt-4 md:mt-8 rounded-[12px] text-[13px] md:text-[16px] font-[400] text-GrayHomz h-auto w-full md:bg-inputBg flex flex-col gap-2 md:p-8 justify-between md:min-w-[800px]">
        <div className="flex gap-2 py-2 md:py-0 border-b md:border-none items-center w-full">
          <p className="w-[40%]">Property Name</p>
          <p className="w-[55%] font-[500] text-BlackHomz">{data?.name ? data?.name : "[Property Name]"}</p>
        </div>
        <div className="flex gap-2 py-2 md:py-0 border-b md:border-none items-center w-full">
          <p className="w-[40%]">Property Location</p>
          <p className="w-[55%] font-[500] text-BlackHomz">{data?.location?.area ? `${data?.location?.area, data?.location?.state}` : "[Area], [State]"}</p>
        </div>
        <div className="flex gap-2 py-2 md:py-0 border-b md:border-none items-center w-full">
          <p className="w-[40%]">Property Address</p>
          <p className="w-[55%] font-[500] text-BlackHomz">{data?.address ? data?.address : "[Property Address]"}</p>
        </div>
        <div className="flex gap-2 py-2 md:py-0 border-b md:border-none items-center w-full">
          <p className="w-[40%]">Property Size</p>
          <p className="w-[55%] font-[500] text-BlackHomz">{data?.size ? `${data?.size} Sqm` : "0.00 Sqm"}</p>
        </div>
        <div className="flex gap-2 py-2 md:py-0 border-b md:border-none items-center w-full">
          <p className="w-[40%]">Total No of Apartments in Property</p>
          <p className="w-[55%] font-[500] text-BlackHomz">{data?.numberOfHouses ? data?.numberOfHouses : "[Number of apartments]"}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 py-2 md:py-0 border-b md:border-none md:items-center w-full">
          <p className="md:w-[40%]">Property Description</p>
          <p className="w-[55%] font-[500] md:w-[58%] text-BlackHomz">{data?.description ? data?.description : "[Description entered by property manager]"}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
