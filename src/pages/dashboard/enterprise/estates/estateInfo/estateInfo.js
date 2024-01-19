"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import { fetchEstatesSpecificUSer, updateEstateInfo } from "@/api/estateService";
import { useQuery } from "@tanstack/react-query";

const EstateInfo = ({id}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['singleEstate', id],  // Include 'id' in the queryKey
    queryFn: () => fetchEstatesSpecificUSer(id),  // Wrap the function in another function
  });
  console.log(id);
  console.log(isLoading);
  console.log(isError);
    console.log(data);

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return isLoading
  }


  return (
    <div className="w-[1075px] p-8">
      <div>
        <div>
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
              Estate Name<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Estate Information
            </div>
          </div>
        </div>
        <div>
          <Widget data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );


  
};

export default EstateInfo;
