"use client"
import Image from "next/image";
import React, { useState } from "react";
import DropDown from "./components/dropDown";
import EstateForm from "./estateForm";

const estate = () => {
  const [registrationForm, setRegistrationForm] = useState(false);
  const openRegistrationForm = () => {
    setRegistrationForm(true);
  };

  return (
    <div>
      {registrationForm ? (
        
        <EstateForm/>
      ) : (
        <div className="w-[1081px] p-8">
          <div className=" flex justify-between  items-center">
            <div className="flex gap-1">
              <p>Estates</p>
              <span className="bg-whiteblue w-6 h-6 flex justify-center ">
                <span className="text-BlueHomz ">0</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[16px] font-[400] text-BlackHomz">
                Filter by:{" "}
              </p>
              <DropDown />

              <input
                type="date"
                className="border items-center gap-4 flex text-GrayHomz2 px-4 h-10 w-[120px] mb-1 p-2 rounded cursor-pointer"
              />
              <button className="border border-BlueHomz items-center gap-4 flex text-BlueHomz  px-4 h-10 w-[120px] mb-1 p-2 rounded cursor-pointer">
                <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                    }
                    alt=""
                    height={17}
                    width={16}
                  />
                </span>
                Reset
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="text-[41px] font-[700] text-BlueHomz">
              Get Started
            </h1>
            <p className="text-[18px] font-[400] text-GrayHomz">
              Add your estates so your Tenants can see them
            </p>

            <button
              onClick={openRegistrationForm}
              className="p-[12px] w-[185px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[16px] font-[700]"
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                }
                alt=""
                width={16}
                height={16}
              />
              Add New Estates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default estate;
