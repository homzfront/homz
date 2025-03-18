"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useProfileListingMe from "@/store/listingStore/subscriptionStatus";
import useStorePropertyPromotionData from "@/store/propertyPromotions";

const PricingPlan = () => {
  const router = useRouter();
  const resetPropertyIds = useStorePropertyPromotionData(
    (state) => state.resetPropertyIds
  );

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

  const { data: profile, loading, fetchData } = useProfileListingMe();

  useLayoutEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full max-w-[1440px] px-8 py-4 mx-auto mt-3">
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

      <div className="mx-auto mb-10 space-y-2 mt-2">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="flex items-center gap-16 md:gap-0">
            <div
              onClick={goBack}
              className="flex gap-1 items-center cursor-pointer"
            >
              <Image
                src="/static/images/blue-arrow-left2.svg"
                height={16}
                width={16}
                alt=""
              />
              <p className="text-[0.875rem] font-normal text-[#559CFF]">
                Go Back
              </p>
            </div>
          </div>
          <h2 className="text-BlueHomz text-[1.125rem] text-center font-medium mx-auto mt-3">
            Subscription Plan
          </h2>
        </div>
        <h1 className="text-[1.5rem] sm:text-[2.25rem] text-center font-bold">
          Boost Your Property's Visibility Today!
        </h1>
        <p className="text-[1.125rem] sm:text-[1.25rem] leading-[1.875rem] text-center text-[#4E4E4E] font-medium">
          Choose the Perfect Promotion Plan to Attract More Buyers and Renters
        </p>
      </div>

      <div>
        <Widget data={data} profile={profile} />
      </div>
    </div>
  );
};

export default PricingPlan;
