"use client"
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/api";

const Property = ({id}) => {

  const  [data, setData] = useState([])
  console.log(id);


  useEffect(()=> {
    const estateData = async () => {
      const response = await api.get(`/properties/${id}`)
      const estate = await response.data;
      setData(estate)
    }
    estateData();
  }, [])

  console.log(data);


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
          <Widget data={data}/>
        </div>
      </div>
    </div>
  );
};

export default Property;
