"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenantOwner } from "@/api/tenantSevice.js";
import MobileProfile from "./components/mobileProfile.js";
import LoadingII from "@/components/mainmenu/loadingII.js";
import WidgetKYC from "./components/widgetKYC.js";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";

const TenantProfile = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openKYC, setOpenKYC] = React.useState(false);

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

  const handlePrint = () => {

  }
  const tenantData = []

  return (
    <div className="max-w-full">
      {
        openKYC &&
        <CustomizedModal isOpen={openKYC} onRequestClose={() => setOpenKYC(false)}>
          <WidgetKYC setOpenKYC={setOpenKYC} handlePrint={handlePrint} data={tenantData} />
        </CustomizedModal>
      }
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
                  <ProfileCard data={data} setOpenKYC={setOpenKYC} />
                </div>
                <div className="w-[65%]">
                  <Widget data={data} />
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <MobileProfile
                data={data}
                setOpenKYC={setOpenKYC} />
            </div>
          </div>
      }
    </div>
  );
};

export default TenantProfile;
