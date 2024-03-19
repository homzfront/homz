"use client";
import React, { useEffect, useState } from "react";
import EstateCard from "./components/estateCard";
import Button from "../components/button";
import Image from "next/image";
import Input from "./components/inputEstate";
import EstateForm from "./estateForm/estateForm";
import Modal from "../tenants/components/modal";
import Dropdown from "../components/dropDownFilter";



const ListedEstates = ({
  Data,
  selectedDataId,
  setSelectedDataId,
  popUpMenu,
  setPopUpMenu,
  currentPage,
  setCurrentPage,
  addNewEstate,
  registrationForm,
  returnToStartRegistration,
  setInviteTenant,
  inviteTenant,
  selectedArea,
  selectedState,
  setSelectedState,
  setSelectedArea,
  setSelectedDate,
  selectedProperty,
  setSelectedProperty,
  options,
  options2,
  options3,
  clear,
  fetchData,
  dropdownRef
}) => {
  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
// Use the custom hook


  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(Data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = Data?.slice(startIndex, endIndex);

  console.log(currentData);
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

  const toggleInvite = () => {
    setInviteTenant(true);
  };

  



  return (
    <div className="w-full">
      {registrationForm ? (
        <EstateForm returnToStartRegistration={returnToStartRegistration} fetchData={fetchData}/>
      ) : (
        <div>
          <div className="p-8">
            <div className="flex gap-2 mb-6">
              <p>Properties</p>
              <span className="bg-whiteblue rounded-[8px] w-6 h-6 flex justify-center items-center">
                <span className="text-BlueHomz text-[18px] font-[400]">
                  {Data.length}
                </span>
              </span>
            </div>
            <div className=" flex justify-between items-center">
              <div className="flex items-center justify-center gap-2">
                <p className="text-[16px] font-[400] text-BlackHomz pr-2">
                  Filter by:{" "}
                </p>
                <div className="w-[200px]">
                  <Dropdown
                    options={options3}
                    onSelect={(option) => setSelectedProperty(option)}
                    selectOption={selectedProperty === null ? "Property" : selectedProperty}
                    className={"text-[14px] font-[500] text-GrayHomz2"}
                  />
                </div>
                {/* <div className="w-[120px]">
                  <Dropdown
                    options={options}
                    onSelect={(option) => setSelectedState(option)}
                    selectOption={
                      selectedState === null ? "State" : selectedState
                    }
                    className={"text-[14px] font-[500] text-GrayHomz2"}
                  />
                </div> */}
                {/* <div className="w-[120px]">
                  <Dropdown
                    options={options2}
                    onSelect={(option) => setSelectedArea(option)}
                    selectOption={selectedArea === null ? "Area" : selectedArea}
                    className={"text-[14px] font-[500] text-GrayHomz2"}
                  />
                </div> */}
                {/* <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border px-4 h-[42px] w-[130px] text-GrayHomz2 p-2 rounded cursor-pointer"
                /> */}
                <button
                  onClick={clear}
                  type="text"
                  className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-[42px] w-[92px]  p-1 rounded cursor-pointer"
                >
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
              <div className="flex gap-2">
                <button
                  onClick={toggleInvite}
                  className={`p-[12px] h-10 w-[135px] border border-BlueHomz bg-white text-BlueHomz rounded-md flex items-center justify-center gap-1 text-[14px] font-[700]`}
                >
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/estate/add-square.png"
                    }
                    alt=""
                    width={16}
                    height={17}
                    style={{ height: "auto", width: "auto" }}
                  />
                  Invite Tenant
                </button>
                <button
                  onClick={addNewEstate}
                  className={`p-[12px] h-10 w-[170px] justify-center bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
                >
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    width={16}
                    height={16}
                  />
                  Add New Property
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 h-[750px] flex flex-col justify-between">
            <EstateCard
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

      {inviteTenant && (
        <div  className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Modal dropdownRef={dropdownRef} setInviteTenant={setInviteTenant} />
        </div>
      )}
    </div>
  );
};

export default ListedEstates;
