"use client";
import React from "react";
import EstateCard from "./components/estateCard";
import Button from "../components/button";
import Image from "next/image";


const ListedEstates = ({
  Data,
  selectedDataId,
  setSelectedDataId,
  popUpMenu,
  setPopUpMenu,
  currentPage,
  setCurrentPage,
}) => {
  // Ensure that Data is defined and not null
  if (!Data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // Ensure Data is defined before use
  const data = Data || []; // Assign an empty array if Data is undefined

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

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
      <div>
        <div className="p-8 flex justify-between items-center">
          <div className="flex gap-2 mb-6">
            <p>Estate</p>
            <span className="bg-whiteblue w-6 h-6 flex justify-center ">
              <span className="text-BlueHomz ">{Data.length}</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <p className="text-[16px] font-[400] text-BlackHomz pr-2">
              Filter by:{" "}
            </p>
            <input
              type="date"
              className="border text-GrayHomz2 px-4 h-10 w-[120px] mb-1 py-2 rounded cursor-pointer"
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
    </div>
  );
};

export default ListedEstates;
