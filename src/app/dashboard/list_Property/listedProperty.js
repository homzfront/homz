"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PropertyCard from './components/propertyCard';
import CustomizedModal from "./components/CustomizedModal";
import Dropdown from "./components/dropDownFilter";
import useProfileListingMe from "@/store/listingStore/useProfileListingMe";
import BusinessAlert from "@/components/icons/businessAlert";
import useClickOutside from "@/utils/clickOutside";
import addCommasToNumber from "@/utils/addCommasToNumber";
import PropertyType from "@/app/user_homepage/components/propertyType";
import Bedrooms from "@/app/user_homepage/components/bedrooms";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const EditProperty = ({
  property,
  firstThreePages,
  currentPage,
  totalPages,
  handleNext,
  handlePageClick,
  handlePrev,
  lastThreePages,
  currentData,
  loading,
  filters,
  handleSearch,
  handleSearchChange,
  reset,
}) => {
  const { data, fetchData } = useProfileListingMe();
  useEffect(() => {
    fetchData();
  }, []);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [openModalForBusi, setOpenModalForBusi] = useState(false);
  const dropdownRef = useClickOutside(() => setOpenModalForBusi(false)); // Use the custom hook


  const openMobileModal = () => {
    setMobileModalIsOpen(true);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };


  return (
    <div className="z-20 mb-14">
      {
        openModalForBusi &&
        <div
          className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-30">
          <div ref={dropdownRef} className="bg-white w-[464px] h-[290px] rounded-[12px] flex flex-col p-8 items-center justify-around">
            <BusinessAlert />
            <p className="text-[20px] font-[700] text-BlackHomz">
              Update Business Information
            </p>
            <p className="text-[16px] font-[400] text-GrayHomz text-center">
              Kindly upload your business certification in order to list more properties
            </p>
            <Link
              href={"/dashboard/list_Property/Profile?tab=business"}
              className="w-full h-[48px] bg-BlueHomz rounded-[4px] flex items-center justify-center"
            >
              <span className="text-white text-[16px] font-[700]">
                Upload Certificate
              </span>
            </Link>
          </div>
        </div>
      }
      <div className="dashboard hidden md:flex justify-between">
        <div className="flex gap-1 filter">
          <p className="text-[#4E4E4E] w-[90px] text-[14px] leading-[21px] font-[500] mb-2 pt-2 mr-2">
            Filter by:
          </p>
          <div className="relative flex items-center w-[230px] h-[44px] py-[12px]  mr-1">
            <input
              type="text"
              id="searchState_Area"
              name="searchState_Area"
              className="w-full h-[45px] border border-GrayHomz pl-2 rounded-[6px] placeholder:text-GrayHomz outline-none"
              placeholder="Search"
              value={filters.search}
              onChange={handleSearchChange}
            />
            <Image
              src="/static/images/search-normal.svg"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer right-[15px] absolute"
              onClick={() => {
                handleSearchChange
              }}
            />
          </div>
          <div>
            <PropertyType
              getPropertyType={handleSearch}
              className={"w-[150px]"}
              selectOption={`${filters?.propertyType === null
                ? "Property Type"
                : capitalizeFirstLetter(filters?.propertyType)
                }`}
              classNameII={"text-GrayHomz border-GrayHomz"}
              classNameIII={"text-GrayHomz"}
              classNameIV={"text-GrayHomz"}
            />
          </div>
          <div>
            <Bedrooms
              getBedrooms={handleSearch}
              className={"w-[150px]"}
              selectOption={`${filters?.numberOfBathrooms === null
                ? "No of bedrooms"
                : `${filters?.numberOfBathrooms} Bedrooms`
                }`}
              classNameII={"text-GrayHomz border-GrayHomz"}
              classNameIII={"text-GrayHomz"}
              classNameIV={"text-GrayHomz"}
            />
          </div>
          <button
            className="border cursor-pointer border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded h-[45px]"
            onClick={reset}
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
        {
          property?.length > 0 && (data?.businessInfo?.isVerified === 'unverified' || data?.businessInfo?.isVerified === 'pending' || data?.businessInfo?.isVerified === 'rejected') ?
            <div
              onClick={() => setOpenModalForBusi(true)}
              className="w-[338px] cursor-pointer flex gap-1 md:w-[166px] h-[42px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 ml-16"
            >
              <Image
                src="/static/images/white-add.svg"
                alt=""
                height={16}
                width={16}
                className=""
              />
              <span>List New property</span>
            </div> :
            <Link
              href="/dashboard/list_Property/addProperty"
              className="w-[338px] flex gap-1 md:w-[166px] h-[45px] md:px-[12px] text-[14px] items-center justify-center rounded-[4px] text-white bg-[#006AFF] flex-shrink-0 ml-16"
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
        }
      </div>
      <div className="flex justify-between md:hidden w-full">
        <div className="relative w-[86%] rounded-[4px]">
          <input
            type="text"
            className="border h-[40px] pl-8 rounded-[4px] w-full "
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search"
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
      <PropertyCard
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
        lastThreePages={lastThreePages}
        currentData={currentData}
        loading={loading}
      />
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[320px] h-auto  py-[24px] px-5 rounded-[12px] gap-[18px]">
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
          <div className="grid grid-cols-1 gap-4">
            <div className="searchPane relative w-[100%] rounded-[4px]">
              <input
                type="text"
                className="border h-[46px] pl-8 rounded-[4px] w-full"
                id="search"
                placeholder="Search"
                value={filters.search}
                onChange={handleSearchChange}
              />
              <Image
                src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                alt=""
                className="absolute top-[14.8px] left-3"
                height={16}
                width={16}
                onClick={() => {
                  handleSearchChange
                }}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <PropertyType
                  getPropertyType={handleSearch}
                  className={"w-[135px]"}
                  selectOption={`${filters?.propertyType === null
                    ? "Property Type"
                    : capitalizeFirstLetter(filters?.propertyType)
                    }`}
                  classNameII={"text-GrayHomz border-GrayHomz"}
                  classNameIII={"text-GrayHomz"}
                  classNameIV={"text-GrayHomz"}
                />
              </div>
              <div>
                <Bedrooms
                  getBedrooms={handleSearch}
                  className={"w-[135px]"}
                  selectOption={`${filters?.numberOfBathrooms === null
                    ? "No of bedrooms"
                    : `${filters?.numberOfBathrooms} Bedrooms`
                    }`}
                  classNameII={"text-GrayHomz border-GrayHomz"}
                  classNameIII={"text-GrayHomz"}
                  classNameIV={"text-GrayHomz"}
                />
              </div>
            </div>
          </div>
          <button
            className="border w-full h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-4"
            onClick={reset}
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
