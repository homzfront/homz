"use client";
import React, { useState } from "react";
import EstateInfo from "./components/estateInfo.js";
import Photos from "./components/photos.js";
import ContactInfo from "./components/contactInfo.js";
import Documents from "./components/documents.js";
import Image from "next/image.js";

const Widget = ({ data, isLoading }) => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false); // State for the fourth page

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
    setActiveFour(false); // Reset the state for the fourth page
  };

  const handlePageChangeFour = () => {
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
  };

  return (
    <div>
      <div className="w-full h-auto py-4">
        <div className="w-full mt-5 flex justify-between items-center">
          <div className=" flex  gap-4 justify-between w-[620px] cursor-pointer">
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
                  !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={handlePageChange}
                justify-center
              >
                <p className="text-[14px] font-500">Property Information</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={handlePageChangeTwo}
              >
                <p className="text-[14px] font-500">Photo(s)</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={handlePageChangeThree}
              >
                <p className="text-[14px] font-500">Contact Information</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeFour ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={handlePageChangeFour}
              >
                <p className="text-[14px] font-500">Documents</p>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1">
            <Image src={"/static/dashboard/enterprisemanager/estate/setting-2.png"} height={20} width={20} alt=""/>
            <p className="text-BlueHomz text-[14px] font-[400]">
            Manage all documents that will be available to tenants
            </p>
          </button>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <EstateInfo active={active} isLoading={isLoading} data={data} />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <Photos data={data?.data} />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <ContactInfo />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <Documents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
