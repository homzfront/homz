"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenantOwner } from "@/api/tenantSevice.js";
import MobileProfile from "./components/mobileProfile.js";
import LoadingII from "@/components/mainmenu/loadingII.js";

const TenantProfile = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rentInformation = async () => {
      const response = await fetchSpecificTenantOwner(`${id}`)
      const rentInfo = response;
      setData(rentInfo)
      if (rentInfo) {
        setLoading(false);
      }
    }
    rentInformation();
  }, [])

  return (
    <div className="max-w-full">
      {
        loading ? <LoadingII /> :
          <div className="w-full">
            <div className="hidden md:block">
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
              <div className="w-full flex gap-6 justify between mt-[-20px] px-8">
                <div className="w-[35%]">
                  <ProfileCard data={data} />
                </div>
                <div className="w-[65%]">
                  <Widget data={data} />
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <MobileProfile data={data} />
            </div>
          </div>
      }
    </div>
  );
};

export default TenantProfile;
