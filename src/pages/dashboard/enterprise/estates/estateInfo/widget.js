"use client";
import React, { useState } from "react";
import EstateInfo from "./components/estateInfo.js";
import Photos from "./components/photos.js";
import ContactInfo from "./components/contactInfo.js";
import Documents from "./components/documents.js";
import Image from "next/image.js";
import BankAccountDetails from "./components/bankAccountDetails.js";
const Widget = ({ data, isLoading, id }) => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false); 
  const [activeFive, setActiveFive] = useState(false); 

  const handlePageChange = () => {
    setActive(false);
    setActiveTwo(false);
    setActiveThree(false);
    setActiveFour(false); 
    setActiveFive(false);
  };

  const handlePageChangeTwo = () => {
    setActiveTwo(true);
    setActive(true);
    setActiveThree(false);
    setActiveFour(false); 
    setActiveFive(false);
  };

  const handlePageChangeThree = () => {
    setActiveThree(true);
    setActiveTwo(false);
    setActive(true);
    setActiveFour(false); 
    setActiveFive(false);
  };

  const handlePageChangeFour = () => {
    setActiveFour(true);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
    setActiveFive(false);
  };

  const handlePageChangeFive = () => {
    setActiveFour(false);
    setActiveThree(false);
    setActiveTwo(false);
    setActive(true);
    setActiveFive(true);
  };


  return (
    <div >
      <div className="w-full h-auto pb-4">
        <div className="w-full mt-5 flex justify-between items-center px-8">
          <div className=" flex  gap-4 justify-between w-[800px] cursor-pointer">
            <div
              className={`flex flex-col items-center py-2 px-4 justify-center rounded-md ${
                !active ? "bg-BlueHomz text-white" : "text-BlackHomz "
              }`}
              onClick={(e) => handlePageChange(e)}
              justify-center
            >
              <p className="text-[14px] font-500">Property Information</p>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeTwo ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={(e) => handlePageChangeTwo(e)}
              >
                <p className="text-[14px] font-500">Photo(s)</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeThree ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={(e) => handlePageChangeThree(e)}
              >
                <p className="text-[14px] font-500">Contact Information</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeFour ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={(e) => handlePageChangeFour(e)}
              >
                <p className="text-[14px] font-500">Documents</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
              <div
                className={`flex flex-col py-2 px-4 items-center justify-center rounded-md ${
                  activeFive ? "bg-BlueHomz text-white" : "text-BlackHomz "
                }`}
                onClick={(e) => handlePageChangeFive(e)}
              >
                <p className="text-[14px] font-500">Bank Account Details</p>
              </div>
            </div>
          </div>
          {/* <button className="flex items-center gap-1">
            <Image
              src={"/static/dashboard/enterprisemanager/estate/setting-2.png"}
              height={20}
              width={20}
              alt=""
            />
            <p className="text-BlueHomz text-[14px] font-[400]">
              Manage all documents that will be available to tenants
            </p>
          </button> */}
        </div>
        <div className="my-5 w-full rounded-[12px]">
          <div className={`${!active ? "inline" : "hidden"}`}>
            <EstateInfo active={active} isLoading={isLoading} data={data} />
          </div>
          <div className={`${activeTwo ? "inline" : "hidden"}`}>
            <Photos data={data} />
          </div>
          <div className={`${activeThree ? "inline" : "hidden"}`}>
            <ContactInfo data={data} />
          </div>
          <div className={`${activeFour ? "inline" : "hidden"}`}>
            <Documents id={id} />
          </div>
          <div className={`${activeFive ? "inline" : "hidden"}`}>
            <BankAccountDetails data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
