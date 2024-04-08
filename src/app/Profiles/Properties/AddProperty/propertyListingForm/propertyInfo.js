"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import DropDown from "../../components/dropDownTwo";
import AcAndRejModel from "../../components/acAndRejModel";

const PropertyInfo = ({
  handlePageChangeTwo,
  returnToStartRegistration,
  name,
  address,
  propertySize,
  description,
  selectedArea,
  numberOfApartments,
  selectedState,
  setSelectedArea,
  setSelectedState,
  setName,
  setAddress,
  setPropertySize,
  setDescription,
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


  const optionsFive = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];

  return (
    <div className="flex flex-col gap-4">
      

      <div className="text-[23px] font-[700] text-BlueHomz">
        Property information
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
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
            <div className="space-y-1 ">
           <lable for="propertySize" className='text-[14px]'>Property Size</lable>
           <br/>  
              <div
                className={`w-full h-[45px]  rounded-md adminCellBorders`}
              >
                <input
                  type="text"
                  id="PropertySize"
                  className={`w-[92%] h-[41px] p-[12px]`}
                  name="PropertySize"
                  placeholder="0.00"
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
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
              <p className="text-[13px] font-[400] text-GrayHomz pt-2">
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
      <div className="flex justify-between mt-8">
        <div>
          <button
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz"
            onClick={handleShowCancelDialogue}
          >
            Cancel
          </button>
        </div>
        {!name ||
        !selectedArea ||
        !selectedState ||
        !address ||
        !description ||
        !numberOfApartments ||
        !propertySize
         ? (
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
