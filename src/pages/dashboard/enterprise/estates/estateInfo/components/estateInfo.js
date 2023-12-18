"use client";
import React, { useState } from "react";
import Input from "../../../components/input";
import DropDown from "../../../components/dropDown";
import Image from "next/image";

const PropertyInfo = ({handlePageChangeTwo}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  const options = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikeja" },
  ];

  const optionsTwo = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
  ];

  return (
    <div className="">
      <div className="mt-8">
        <h1 className="font-[700] text-[23px] text-BlueHomz">
          Estate Information
        </h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Kindly fill in the accurate estate information
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 py-4 mt-2">
        <div className="w-[100%] flex flex-col gap-3">
          <div>
            <Input
              label={"Estate Name"}
              placeholder={"Estate Name"}
              type={"text"}
              span={"*"}
            />
          </div>
          <div className="flex flex-col justify-between ">
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Estate Location <span className="text-error">*</span>
            </div>
            <div className="flex justify-between ">
              <div>
                <DropDown
                  options={options}
                  onSelect={handleSelect}
                  selectOption={"Select Area"}
                  className={"w-[230px]"}
                />
              </div>
              <div>
                <DropDown
                  options={optionsTwo}
                  onSelect={handleSelect}
                  selectOption={"Select State"}
                  className={"w-[230px]"}
                />
              </div>
            </div>
          </div>
          <div>
            <Input
              label={"Estate Address"}
              placeholder={"Enter Estate Address"}
              type={"text"}
              span={"*"}
            />
          </div>
          <div>
            <Input label={"Estate Size"} placeholder={"0.00"} type={"text"} />
          </div>
          <div>
            <Input
              label={"Total No of Houses In Estate"}
              placeholder={"0"}
              type={"text"}
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
          <div>
            <label className="text-[14px] font-[500] text-BlackHomz ">
              Estate Description <span className="text-error">*</span>
            </label>
            <p className="text-[13px] font-[400] text-GrayHomz ">
              Give short description of your estate.
            </p>
          </div>
          <textarea
            className="mt-4 h-[363px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
            placeholder="Estate Description"
          ></textarea>
        </div>
      </div>
      <div className="mt-[20%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default PropertyInfo;
