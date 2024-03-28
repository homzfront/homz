import { fetchEstates } from "@/api/estateService";
import ArrowLeftBlue from "@/components/icons/arrowLeftBlue";
import Dropdown from "@/components/mainmenu/dropDown";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Popup = ({ onClose, onSelect, setEstate, estateData }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (value) => {

    // Check if setEstate is defined before calling it
    if (typeof setEstate === 'function') {
      setEstate(value);
    }
    onClose();
    if (typeof onSelect === 'function') {
      onSelect(value);
    }
  };


  const clear = () => {
    setSelectedProperty(null)
  };

  const options3 = [...new Set(estateData?.map((item) => item?.name))];



  // Filter estateData based on selectedState, selectedArea, and searchQuery
  const filteredData = estateData?.filter(
    (data) =>
      (!selectedProperty || data?.name === selectedProperty) &&
      (!searchQuery ||
        data?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative h-[650px] sm:h-[581px]  w-[816px] m-auto bg-white rounded-lg">
        <div className="flex justify-between w-full px-8 py-6 items-center border-b mb-8">
          <div className="sm:hidden cursor-pointer">
            <div onClick={onClose} className="flex gap-1 items-center">
              <ArrowLeftBlue />
              <span className="text-BlueHomz4">Go Back</span>
            </div>

            <div className="mt-4 flex flex-col">
              <p className="text-[23px] text-BlackHomz font-[700]">
                Select Property
              </p>
              <p className="text-[14px] text-GrayHomz font-[400]">
                Select the property you’ll like to join
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ">
              <Image
                src={"/static/images/buildings-2.png"}
                alt=""
                className=""
                height={24}
                width={24}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[20px] text-BlackHomz font-[500]">
                Select Property
              </p>
              <p className="text-[14px] text-GrayHomz font-[400]">
                Select the property you’ll like to join
              </p>
            </div>
          </div>
          <div onClick={onClose} className="hidden sm:block cursor-pointer">
            <Image
              src={
                "/static/dashboard/enterprisemanager/notification/close-square.png"
              }
              alt=""
              className=""
              height={28}
              width={28}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-8">
          <div className="sm:flex items-center w-full gap-4">
            <div className="sm:w-[48%] relative pr-2">
              <input
                type="text"
                className="border h-[45px] pl-8 rounded-md w-full"
                placeholder="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Image
                src={
                  "/static/dashboard/enterprisemanager/header/search-normal.png"
                }
                alt=""
                className="absolute top-4 left-3"
                height={17}
                width={16}
              />
            </div>
            <p className="mt-2 sm:mt-0 sm:hidden  text-[13px] text-BlackHomz font-[400] pr-1">
              Filter by:
            </p>
            <div className="flex items-center mt-2 sm:mt-0  justify-between sm:justify-normal sm:gap-[6px]">
              <p className="hidden sm:block  text-[13px] text-BlackHomz font-[400] pr-1">
                Filter by:
              </p>
              <div className="w-[200px]">
                <Dropdown
                  options={options3}
                  onSelect={(option) => setSelectedProperty(option)}
                  selectOption={selectedProperty === null ? "Property" : selectedProperty}
                  className={"text-[14px] font-[500] text-GrayHomz2"}
                />
              </div>
              <button
                onClick={clear}
                type="button"
                className="border border-BlueHomz items-center text-[14px] font-[500] gap-4 flex text-BlueHomz px-[10px] h-10 w-[92px] rounded cursor-pointer"
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
          </div>
        </div>
        <div className="px-8 mt-4">
          <div className=" text-[11px] px-4 font-[500] bg-whiteblue w-full h-[44px] flex items-center justify-between">
            <div className=" sm:hidden w-[30%]"></div>
            <div className="w-[33%]"> Property</div>
            <div className="w-[37%]">Address</div>
            <div className="hidden sm:block w-[30%]">Action</div>
          </div>
        </div>

        <div className="overflow-auto h-[50%] sm:h-[55%] scrollbar-container px-8">
          {/* Set max height and overflow-auto for scrolling */}
          {filteredData?.map((data, index) => (
            <div
              key={index}
              className={`flex items-center justify-between h-[64px] px-4 ${index % 2 === 1 ? "bg-whiteblue" : ""
                }`}
            >

              <div className="sm:hidden w-[30%] pl-3">
                <input
                  type="radio"
                  onClick={() => handleSelect(data?.name)}
                  className="text-[11px] text-white bg-BlueHomz "
                />
              </div>
              <p className="text-[11px] text-GrayHomz font-[400] w-[33%]">
                {data.name}
              </p>
              <p className="pl-1 text-[11px] text-GrayHomz2 font-[500] w-[37%]">
                {data.address}
              </p>

              <div className="hidden sm:block w-[30%] pl-3">
                <button
                  onClick={() => handleSelect(data?.name)}
                  className="text-[11px] text-white bg-BlueHomz font-[500] w-[107px] h-[33px] rounded-[4px]"
                >
                  Select Property
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
