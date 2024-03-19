import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import Image from "next/image";
import DropDown from "../../components/dropDownTwo";
import AcAndRejModel from "../../components/acAndRejModel";
import SelectArea from "@/pages/selectStateAndArea/selectArea";
import SelectState from "@/pages/selectStateAndArea/selectState";

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
  numberOfRooms,
  numberOfBathrooms,
  setPropertyType,
  setNumberOfRooms,
  setNumberOfBathrooms,
  setToilets,
  toilet
}) => {
  const [showCancelDialogue, setShowCancelDialogue] = useState(false);

  console.log(name);
  console.log(address);
  console.log(description);

  const handleSelectToilets = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setToilets(option)
}

  const handleSelectPropertyType = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setPropertyType(option);
  };

  const handleSelectNumberOfRooms = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setNumberOfRooms(option);
  };

  const handleSelectNumberOfBathrooms = (option) => {
    // Handle the selected value as needed
    console.log("Selected Option:", option);
    setNumberOfBathrooms(option);
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
    { id: 1, label: "Boys Quarters" },
    { id: 2, label: "Mini-flat" },
    { id: 3, label: "Penthouse" },
    { id: 4, label: "Self contain" },
    { id: 5, label: "Studio Apartment" },
    { id: 6, label: "Block of flats" },
    { id: 7, label: "Detached Bungalow" },
    { id: 8, label: "Semi-Detached Bungalow" },
    { id: 9, label: "Terraced Bungalow" },
    { id: 10, label: "Detached Duplex" },
    { id: 11, label: "Semi-Detached Duplex" },
    { id: 12, label: "Terraced Duplex" },
  ];


  const optionsThree = [
    { id: 1, label: 1 },
    { id: 2, label: 2 },
    { id: 3, label: 3 },
    { id: 4, label: 4 },
    { id: 5, label: 5 },
    { id: 6, label: 6 },
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
    <div className="px-8">
      <div className="text-[23px] font-[700] text-BlueHomz mt-2">
        Property Details
      </div>
      <div className="text-[14px] font-[400]">
        Kindly fill in the accurate property details
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col justify-between gap-4 w-[47%]">
          <div className="">
            <Input
              label={"Name"}
              placeholder={"Property Name"}
              type={"text"}
              span={"*"}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                  onSelect={handleSelectPropertyType}
                  selectOption={"Select Property Type"}
                  className={"w-full"}
                />
              </div>
            </div>
          </div>
          <div>
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
          <div className="">
            <Input
              label={"Street"}
              placeholder={"Enter street name"}
              type={"text"}
              span={"*"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <div className="">
              <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
                Rooms <span className="text-error">*</span>
              </div>
              <DropDown
                options={optionsFour}
                onSelect={handleSelectNumberOfRooms}
                selectOption={"Total Numbers of Rooms"}
                className={"w-full"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[47%]">
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
              Bathrooms <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsFive}
              onSelect={handleSelectNumberOfBathrooms}
              selectOption={"Total Numbers of Bathrooms"}
              className={"w-full"}
            />
          </div>
          <div>
            <div className="pb-2 text-[14px] font-[500] text-BlackHomz">
            Toilets <span className="text-error">*</span>
            </div>
            <DropDown
              options={optionsThree}
              onSelect={handleSelectToilets}
              selectOption={"Total Numbers of Toilets"}
              className={"w-full"}
            />
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
              className="mt-1 h-[203px] rounded-md border w-full p-4 text-top placeholder:text-[14px] placeholder:font-[500] placeholder:text-GrayHomz2 "
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
          !numberOfRooms ||
          !description ||
          !numberOfBathrooms ||
          !toilet ||
          !propertyType ? (
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
