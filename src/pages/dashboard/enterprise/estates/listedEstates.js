import React, { useState } from "react";
import EstateCard from "./components/estateCard";
import Button from "../components/button";


import Image from "next/image";
import Input from "./components/inputEstate";

const ListedEstates = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenu, setPopUpMenu] = useState(false);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
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

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  const handleToggleMenu = (id) => {
    setPopUpMenu(!popUpMenu);
    setSelectedDataId(id);
  };

  return (
    <div className="w-[1081px]">
      <div className="p-8">
        <div className="flex gap-2 mb-6">
          <p>Estate</p>
          <span className="bg-whiteblue w-6 h-6 flex justify-center ">
            <span className="text-BlueHomz ">{Data.length}</span>
          </span>
        </div>
        <div className=" flex justify-between items-center">
          <div className="flex items-center justify-center gap-2">
            <p className="text-[16px] font-[400] text-BlackHomz pr-2">
              Filter by:{" "}
            </p>
            <Input placeholder={"State"} type={"text"} />
            <Input placeholder={"Area"} type={"text"} />
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
          <div className="flex gap-2">
            <button
              className={`p-[12px] h-10 w-[130px] border border-BlueHomz bg-white text-BlueHomz rounded-md flex items-center gap-1 text-[14px] font-[700]`}
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
              Add Tenant
            </button>
            <button
              className={`p-[12px] h-10 w-[153px] bg-BlueHomz text-white rounded-md flex items-center gap-1 text-[14px] font-[700]`}
            >
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                }
                alt=""
                width={16}
                height={16}
              />
              Add New Estate
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 h-[850px] flex flex-col justify-between">
        <EstateCard Data={currentData} handleToggleMenu={handleToggleMenu} data={currentData}  popUpMenu={popUpMenu} selectedDataId={selectedDataId} />
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
  );
};

export default ListedEstates;
