"use client";
import React, { useState } from "react";
import PropertyInfo from "./propertyInfo.js";
import RentDetails from "./rentDetails.js";
import ContactInfo from "./contactInfo.js";
import AddPictures from "./addPictures.js"


const Widget = () => {
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
      <div className="inline-block w-[1147px] h-auto py-4">
        <div className="z-0 absolute w-[1147px] pr-[96px] pl-[96px] py-[27px]">
          <div className="border-[1px]"></div>
        </div>
        <div className="z-1 relative flex mt-5 gap-4 justify-between px-8 cursor-pointer w-[1147px]">
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col items-center p-2 justify-center ${
                !active
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChange}
              justify-center
            >
              <div
                className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Property Information</p>
          </div>

          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeTwo
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeTwo}
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Rent Details</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeThree
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeThree}
            >
              <div
                className={`rounded-full w-[1px] h-[1px] bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Add Photo(s)</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <div
              className={`flex flex-col p-2 items-center justify-center ${
                activeFour
                  ? " bg-white rounded-full  w-1 h-1 shadow-md "
                  : "h-1 w-1"
              }`}
              onClick={handlePageChangeFour}
            >
              <div
                className={`rounded-full w-[1px] h-[1px]  bg-BlueHomz p-1 text-[14px] font-[500] text-center`}
              ></div>
            </div>
            <p className="text-[14px] font-400">Contact Information</p>
          </div>
        </div>
        <div className=" my-5  rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <PropertyInfo
              active={active}
              handlePageChangeTwo={handlePageChangeTwo}
            />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <RentDetails
              handlePageChangeThree={handlePageChangeThree}
              handlePageChange={handlePageChange}
            />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <AddPictures
              handlePageChangeTwo={handlePageChangeTwo}
              handlePageChangeFour={handlePageChangeFour}
            />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <ContactInfo handlePageChangeThree={handlePageChangeThree} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
