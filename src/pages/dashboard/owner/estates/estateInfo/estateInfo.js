"use client";
import React, { useEffect } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import useEstateForOneStore from "@/store/useEstateForOne";
const EstateInfo = ({id}) => {
  const { data, fetchData } = useEstateForOneStore();

  useEffect(() => {
    fetchData(id);
  }, []);

  console.log(data);

  return (
    <div className="w-full p-8">
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
              href={"/dashboard/property-owner/estates"}
              className="text-[14px] font-[400] text-GrayHomz2"
            >
              Go Back
            </Link>
            <Link
              href={"/dashboard/property-owner/estates"}
              className="text-[16px] font-[400] text-GrayHomz"
            >
   {data?.name ? data?.name : "Property Name"}<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Information
            </div>
          </div>
        </div>
        <div>
          <Widget data={data}/>
        </div>
      </div>
    </div>
  );
};

export default EstateInfo;
