"use client";
import React, { useState } from "react";
import PropertyDetails from "./components/propertyDetails.js";
import RentDetails from "./components/rentDetails.js";
import Photos from "./components/photos.js";
import ContactDetails from "./components/contactDetails.js";

const Widget = ({data, isLoading}) => {
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
        <div className=" flex mt-5 gap-4 justify-between w-[571px] cursor-pointer">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
                !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChange}
              justify-center
            >
              <p className="text-[14px] font-500">Property Details</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeTwo}
            >
              <p className="text-[14px] font-500">Rent Details</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeThree}
            >
              <p className="text-[14px] font-500">Photos</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                activeFour ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={handlePageChangeFour}
            >
              <p className="text-[14px] font-500">Contact Details</p>
            </div>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <PropertyDetails data={data?.data} isLoading={isLoading}/>
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <RentDetails data={data?.data}/>
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <Photos data={data?.data}/>
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <ContactDetails data={data?.data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
