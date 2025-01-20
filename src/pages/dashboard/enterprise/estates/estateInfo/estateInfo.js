"use client";
import React, { useEffect, useState } from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";
import api from "@/utils/api";
import { fetchEstatesSpecificUSer } from "@/api/estateService";
import { useRouter } from "next/navigation";
import MobileBackButton from "@/components/icons/mobileBackButton";
import WidgetMobile from "./widgetMobile";
import { useEstateForOneStore } from "@/store/enterpriseStore/useEstateForOne";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCSVFileStore from "@/store/document/useCSVFileStore";
import useReturnToBulk from "@/store/document/returnToBulkInvite";

const EstateInfo = ({ id }) => {
  const { data, fetchData } = useEstateForOneStore();
  const route = useRouter()
  const { estateId } = useCSVFileStore();
  const { setReturnToBulk } = useReturnToBulk();

  const goBack = () => {
    route.back();
  };

  const goBackTwo = () => {
    route.push("/dashboard/enterprise-property/estates")
    if (estateId) {
      setReturnToBulk(true);
    }
  }

  useEffect(() => {
    fetchData(id);
  }, []);


  return (
    <div className="w-full">
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
      <div className="w-full">
        <div className="w-full px-8 pt-4">
          <div className='flex w-full md:hidden gap-4 items-center'>
            <div onClick={goBack} className='cursor-pointer'>
              <div className='w-[28px] h-[28px] bg-walletBg rounded-[8px] flex justify-center items-center'>
                <MobileBackButton />
              </div>
            </div>
            <div className="w-[90%] flex items-center">
              <Link
                href={"/dashboard/property-owner/estates"}
                className="text-[14px] truncate font-[400] text-GrayHomz"
              >
                {data?.name ? data?.name : "Property Name"}<> </>/
              </Link>
              <div className="text-[16px] font-[500] text-GrayHomz">
                Property Information
              </div>
            </div>
          </div>
          <div className="w-[575px] hidden md:flex gap-2 items-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
              }
              alt=""
              height={16}
              width={16}
            />
            <div
              onClick={goBackTwo}
              href={""}
              className="text-[14px] w-[90px] font-[400] text-GrayHomz2 cursor-pointer"
            >
              Go Back
            </div>
            <div
              onClick={goBackTwo}
              className="text-[16px] truncate font-[400] text-GrayHomz cursor-pointer"
            >
              {data?.name ? data?.name : "Property Name"}<> </>/

            </div>
            <div className="text-[20px] font-[500] text-GrayHomz">
              Property Information
            </div>
          </div>
        </div>
        <div className="hidden w-full md:flex">
          <Widget data={data} id={id} />
        </div>
        <div className="md:hidden w-full">
          <WidgetMobile data={data} id={id} />
        </div>
      </div>
    </div>
  );



};

export default EstateInfo;
