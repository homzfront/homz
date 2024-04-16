"use client";
import React, { useEffect } from "react";
import Widget from "./widget";
import LoadingII from "/src/components/mainmenu/loadingII";
import tenantProfile from "/src/store/tenantProfile";

const Profile = () => {
  const { data, loading, fetchData } = tenantProfile();
  
  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);
  
  console.log(data);
  return (
    <div className="px-8 w-[1147px]">
      <p className="font-[500] text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> : <Widget data={data} />}
    </div>
  );
};

export default Profile;
