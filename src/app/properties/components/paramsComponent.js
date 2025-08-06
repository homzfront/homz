"use client";
import React from "react";
import Bedroom from "../components/bedrooms";
import PropertyType from "../components/propertyType";
import MaxPrice from "../components/maxPrice";
import MinPrice from "../components/minPrice";
import Image from "next/image";
import Listing from "../components/listing";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import addCommasToNumberWithoutN from "@/utils/addCommasToNumberWithoutN";
import Reset from "@/components/icons/reset";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import usePropertyStore from "@/store/usePropertyStore";

const ParamsComponent = ({ reset, handleListingType}) => {
  const {
    filters,
    mobileModalIsOpen,
    handleSearch,
    handleSearchChange,
    openMobileModal,
    closeMobileModal,
  } = usePropertyStore();
  
    return (
        <>
            <div className="hidden sm:flex justify-between items-center w-full px-[76px]">
                <div className="relative flex items-center w-[20%] h-[44px] py-[12px]  mr-1">
                    <input
                        type="text"
                        id="searchState_Area"
                        name="searchState_Area"
                        className="w-full h-[45px] border border-GrayHomz pl-2 rounded-[6px] placeholder:text-GrayHomz outline-none"
                        placeholder="Search by state or area"
                        value={filters.search}
                        onChange={handleSearchChange}
                    />
                    <Image
                        src="/static/images/search-normal.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="cursor-pointer right-[15px] absolute"
                        onClick={handleSearchChange}
                    />
                </div>
                <div className="flex gap-1 w-[80%]">
                    <div>
                        <Listing
                            getState={handleListingType}
                            className={"w-[150px]"}
                            selectOption={`${filters?.listingType === null || filters?.listingType === undefined || filters?.listingType?.length === 0
                                    ? "Listing Type"
                                    : capitalizeFirstLetter(filters?.listingType)
                                }`}
                            classNameII={"text-GrayHomz border-GrayHomz"}
                            classNameIII={"text-GrayHomz"}
                            classNameIV={"text-GrayHomz"}
                        />
                    </div>
                    <div>
                        <PropertyType
                            getPropertyType={handleSearch}
                            className={"w-[180px]"}
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
                        <Bedroom
                            getBedrooms={handleSearch}
                            className={"w-[180px]"}
                            selectOption={`${filters?.numberOfBathrooms === null
                                    ? "No of bedrooms"
                                    : `${filters?.numberOfBathrooms} Bedrooms`
                                }`}
                            classNameII={"text-GrayHomz border-GrayHomz"}
                            classNameIII={"text-GrayHomz"}
                            classNameIV={"text-GrayHomz"}
                        />
                    </div>
                    <div>
                        <MinPrice
                            getPrice={handleSearch}
                            className={"w-[160px]"}
                            selectOption={`${filters?.minPrice === null
                                    ? "Min Price"
                                    : addCommasToNumberWithoutN(filters?.minPrice)
                                }`}
                            classNameII={"text-GrayHomz border-GrayHomz"}
                            classNameIII={"text-GrayHomz"}
                            classNameIV={"text-GrayHomz"}
                        />
                    </div>
                    <div>
                        <MaxPrice
                            getPrice={handleSearch}
                            className={"w-[160px]"}
                            selectOption={`${filters?.maxPrice === null
                                    ? "Max Price"
                                    : addCommasToNumberWithoutN(filters?.maxPrice)
                                }`}
                            classNameII={"text-GrayHomz border-GrayHomz"}
                            classNameIII={"text-GrayHomz"}
                            classNameIV={"text-GrayHomz"}
                        />
                    </div>
                    <button
                        className="border border-BlueHomz items-center w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[44px]"
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
            </div>
            <div className="flex justify-between sm:hidden w-full px-6 pl-">
                <div className="searchPane relative w-[86%] rounded-[4px]">
                    <input
                        type="text"
                        className="border h-[46px] pl-8 rounded-[4px] w-full"
                        id="search"
                        placeholder="Search by state or area"
                        value={filters.search}
                        onChange={handleSearchChange}
                    />
                    <Image
                        src={"/static/dashboard/enterprisemanager/header/search-normal.png"}
                        alt=""
                        className="absolute top-[14.8px] left-3"
                        height={16}
                        width={16}
                        onClick={handleSearchChange}
                    />
                </div>
                <div className=" rounded-[4px] p-[10px] border hover:border-blue-600">
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

            <CustomizedModal
                isOpen={mobileModalIsOpen}
                onRequestClose={closeMobileModal}
            >
                <div className="bg-white border flex flex-col w-[350px] h-[320px]  py-[24px] px-4 rounded-[12px] gap-[18px]">
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
                            <PropertyType
                                getPropertyType={handleSearch}
                                className={"w-[150px]"}
                                selectOption={`${filters?.propertyType === null
                                        ? "Property Type"
                                        : capitalizeFirstLetter(filters?.propertyType)
                                    }`}
                            />
                        </div>
                        <div>
                            <Bedroom
                                getBedrooms={handleSearch}
                                className={"w-[150px]"}
                                selectOption={`${filters?.numberOfBathrooms === null
                                        ? "Number of bedrooms"
                                        : `${filters?.numberOfBathrooms} Bedrooms`
                                    }`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="">
                            <MinPrice
                                getPrice={handleSearch}
                                className={"w-[150px]"}
                                selectOption={`${filters?.minPrice === null
                                        ? "Min Price"
                                        : addCommasToNumberWithoutN(filters?.minPrice)
                                    }`}
                            />
                        </div>
                        <div>
                            <Listing
                                getState={handleListingType}
                                className={"w-[150px]"}
                                selectOption={`${filters?.listingType === null
                                        ? "Listing Type"
                                        : capitalizeFirstLetter(filters?.listingType)
                                    }`}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-row gap-4">
                        <button
                            className="border w-[70%] h-[42px] p-[12px] border-BlueHomz text-white bg-BlueHomz items-center text-[14px] font-[500] flex justify-center gap-2 rounded-[4px] cursor-pointer mt-4"
                            onClick={closeMobileModal}
                        >
                            <Image
                                src="/static/images/white-search.svg"
                                alt=""
                                width={16}
                                height={16}
                            />
                            <span className="">Filter</span>
                        </button>
                        <button
                            className="border w-[30%] h-[42px] p-[12px] border-BlueHomz bg-white items-center text-[14px] font-[500] flex justify-center gap-1 rounded-[4px] cursor-pointer mt-4"
                            onClick={reset}
                        >
                            <span>
                                <Reset className="#006AFF" />
                            </span>
                            <span className="text-[14px] leading-[17.64px]  text-[500] text-BlueHomz">
                                Reset
                            </span>
                        </button>
                    </div>
                </div>
            </CustomizedModal>
        </>
    );
};

export default ParamsComponent;