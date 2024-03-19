"use client"
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  
import { useRouter } from "next/navigation";
import useProfileEnterpriseMe from "@/store/enterpriseStore/useProfileEnterpriseMe";

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

  const { data:profile, loading, fetchData } = useProfileEnterpriseMe();

  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(profile);
  console.log(data);

  return (
    <div className="w-full px-8 py-4 m-auto">
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
        <Widget data={data} profile={profile}/>
      </div>
    </div>
  );
};

export default PricingPlan;
