"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import DropDown from "../../components/dropDownTwo";
import Image from "next/image";
import AcAndRejModel from "../../components/acAndRejModel";

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

  const handleSelectArea = (option) => {
    setSelectedArea(option);
  };

  const handleSelectState = (option) => {
    setSelectedState(option);
  };

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = showCancelDialogue ? "hidden" : "auto";
    if (showCancelDialogue) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [showCancelDialogue]);

  const handleShowCancelDialogue = () => {
    setShowCancelDialogue(!showCancelDialogue);
  };

  const returnHomeTwo = () => {
    setShowCancelDialogue(false);
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
            <div className="flex justify-between ">
              <div>
                <DropDown
                  options={options}
                  onSelect={handleSelectArea}
                  selectOption={"Select Area"}
                  className={"w-[230px]"}
                />
              </div>
              <div>
                <DropDown
                  options={optionsTwo}
                  onSelect={handleSelectState}
                  selectOption={"Select State"}
                  className={"w-[230px]"}
                />
              </div>
            </div>
          </div>
          <div>
            <Input
              label={"Property Address"}
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
              value={numberOfHouses}
              onChange={(e) => setNumberOfHouses(e.target.value)}
            />
          </div>
        </div>
        <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
          <div>
            <label className="text-[14px] font-[500] text-BlackHomz ">
              Property Description <span className="text-error">*</span>
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
        !size ||
        !numberOfHouses ||
        !description ? (
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
