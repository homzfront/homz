"use client"
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import { fetchSingleProperty } from "@/api/propertyService";
import { useQuery } from "@tanstack/react-query";

const Property = ({id}) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['singleProperty', id],  // Include 'id' in the queryKey
    queryFn: () => fetchSingleProperty(id),  // Wrap the function in another function
  });

  console.log(id);
  console.log(data);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return isLoading
  }

  return (
    <div className="w-[1147px] p-8">
      <div>
        <div className="flex justify-between items-center">
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
              href={"/dashboard/property-owner/propertylisting"}
              className="text-[14px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/propertylisting"}
              className="text-[16px] font-[400] text-GrayHomz"
            >
              Property Name<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Details
            </div>
          </div>
          <p className="text-[14px] font-[400] text-BlueHomz">See public view</p>
        </div>
        <div>
          <Widget data={data} isLoading={isLoading}/>
        </div>
      </div>
    </div>
  );
};

export default Property;
