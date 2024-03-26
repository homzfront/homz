"use client";
import React, { useEffect } from "react";
import Widget from "./widget";
import LoadingII from "@/components/mainmenu/loadingII";
import tenantProfile from "@/store/tenantStore/tenantProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { data, loading, fetchData } = tenantProfile();

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <div className="px-8 w-full">
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
      <p className="font-[500] mt-8 text-[20px] text-GrayHomz">Profile</p>
      {loading ? <LoadingII /> : <Widget data={data} />}
    </div>
  );
};

export default Profile;
