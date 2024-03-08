"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import DropDown from "../../components/dropDownTwo";
import Image from "next/image";
import AcAndRejModel from "../../components/acAndRejModel";
import SelectArea from "@/pages/selectStateAndArea/selectArea";
import SelectState from "@/pages/selectStateAndArea/selectState";
import useBodyScroll from "@/utils/useBodyScroll";

const PropertyInfo = ({
  handlePageChangeTwo,
  returnToStartRegistration,
  selectedArea,
  selectedState,
  name,
  numberOfHouses,
  description,
  size,
  address,
  setSelectedArea,
  setSelectedState,
  setName,
  setAddress,
  setSize,
  setNumberOfHouses,
  setDescription,
}) => {
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);
  console.log(selectedArea);
  console.log(selectedState);
  console.log(name);
  console.log(numberOfHouses);
  console.log(description);
  console.log(size);
  console.log(address);

  // useEffect to handle scrolling
  useBodyScroll([showCancelDialogue]);

  const handleShowCancelDialogue = () => {
    setShowCancelDialogue(!showCancelDialogue);
  };

  const returnHomeTwo = () => {
    setShowCancelDialogue(false);
  };


  return (
    <div className="px-8">
      <div className="mt-8">
        <h1 className="font-[700] text-[23px] text-BlueHomz">
          Property Information
        </h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Kindly fill in the accurate property information
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 py-4 mt-2">
        <div className="w-[100%] flex flex-col gap-3">
          <div>
            <Input
              label={"Property Name"}
              placeholder={"Property Name"}
              type={"text"}
              span={"*"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between ">
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Location <span className="text-error">*</span>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <SelectState selectedState={selectedState} setSelectedState={setSelectedState} />
              </div>
              <div className={`w-full ${selectedState === null ? "pointer-events-none" : ""}`}>
                <SelectArea state={selectedState?.value} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
              </div>
            </div>
          </div>
          <div>
            <Input
              label={"Street"}
              placeholder={"Enter Property Address"}
              type={"text"}
              span={"*"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <Input
              label={"Property Size"}
              placeholder={"0.00"}
              type={"number"}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div>
            <Input
              label={"Total No of Houses In Property"}
              placeholder={"0"}
              type={"Number"}
              span={"*"}
              value={numberOfHouses}
              onChange={(e) => setNumberOfHouses(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
          <div>
            <label className="text-[14px] font-[500] text-BlackHomz ">
              Property Description
            </label>
            <p className="text-[13px] font-[400] text-GrayHomz ">
              Give short description of your property.
            </p>
          </div>
          <textarea
            className="mt-4 h-[363px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
            placeholder="Property Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <button
            onClick={handleShowCancelDialogue}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz"
          >
            Cancel
          </button>
        </div>
        {!name ||
          !selectedArea ||
          !selectedState ||
          !address ||
          !numberOfHouses ? (
          <div className="">
            <button
              disabled
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
            >
              Next
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={17}
                width={16}
              />
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={handlePageChangeTwo}
              className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
            >
              Next
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                }
                alt=""
                height={16}
                width={16}
              />
            </button>
          </div>
        )}
      </div>
      {showCancelDialogue && (
        <div>
          <AcAndRejModel
            header={"Are you sure you want to cancel?"}
            button={"Yes"}
            buttonTwo={"No, take me back"}
            returnHome={returnToStartRegistration}
            returnHomeTwo={returnHomeTwo}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
