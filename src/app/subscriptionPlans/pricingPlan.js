"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";
import useStorePropertyIds from "@/store/propertyIds";

const PricingPlan = () => {
  const router = useRouter();
  const resetPropertyIds = useStorePropertyIds((state) => state.resetPropertyIds);

  const goBack = () => {
    resetPropertyIds();
    router.back();
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("enterData");
      setData(JSON.parse(storedData));
    }
  }, []);
 
  const { data: profile, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" w-full px-8 py-4 m-auto mt-3">
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
      {/* <button onClick={goBack}>
      <Image src={"/Link (1).png"} alt="Back" height={25} width={85} />
    </button> */}

      <div className=" m-aut mb-10 space-y-2 mt-2">
        <div className="flex sm:flex-row flex-col ">
          <div className="w-fit flex md:justify-between items-center gap-[4rem] md:gap-0 ">
            <div
              onClick={goBack}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Image
               src="/static/images/blue-arrow-left2.svg"
                height={16}
                width={16}
                alt=""
                className=""
              />
              <p className="text-[14px] font-[400]  text-[#559CFF]">
                Go Back
              </p>
            
            </div>
          </div>
          <h2 className="  text-BlueHomz text-[18px]  text-center font-[500] mx-auto mt-3">
            Subscription Plan
          </h2>
        </div>
        <h1 className="text-[23px] sm:text-[36px] text-center font-[700]">
          Boost Your Property's Visibility Today!
        </h1>
        <p className="text-[18px] sm:text-[20px] leading-[30px] text-center text-[#4E4E4E] font-[500]">
          Choose the Perfect Promotion Plan to Attract More Buyers and Renters
        </p>
      </div>

      <div>
        <Widget data={data} profile={profile}  />
      </div>
    
    </div>
  );
};

export default PricingPlan;
