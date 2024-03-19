"use client"
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import { fetchSingleProperty } from "@/api/propertyService";
import { useRouter } from "next/navigation";

const Property = ({ id }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [data, setData] = useState([])
  console.log(id);


  useEffect(() => {
    const estateData = async () => {
      const response = await fetchSingleProperty(id);
      const estate = await response;
      setData(estate)
    }
    estateData();
  }, [])

  console.log(data);


  return (
    <div className="w-full p-8">
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
            <div
              onClick={goBack}
              className="text-[14px] font-[400] text-GrayHomz2 cursor-pointer"
            >
              Go Back
            </div>
            <div
              onClick={goBack}
              className="text-[16px] font-[400] text-GrayHomz cursor-pointer"
            >
              {data?.data?.name ? data?.data?.name : "Property Name"}<> </>/
            </div>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Details
            </div>
          </div>
          {/* <p className="text-[14px] font-[400] text-BlueHomz">See public view</p> */}
        </div>
        <div>
          <Widget data={data} />
        </div>
      </div>
    </div>
  );
};

export default Property;
