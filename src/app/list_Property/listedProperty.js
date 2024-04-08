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

const EditProperty = ({ property }) => {
  const [dataProperty, setDataProperty] = useState(property || []);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [state, setState] = useState("");
 
  const openMobileModal = () => {
    setMobileModalIsOpen(true);
    // setDataProperties(data);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const handleSearch = (search, searchType) => {
    let newData = property;

    switch (searchType) {
      case "State":
        newData = dataProperty.filter((item) => item.PropertyInfo.State === search);
        setDataProperty(newData);
        setState(search);
        break;
      case "Area":
        newData = dataProperty.filter((item) => item.PropertyInfo.Area === search);
        setDataProperty(newData);
        setState(search);
        break;
      case "PropertyType":
        newData = dataProperty.filter((item) => item.PropertyInfo.Property_type === search);
        setDataProperty(newData);
        break;

      case "Bedroom":
        if(search == "7+")
        newData = dataProperty.filter((item) => item.PropertyInfo.Bedrooms >= 7);
        else
        newData = dataProperty.filter((item) => item.PropertyInfo.Bedrooms === parseInt(search));
        setDataProperty(newData);
        break;

      default:
        setDataProperty(property);
        break;
    }
  };

  return (
    <div>
      <div className="hidden filterLane md:flex justify-between">
        <div className="flex gap-1">
          <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2">
            Filter by:
          </p>
          <div>
            <State getState={handleSearch} />
          </div>
          <div>
            <Area getArea={handleSearch} />
          </div>
          <div>
            <PropertyType getPropertyType={handleSearch} />
          </div>
          <div>
            <Bedroom getBedrooms={handleSearch} />
          </div>

          <button
            className="adminBorders border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[37px]"
            onClick={() => {
              setDataProperty(property);
              setState("");
            }}
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
        </div>
        <Link
          href="/list_Property/addProperty"
          className="w-[338px] flex gap-1 md:w-[166px] h-[37px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF]"
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
      <div className="flex justify-between  md:hidden w-[335px]">
        <div className="searchPane relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            placeholder="Search by state or area "
            // onChange= {e=>{setSearchValue(e.target.value)}}
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
      <PropertyCard Property={dataProperty}/>
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[350px] h-[320px]  py-[24px] px-5 rounded-[12px] gap-[18px]">
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

          <div className="flex justify-between">
            <div>
              <State getState={handleSearch} />
            </div>
            <div>
              <Area getArea={handleSearch} />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <PropertyType getPropertyType={handleSearch} />
            </div>
            <div>
              <Bedroom getBedrooms={handleSearch} />
            </div>
          </div>
          <button
            className="adminBorders w-[313px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={() => setDataProperties(property)}
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
