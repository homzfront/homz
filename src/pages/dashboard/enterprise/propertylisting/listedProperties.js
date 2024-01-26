import React, { useState } from "react";
import PropertyCard from "./components/propertyCard";
import Button from "../components/button";
import Image from "next/image";
import Dropdown from "../components/dropDownTwo";
import PropertyForm from "./propertyListingForm/propertyForm";

const ListedProperties = ({
  Data,
  selectedDataId,
  setSelectedDataId,
  popUpMenu,
  setPopUpMenu,
  currentPage,
  setCurrentPage,
  setSelectedValue,
  handleSelect,
  returnToStartRegistration,
  registrationForm,
  openRegistrationForm
}) => {
  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }

  const options = [
    { id: 1, label: "Apartment" },
    { id: 2, label: "Duplex" },
    { id: 3, label: "Self Contain" },
    { id: 4, label: "Studio Room" },
  ];
  const options2 = [
    { id: 1, label: "Abuja" },
    { id: 2, label: "Lagos" },
    { id: 3, label: "Ekiti" },
    { id: 4, label: "Jos" },
  ];

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(Data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = Data.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Use optional chaining to handle cases where Data is undefined
  const firstThreePages = Array.from(
    { length: Math.min(totalPages || 0, 3) },
    (_, index) => index + 1
  );

  const handleToggleMenu = (id) => {
    setPopUpMenu(!popUpMenu);
    setSelectedDataId(id);
  };

  return (
    <div className="w-[1147px]">
      {registrationForm ? (
         <PropertyForm returnToStartRegistration={returnToStartRegistration} />
         ) : (
        <div>
          <div className="p-8">
            <div className="flex gap-2 items-center mb-6">
              <p className="text-[20px] font-[500]">Properties</p>
                      <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz  text-[18px] font-[400]">{Data.length}</span>
              </span>
            </div>
            <div className=" flex justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-[16px] font-[400] text-BlackHomz pr-2">
                  Filter by:{" "}
                </p>

                <Dropdown
                  options={options2}
                  onSelect={handleSelect}
                  selectOption={"State"}
                  className={"w-[100px] text-[14px] font-[500] text-GrayHomz2"}
                />

                <Dropdown
                  options={options2}
                  onSelect={handleSelect}
                  selectOption={"Area"}
                  className={"w-[100px] text-[14px] font-[500] text-GrayHomz2"}
                />
                <Dropdown
                  options={options}
                  onSelect={handleSelect}
                  selectOption={"Property Type"}
                  className={"text-[14px] font-[500] text-GrayHomz2"}
                />
                <Dropdown
                  options={options}
                  onSelect={handleSelect}
                  selectOption={"Bedroom"}
                  className={"w-[120px] text-[14px] font-[500] text-GrayHomz2"}
                />
                <button className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
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
              <div className="">
                <button
                     onClick={openRegistrationForm}
                  className={`p-[12px] h-[45px] w-[173px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
                >
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    width={16}
                    height={16}
                  />
                  List New Property
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 h-[750px] flex flex-col justify-between">
            <PropertyCard
              Data={currentData}
              handleToggleMenu={handleToggleMenu}
              data={currentData}
              popUpMenu={popUpMenu}
              selectedDataId={selectedDataId}
            />
            <Button
              firstThreePages={firstThreePages}
              currentPage={currentPage}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePageClick={handlePageClick}
              handlePrev={handlePrev}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListedProperties;
