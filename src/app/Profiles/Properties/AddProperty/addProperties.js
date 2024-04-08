"use client";
import React, { useEffect, useState } from "react";
import Input from "../components/input";
import Image from "next/image";
import DropDown from "../components/dropDownTwo";
import AcAndRejModel from "../components/acAndRejModel";

const PropertyInfo = ({
  handlePageChangeTwo,
  returnToStartRegistration,
  name,
  address,
  description,
  selectedArea,
  selectedState,
  setSelectedArea,
  setSelectedState,
  setName,
  setAddress,
  setDescription,
  propertyType,
  numberOfBathrooms,
  setPropertyType,
  setNumberOfApartments,
}) => {
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);

  const handleSelectArea = (option) => {
    // Handle the selected value as needed
    // console.log("Selected Option:", option);
    setSelectedArea(option);
  };

  const handleSelectState = (option) => {
    // Handle the selected value as needed
    // console.log("Selected Option:", option);
    setSelectedState(option);
  };

  const handleSelectPropertyType = (option) => {
    // Handle the selected value as needed
    // console.log("Selected Option:", option);
    setPropertyType(option);
  };



  const handleNumberOfApartments = (option) => {
    // Handle the selected value as needed
    // console.log("Selected Option:", option);
    setNumberOfApartments(option);
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
    { id: 1, label: "apartment" },
    { id: 2, label: "duplex" },
    { id: 3, label: "self contain" },
    { id: 4, label: "studio room" },
  ];

  const optionsTwo = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikotun" },
    { id: 4, label: "Adolor" },
    { id: 5, label: "Challenge" },
    { id: 6, label: "Ekaite" },
    { id: 7, label: "Musa" },
    { id: 8, label: "Jalingo" },
  ];

  const optionsThree = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
    { id: 4, label: "Edo" },
    { id: 5, label: "Kwara" },
    { id: 6, label: "Kano" },
    { id: 7, label: "Abuja" },
    { id: 8, label: "Ondo" },
  ];

  const optionsFour = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  const optionsFive = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  return (
    <div className="flex flex-col gap-6">
    

      <div className="text-[23px] font-[700] text-BlueHomz">
        Property information
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="flex justify-between items-start ">
        <div className="flex flex-col justify-between gap-4">
          <div className="">
            <Input
              label={"Property Name"}
              placeholder={"Property Name"}
              type={"text"}
              span={"*"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Type <span className="text-error">*</span>
            </div>
            <div className="flex flex-col justify-between ">
              <div className="adminCellBorders rounded-md">
                <DropDown
                  options={options}
                  onSelect={handleSelectPropertyType}
                  selectOption={"Select Property Type"}
                  className={"w-[460px]"}
                />
              </div>
            </div>
          </div> */}
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Location <span className="text-error">*</span>
            </div>
            <div className="flex justify-between gap-2">
              <div className="adminCellBorders rounded-md">
                <DropDown
                  options={optionsTwo}
                  onSelect={handleSelectArea}
                  selectOption={"Select Area"}
                  className={"w-[230px]"}
                />
              </div>
              <div className="adminCellBorders rounded-md">
                <DropDown
                  options={optionsThree}
                  onSelect={handleSelectState}
                  selectOption={"Select State"}
                  className={"w-[230px]"}
                />
              </div>
            </div>
          </div>
          <div className="">
            <Input
              label={"Property Address"}
              placeholder={"Property Address"}
              type={"text"}
              span={"*"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <div className="space-y-1 w-[473px]">
              <label for="PropertySize">Property Size</label>
              <br />
              <div
                className={`w-full h-[45px]  rounded-[4px] adminCellBorders`}
              >
                <input
                  type="text"
                  id="PropertySize"
                  className={`w-[92%] h-[41px] p-[12px] rounded-[4px]`}
                  name="PropertySize"
                  placeholder="0.00"
                  // readOnly={!edit && true}
                />
                <span className="text-[#A9A9A9]">sqm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" text-[14px] font-[500] text-BlackHomz">
            Total No of Apartments <span className="text-error">*</span>
          </div>
          <div className="adminCellBorders rounded-md">
            <DropDown
              options={optionsFive}
              onSelect={handleNumberOfApartments}
              selectOption={"0"}
              className={"w-[460px]"}
            />
          </div>
          <div className="w-[100%] h-[100%] pb-6 flex flex-col gap-2">
            <div>
              <label className="text-[14px] font-[500] text-BlackHomz ">
                Property Description <span className="text-error">*</span>
              </label>
              <p className="text-[13px] font-[400] text-GrayHomz pt-1">
                Give short description of your property.
              </p>
            </div>
            <textarea
              className="mt-1 h-[193px] rounded-md adminCellBorders w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
              placeholder="Property Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default PropertyInfo;
