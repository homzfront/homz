import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import DropDown from "../../components/dropDown";
import AcAndRejModel from "../../components/acAndRejModel";

const PropertyInfo = ({ handlePageChangeTwo, returnToStartRegistration }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);

  const handleSelect = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setSelectedValue(option);
  };

  // useEffect to handle scrolling
useEffect(() => {
  document.body.style.overflow =showCancelDialogue ? "hidden" : "auto";
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
    { id: 1, label: "Apartment" },
    { id: 2, label: "Duplex" },
    { id: 3, label: "Self Contain" },
    { id: 4, label: "Studio Room" },
  ];

  const optionsTwo = [
    { id: 1, label: "Ajah" },
    { id: 2, label: "Lekki" },
    { id: 3, label: "Ikeja" },
  ];

  const optionsThree = [
    { id: 1, label: "Lagos" },
    { id: 2, label: "Oyo" },
    { id: 3, label: "Calabar" },
  ];

  const optionsFour = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
  ];
  return (
    <div className="px-8">
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Property Details
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between gap-4">
          <div className="">
            <Input
              label={"Name"}
              placeholder={"Property Name"}
              type={"text"}
              span={"*"}
            />
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Type <span className="text-error">*</span>
            </div>
            <div className="flex flex-col justify-between ">
              <div>
                <DropDown
                  options={options}
                  onSelect={handleSelect}
                  selectOption={"Select Property Type"}
                  className={"w-[460px]"}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Property Location <span className="text-error">*</span>
            </div>
            <div className="flex justify-between ">
              <div>
                <DropDown
                  options={optionsTwo}
                  onSelect={handleSelect}
                  selectOption={"Select Area"}
                  className={"w-[230px]"}
                />
              </div>
              <div>
                <DropDown
                  options={optionsThree}
                  onSelect={handleSelect}
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
            />
          </div>
          <div>
            <div className="">
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Total Number of Rooms <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsFour}
                onSelect={handleSelect}
                selectOption={"Total Numbers of Rooms"}
                className={"w-[460px]"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Total Number of Bathrooms <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsFour}
              onSelect={handleSelect}
              selectOption={"Total Numbers of Bathrooms"}
              className={"w-[460px]"}
            />
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
              className="mt-1 h-[295px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
              placeholder="Estate Description"
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
        <div className="">
          <button
            onClick={handlePageChangeTwo}
            className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
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
