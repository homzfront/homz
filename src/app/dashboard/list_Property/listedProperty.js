"use client";
import React, { useState } from "react";
import Image from "next/image";
import State from "./components/state";
import PropertyType from "./components/propertyType";
import Bedroom from "./components/bedrooms";
import Area from "./components/Area";
import Link from "next/link";
import PropertyCard from './components/propertyCard';
import CustomizedModal from "./components/CustomizedModal";
import Dropdown from "./components/dropDownFilter";

const EditProperty = ({ property }) => {
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [state, setState] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);

  const clear = () => {
    setSelectedProperty(null);
    setSelectedState(null);
    setSelectedArea(null);
    setSelectedRooms(null);
  };

  const openMobileModal = () => {
    setMobileModalIsOpen(true);
    // setDataProperties(data);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const options = [...new Set(property?.map((item) => item?.state))];

  const options2 = [...new Set(property?.map((item) => item?.area))];

  const options3 = [...new Set(property?.map((item) => item?.propertyType))];

  const options4 = [...new Set(property?.map((item) => item?.numberOfBathrooms))];
  
  const filteredData = property?.filter(
    (data) =>
      (!selectedState || data?.state === selectedState) &&
      (!selectedArea || data?.area === selectedArea) &&
      (!selectedProperty || data?.propertyType === selectedProperty) &&
      (!selectedRooms || data?.numberOfBathrooms === selectedRooms)
  );

  return (
    <div>
      <div className="dashboard hidden md:flex justify-between">
        <div className="flex gap-1 filter">
          <p className="text-[#4E4E4E]  text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2">
            Filter by:
          </p>
          <div className="w-[120px]">
            <Dropdown
              options={options}
              onSelect={(option) => setSelectedState(option)}
              selectOption={
                selectedState === null ? "State" : selectedState
              }
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options2}
              onSelect={(option) => setSelectedArea(option)}
              selectOption={selectedArea === null ? "Area" : selectedArea}
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[180px]">
            <Dropdown
              options={options3}
              onSelect={(option) => setSelectedProperty(option)}
              selectOption={
                selectedProperty === null
                  ? "Property Type"
                  : selectedProperty
              }
              className={"text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options4}
              onSelect={(option) => setSelectedRooms(option)}
              selectOption={
                selectedRooms === null ? "Bedroom" : selectedRooms
              }
              className={
                "w-[120px] text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <button
            className="border cursor-pointer border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded h-[37px]"
            onClick={clear}
          >
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
                alt=""
                height={17}
                width={16}
              />
            </span>

            <span className="ml-1"> Reset</span>
          </button>
          <Link
            href="/dashboard/list_Property/addProperty"
            className="w-[338px] flex gap-1 md:w-[166px] h-[37px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 ml-16"
          >
            <Image
              src="/static/images/white-add.svg"
              alt=""
              height={16}
              width={16}
              className=""
            />
            <span>List New property</span>
          </Link>
        </div>
      </div>
      <div className="flex justify-between  md:hidden w-[335px]">
        <div className="searchPane relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
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
        <div className=" rounded-[4px] p-[11px] filterBorder hover:border-blue-600">
          <button onClick={openMobileModal}>
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <PropertyCard Property={filteredData} />
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[350px] h-[320px]  py-[24px] px-5 rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeMobileModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="w-[120px]">
            <Dropdown
              options={options}
              onSelect={(option) => setSelectedState(option)}
              selectOption={
                selectedState === null ? "State" : selectedState
              }
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options2}
              onSelect={(option) => setSelectedArea(option)}
              selectOption={selectedArea === null ? "Area" : selectedArea}
              className={
                "text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <div className="w-[180px]">
            <Dropdown
              options={options3}
              onSelect={(option) => setSelectedProperty(option)}
              selectOption={
                selectedProperty === null
                  ? "Property Type"
                  : selectedProperty
              }
              className={"text-[14px] font-[500] text-GrayHomz2"}
            />
          </div>
          <div className="w-[120px]">
            <Dropdown
              options={options4}
              onSelect={(option) => setSelectedRooms(option)}
              selectOption={
                selectedRooms === null ? "Bedroom" : selectedRooms
              }
              className={
                "w-[120px] text-[14px] font-[500] text-GrayHomz2"
              }
            />
          </div>
          <button
            className="border w-[313px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={() => clear()}
          >
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default EditProperty;
