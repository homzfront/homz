"use client";
import React, { useState } from "react";
import Bedroom from "../components/bedrooms";
import Price from "../components/prices";
import PropertyType from "../components/propertyType";
import SqrFeet from "../components/squareFeet";
import Image from "next/image";
import State from "../components/state";
import { Properties } from "../components/Properties";
import CustomizedModal from "../components/CustomizedModal";
import PropertyCard from "../components/propertyCard";

const UserHomePage = () => {
  const [dataProperties, setDataProperties] = useState(Properties || []);
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
    let newData = Properties;

    switch (searchType) {
      case "Status":
        newData = dataProperties.filter((item) => item.Status === search);
        if (newData.length > 0) {
          setDataProperties(newData);
        } else {
          newData = Properties.filter((item) => item.Status === search);
          setDataProperties(newData);
        }

        break;
      case "PropertyType":
        newData = dataProperties.filter(
          (item) => item.Property_type === search
        );
        setDataProperties(newData);
        break;

      case "Price":
        // Filter data based on the price range
        newData = dataProperties.filter((item) => {
          if (search === "100,000 - 200,000") {
            return item.Price <= 200000;
          } else if (search === "200,000 - 400,000") {
            return item.Price > 200000 && item.Price <= 400000;
          } else if (search === "400,000 - 600,000") {
            return item.Price > 400000 && item.Price <= 600000;
          } else if (search === "600,000 - 1 Million") {
            return item.Price > 600000 && item.Price <= 1000000;
          } else if (search === "1 Million - 5 Millions") {
            return item.Price > 1000000 && item.Price <= 5000000;
          } else {
            return item.Price > 5000000;
          }

          return true;
        });

        setDataProperties(newData);
        break;

      case "Bedroom":
        newData = dataProperties.filter((item) => item.Bedrooms === search);
        setDataProperties(newData);
        break;

      case "SqrFT":
        newData = dataProperties.filter((item) => {
          if (search === "100 - 500") {
            return item.SqrTF <= 500;
          } else if (search === "500 - 1,000") {
            return item.SqrTF > 500 && item.SqrTF <= 1000;
          } else if (search === "1,000 - 1,500") {
            return item.SqrTF > 1000 && item.SqrTF <= 1500;
          } else if (search === "1,500 - 2,000") {
            return item.SqrTF > 1500 && item.SqrTF <= 2000;
          } else if (search === "2,000 - 2,500") {
            return item.SqrTF > 2000 && item.SqrTF <= 2500;
          } else {
            return item.SqrTF > 2500;
          }

          return true;
        });
        setDataProperties(newData);
        break;

      default:
        setDataProperties(Properties);
        break;
    }
  };
  return (
    <div className="md:w-full mx-auto px-5 mt-10 md:mt-20 flex flex-col items-center  gap-[2.8rem] mb-10">
      <div className="hidden filterLane md:flex gap-1">
        <div className="  flex items-center w-[262px] h-[44px] proBorders rounded-[4px] py-[12px] pr-[7px] mr-1">
          <input
            type="text"
            id="searchState_Area"
            name="searchState_Area"
            className=" w-full md:w-[97%] h-[42px] border-0 pl-2 rounded-[4px]"
            // value={searchStateArea}
            placeholder="Search by state or area "
            // onChange={(e) => setSearchState_Area(e.target.value)}
          />
          <button className="cursor-pointer">
            <Image
              src="/static/images/search-normal.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
        <div>
          <State getState={handleSearch} />
        </div>
        <div>
          <PropertyType getPropertyType={handleSearch} />
        </div>
        <div>
          <Bedroom getBedrooms={handleSearch} />
        </div>
        <div>
          <Price getPrice={handleSearch} />
        </div>
        <div>
          <SqrFeet getSquareFeet={handleSearch} />
        </div>
        <button
          className="adminBorders border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[44px]"
          onClick={() => {
            setDataProperties(Properties);
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
      <div className="flex justify-between  md:hidden w-full">
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
      <div className="w-[337px] md:mt-3 md:w-full ">
        <PropertyCard
          Property={dataProperties}
          state={state}
          setDataProperties={setDataProperties}
        />
      </div>
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
              <PropertyType getPropertyType={handleSearch} />
            </div>
            <div>
              <Bedroom getBedrooms={handleSearch} />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <Price getPrice={handleSearch} />
            </div>
            <div>
              <SqrFeet getSquareFeet={handleSearch} />
            </div>
          </div>

          <button
            className="adminBorders w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={() => setDataProperties(Properties)}
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

export default UserHomePage;
