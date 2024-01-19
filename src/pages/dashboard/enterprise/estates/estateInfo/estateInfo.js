"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/api";
import { fetchEstatesSpecificUSer, updateEstateInfo } from "@/api/estateService";
import { useMutation, useQuery } from "react-query";

const EstateInfo = ({id}) => {
  const { data, isLoading, isError } = useQuery('singleEstate', () => fetchEstatesSpecificUSer(id));
  

  console.log(id);

  if (isError) {
    return <div>Error fetching data</div>;
  }


console.log(isLoading);
console.log(isError);
  console.log(data);

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
          <Widget data={data} />
        </div>
      </div>
    </div>
  );


  
};

export default EstateInfo;
