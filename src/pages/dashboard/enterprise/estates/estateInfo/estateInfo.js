"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import api from "/src/utils/api";
import { fetchEstatesSpecificUSer } from "/src/api/estateService";

const EstateInfo = ({id}) => {
  const  [data, setData] = useState([])
  console.log(id);


  useEffect(()=> {
    const estateData = async () => {
      const response = await fetchEstatesSpecificUSer(id)
      const estate = await response;
      setData(estate)
    }
    estateData();
  }, [])

  console.log(data);

  return (
    <div className="w-[1147px] p-8">
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
              Property Name<> </>/
            </Link>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Information
            </div>
          </div>
        </div>
        <div>
          <Widget data={data} />
        </div>
      </div>
    </div>
  );


  
};

export default EstateInfo;
