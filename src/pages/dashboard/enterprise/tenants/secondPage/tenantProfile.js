"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenant } from "@/api/tenantSevice.js";

const TenantProfile = ({id}) => {
  const  [data, setData] = useState([])
  console.log(id);

  useEffect(()=> {
    const rentInformation = async () => {
      const response = await fetchSpecificTenant(`${id}`)
      const rentInfo = response;
      setData(rentInfo)
    }
    rentInformation();
  }, [])

  console.log(data);

  return (
    <div className="max-w-[1147px] ">
      <div className="w-[1147px]">
        <Image
          alt=""
          src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
          height={204}
          width={1172}
          style={{ height: 'auto', width: 'auto' }}
          
        />
      </div>
      <div className="flex gap-6 mt-[-20px] px-8">
        <div className="w-[350px]">
          <ProfileCard data={data}/>
        </div>
        <div className="">
          <Widget data={data}/>
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
