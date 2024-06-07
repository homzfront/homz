"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import LoadingII from "@/components/mainmenu/loadingII";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import WidgetMobile from "./widgetMobile";

const Profile = () => {

  const { data, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className="p-8 w-full">
      <p className="font-[500] text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> :
        <div>
          <div className="hidden md:block">
            <Widget data={data} />
          </div>
          <div className="md:hidden">
            <WidgetMobile data={data} />
          </div>
        </div>
      }
    </div>
  );
};

export default Profile;
