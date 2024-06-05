"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import LoadingII from "@/components/mainmenu/loadingII";
import useProfileOwnerMe from "@/store/propertyOwnerStore/useProfileOwnerMe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WidgetMobile from "./widgetMobile";

const Profile = () => {
  const { data, loading, fetchData } = useProfileOwnerMe();

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="p-8 w-full">
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
