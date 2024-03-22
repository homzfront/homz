"use client"
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import api from "@/utils/api";


const PricingPlan = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const [data, setData] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('enterData');
      console.log(storedData);
      setData(JSON.parse(storedData));
    }
  }, []);

  const { data: profile, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData(); // Fetch profile data (likely server-side)

    const handleProfileResponse = async () => {
      const profileResponse = await api.get("/user/profile"); // Fetch profile data (client-side)

      if ([200, 201].includes(profileResponse.status)) { // Handle expected success status codes
        const profileData = profileResponse.data;
        console.log(profile); // Log fetched profile data
        const determineUserDashboard = (profileData) => {
          // Check if profileData is null or undefined
          if (profileData === null || profileData === undefined) {
            return;
          } else {
            // Check if profileData.user and profileData.user.accounts are defined
            if (profileData.user && profileData.user.accounts && profileData.user.accounts.length > 0) {
              // Check if the first account's name is "ENTERPRISE_PLAN"
              if (profileData.user.accounts[0].name === "ENTERPRISE_PLAN") {
                return "/dashboard/enterprise-property/dashboard";
              }
            }
          }
        };
        const navigateTo = determineUserDashboard(profileData); // Helper function for cleaner logic
        if (navigateTo) {
          router.push(navigateTo);
        }
      } else {
        console.error("Error fetching profile data:", profileResponse.statusText); // Handle errors
      }
    };

    // Ensure client-side execution (consider using `useClient` if necessary)
    if (typeof window !== 'undefined') {
      handleProfileResponse();
    }

    // Cleanup function (optional, in case you need to cancel requests, etc.)
    return () => {
      // ...cleanup tasks here
    };
  }, []);


  console.log(profile);
  console.log(data);

  return (
    <div className="max-w-[1440px] w-full px-8 py-4 m-auto">
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
      <button onClick={goBack}>
        <Image src={"/Link (1).png"} alt="Back" height={25} width={85} />
      </button>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[897px] m-auto mb-10 flex flex-col items-center gap-3">
          <h2 className="  text-BlueHomz text-[18px]  text-center font-[500]">
            Pricing
          </h2>
          <h1 className="text-[23px] sm:text-[36px] text-center font-[700]">
            Simple, transparent pricing
          </h1>
          <p className="text-[18px] sm:text-[20px] text-center text-GrayHomz font-[500]">
            We believe our enterprise plans should be accessible to all
            property managers.
          </p>
        </div>
      </div>
      <div>
        <Widget data={data} profile={profile} />
      </div>
    </div>
  );
};

export default PricingPlan;
