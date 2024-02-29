"use client";
import React, { useEffect } from "react";
import Widget from "./widget";
import LoadingII from "@/components/mainmenu/loadingII";
import tenantProfile from "@/store/tenantStore/tenantProfile";

const Profile = () => {
  const { data, loading, fetchData } = tenantProfile();
  
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  
  console.log(data);
  return (
    <div className="px-8 w-full">
      <p className="font-[500] mt-8 text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> : <Widget data={data} />}
    </div>
  );
};

export default Profile;
