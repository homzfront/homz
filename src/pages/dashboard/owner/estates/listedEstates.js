"use client";
import React from "react";
import EstateCard from "./components/estateCard";
import Button from "../components/button";
import Image from "next/image";
import Dropdown from "../components/dropDownFilter";


const ListedEstates = ({
  Data,
  selectedDataId,
  setSelectedDataId,
  popUpMenu,
  setPopUpMenu,
  currentPage,
  setCurrentPage,
  selectedArea,
  selectedState,
  selectedProperty,
  setSelectedProperty,
  setSelectedState,
  setSelectedArea,
  options,
  options2,
  options3,
  clear,
}) => {
  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = Data || []; // Assign an empty array if Data is undefined

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);

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
    <div className="w-full">
      <div className="w-full px-8 py-2 md:py-8">
        <div>
          <div className="w-full hidden md:flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="text-[20px] font-[500]">Properties</p>
              <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                <span className="text-BlueHomz text-[18px] font-[400]">{data?.length}</span>
              </span>
            </div>

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
            </div>
            <div className="w-[120px]">
              <Dropdown
                options={options2}
                onSelect={(option) => setSelectedArea(option)}
                selectOption={selectedArea === null ? "Area" : selectedArea}
                className={"text-[14px] font-[500] text-GrayHomz2"}
              />
            </div> */}
              <button
                onClick={clear}
                type="text" className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] mb-1 p-1 rounded cursor-pointer">
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
          <div className="mt-4 flex justify-between md:hidden w-full">
            <div className="relative w-[86%] rounded-[4px]">
              <input
                type="text"
                className="border placeholder:text-[13px] h-[40px] pl-8 rounded-[4px] w-full "
                id="search"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by state or area "
              />
              <Image
                src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                alt=""
                className="absolute top-3 left-3"
                height={16}
                width={16}
              />
            </div>
            <div className="border rounded-[4px] flex justify-center items-center border-BlueHomz w-[12%]">
              <button
              // onClick={openMobileModal}
              >
                <Image
                  src="/static/images/filter.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="py-4 h-[750px] flex flex-col justify-between">
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
    </div>
  );
};

export default ListedEstates;
