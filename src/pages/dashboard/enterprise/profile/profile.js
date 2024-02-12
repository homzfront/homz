"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import { enterpriseMe } from "@/api/enterpriseManagerService";
import LoadingII from "@/components/mainmenu/loadingII";
import useProfileEnterpriseMe from "@/store/useProfileEnterpriseMe";

const Profile = () => {
  
  const {data, loading, fetchData} = useProfileEnterpriseMe();
  
  useEffect(()=>{
    fetchData();
  },[])
  
  console.log(data);
  return (
    <div className="p-8 w-[1147px]">
      <p className="font-[500] text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> : <Widget data={data} />}
    </div>
  );
};

export default Profile;
