"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget.js";
import ProfileCard from "./profileCard.js";
import Image from "next/image.js";
import { fetchSpecificTenant } from "@/api/tenantSevice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingII from "@/components/mainmenu/loadingII.js";


const TenantProfile = ({ id }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const rentInformation = async () => {
    const response = await fetchSpecificTenant(`${id}`)
    const rentInfo = response;
    setData(rentInfo)
    if (rentInfo) {
      setLoading(false);
    }
  }


  useEffect(() => {
    rentInformation();
  }, [])


  return (
    <div className="max-w-full">
      {
        loading ? <LoadingII /> :
          <div className="w-full">
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeButton={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <div className="w-full">
              <Image
                alt=""
                src={"/static/dashboard/enterprisemanager/tenants/Header.png"}
                height={204}
                width={1172}
                style={{ height: 'auto', width: 'auto' }}

              />
            </div>
            <div className="w-full flex gap-6 mt-[-20px] px-8">
              <div className="w-[35%]">
                <ProfileCard data={data} />
              </div>
              <div className="w-[65%]">
                <Widget data={data} rentInformation={rentInformation} />
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default TenantProfile;
