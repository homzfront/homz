import { fetchEstates } from "@/api/estateService";
import Dropdown from "@/components/mainmenu/dropDownTwo";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Popup = ({ onClose, onSelect, setEstate, estateData }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (value) => {
    setEstate(value);
    onClose();
    onSelect(value);
  };

  const clear = () => {
    setSelectedState(null);
    setSelectedArea(null);
  };


  // Extract unique areas & states
  const options = [...new Set(estateData.map((item) => item.area))];
  const options2 = [...new Set(estateData.map((item) => item.state))];
  // Create options object with id for each area


  // Filter estateData based on selectedState, selectedArea, and searchQuery
  const filteredData = estateData?.filter(
    (data) =>
      (!selectedState || data?.location.state === selectedState) &&
      (!selectedArea || data?.location.area === selectedArea) &&
      (!searchQuery ||
        data?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative h-[581px]  w-[816px] m-auto bg-white rounded-lg">
        <div className="flex justify-between w-full px-8 py-6 items-center border-b mb-8">
          <div className="flex items-center gap-6">
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
          <div onClick={onClose} className="cursor-pointer">
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
          <div className="flex items-center w-full gap-4">
            <div className="w-[48%] relative pr-2">
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
            <div className="flex items-center gap-[6px]">
              <p className="text-[13px] text-BlackHomz font-[400] pr-1">
                Filter by:
              </p>
              <Dropdown
                options={options2}
                onSelect={(option2) => setSelectedState(option2)}
                selectOption={selectedState === null ? "State" : selectedState}
                className="mr-2"
              />
              <Dropdown
                options={options}
                onSelect={(option) => setSelectedArea(option)}
                selectOption={selectedArea === null ? "Area" : selectedArea}
                className="mr-2"
              />
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
            <div className="w-[33%]"> Property</div>
            <div className="w-[37%]">Address</div>
            <div className="w-[30%]">Action</div>
          </div>
        </div>

        <div className=" overflow-auto h-[55%] scrollbar-container px-8">
          {/* Set max height and overflow-auto for scrolling */}
          {filteredData?.map((data, index) => (
            <div
              key={index}
              className={`flex items-center justify-between h-[64px] px-4 ${
                index % 2 === 1 ? "bg-whiteblue" : ""
              }`}
            >
              <p className="text-[11px] text-GrayHomz font-[400] w-[33%]">
                {data.name}
              </p>
              <p className="pl-1 text-[11px] text-GrayHomz2 font-[500] w-[37%]">
                {data.address}
              </p>

              <div className="w-[30%] pl-3">
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
