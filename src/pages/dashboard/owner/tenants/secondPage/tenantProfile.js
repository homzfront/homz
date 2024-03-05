"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenantOwner } from "@/api/tenantSevice.js";

const TenantProfile = ({id}) => {
  const  [data, setData] = useState([])
  console.log(id)

  useEffect(()=> {
    const rentInformation = async () => {
      const response = await fetchSpecificTenantOwner(`${id}`)
      const rentInfo = response;
      setData(rentInfo)
    }
    rentInformation();
  }, [])

  console.log(data);
  return (
    <div className="max-w-full ">
      <div className="w-full">
        <Image
          alt=""
          src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
          height={204}
          width={1172}
          layout="responsive"
          style={{ height: 'auto', width: 'auto' }}
          
        />
      </div>
      <div className="flex gap-6 justify between mt-[-20px] px-8">
        <div className="w-[35%]">
          <ProfileCard data={data}/>
        </div>
        <div className="w-[65%]">
          <Widget data={data}/>
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
