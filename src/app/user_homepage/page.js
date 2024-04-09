"use client";
import React, { useState } from "react";
import Bedroom from "./components/bedrooms";
import Price from "./components/prices";
import PropertyType from "./components/propertyType";
import SqrFeet from "./components/squareFeet";
import Image from "next/image";
import State from "./components/state";
import { Properties } from "./components/Properties";
import Link from "next/link";
import { Carousel } from "flowbite-react";
// import CustomizedModal from "./components/CustomizedModal";
const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "hidden md:inline-block absolute  top-[7rem] left-2 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
    rightControl:
      " hidden md:inline-block absolute top-[7rem] right-11 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "hidden bg-[#EEF5FF] hover:bg-white dark:bg-blue-600/50 dark:hover:bg-gray-800",
      on: "hidden bg-blue-600 dark:bg-gray-800",
    },
    base: "h-[10.78px] w-[10.78px] md:h-3 md:w-3 rounded-full hidden",
    wrapper:
      "absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 hidden space-x-1 md:space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "hidden md:inline-flex h-[30px] w-[30px] items-center bg-[#292D32] justify-center rounded-full bg-opacity-10 hover:bg-opacity-100  group-focus:outline-none group-focus:ring-4 group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-3 w-3 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
const parentCarousel = {
  root: {
    base: "relative md:h-full h-[383.64px] md:w-full w-[340px] ",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "md:hidden bg-[#0058D4] hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "md:hidden bg-white dark:bg-gray-800",
    },
    base: "h-[8px] w-[8px] rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-[375px] -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-[251px] md:w-[375px] flex-shrink-0 transform cursor-default snap-center",
      on: "w-[251px] md:w-[375px] flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: " hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#292D32]/30 group-hover:bg-[#292D32]/60  group-focus:outline-none group-focus:ring-1 group-focus:ring-white/60 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
const HomePage = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [landlord, setLandlords] = useState(true);
  const [manager, setManagers] = useState(false);
  const [tenant, setTenants] = useState(false);

  let gifUrl =
    "https://s3-alpha-sig.figma.com/img/22a7/efc7/1bef4a0bdd239a11d9747d0a163c0bd6?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ajRo9BKJwtNk3lsLiIgrKjdcIM39-SK~FYMRJADaAcFv4OWUgeNOIBiBVVwbbtwHC53O9aN-bcgJqOP~eLoqQFc5smxP5lrFPjDRVmHUgIPSoQQFBApHJaGcJf8wBt2-mJy41pjvPDr5y88xhrHARDML4tT8TybjDE8hP5KG79OFR7pVNdgEo5aWky0OchSrnkHVpvWpw~ZRmlBl6cieTL0Z6nSfqs46p5WZ1ofGOmkHe7PM1--UtjEiZBdm7cEW6b3zsTzqPJEl6~xi2eeIu5s0sExQN7I0v5VqLYALoH8fGW6iaLY5woCdBDGFCzP7gA-r89RRmCYYq0OPOXSkUw__";

  const handleOpen = (e) => {
    e.preventDefault();
    // setInitialOpen(false);
    setOpenFilter(!openFilter);
  };
  const handleLandlords = (e) => {
    e.preventDefault();
    setLandlords(true);
    setManagers(false);
    setTenants(false);
  };
  const handleManager = (e) => {
    e.preventDefault();
    setLandlords(false);
    setManagers(true);
    setTenants(false);
  };
  const handleTenants = (e) => {
    e.preventDefault();
    setLandlords(false);
    setManagers(false);
    setTenants(true);
  };

  return (
    <div className="md:w-full mx-auto  mt-10 md:mt-20 ">
      <div className="flex flex-col relative px-6 md:px-0">
        <div className="flex md:items-center md:justify-between relative w-[330px] md:w-full">
          <div className="flex flex-col items-start w-[330px] md:w-[561px] gap-3 md:gap-6 md:pb-32 md:pl-20">
            <p className="md:w-[272px] md:h-[43px] p-[8px]  text-center text-[18px] rounded-[12px] bg-[#EEF5FF] text-[#006AFF] font-[500] md:leading-[27px]">
              One-Stop Real Estate Solution
            </p>

            <h1 className="text-[29px]  leading-[36.54px] md:text-[41px] font-[700] md:leading-[51.66px] text-[#202020] ">
              <span className="hidden md:block">
                Find, Manage, Appraise Your Property With Homz
              </span>
              <span className="md:hidden">Manage Your Property With Homz</span>
            </h1>
            <p className="hidden md:block md:text-[16px] font-[500] md:leading-[25px] text-[#4E4E4E]">
              Homz is an all-inclusive solution that helps you find the perfect
              property for your needs, manage your properties, and appraise it
              in minutes.
            </p>
            <p className="md:hidden text-[18px] font-[500] leading-[25px] mb-2 text-[#4E4E4E]">
              Homz: find, manage, and appraise properties in minutes.
            </p>
          </div>
          <div className="hidden md:block">
            <Image
              src="/static/images/imageHouseHP.png"
              alt=""
              width={694}
              height={642}
              className="rounded-t-[23.02px] rounded-s-[23.02px] md:w-[694px] md:h-[642px]"
            />
          </div>
        </div>

        <div className="md:absolute w-[330px] h-full px-[16px] flex flex-col gap-[10px]   bottom-12 left-20 md:w-[882px] userFilterBorder md:h-[144px]  md:px-[20px] py-[24px] rounded-[12px] bg-[#EEF5FF] md:bg-opacity-75">
          <div className="flex gap-3">
            <div className="w-[300px]  flex items-center md:w-[366px] h-[44px] proBorders rounded-[4px] py-[12px] pr-[7px] mr-1 bg-white">
              <input
                type="text"
                id="searchState_Area"
                name="searchState_Area"
                className="hidden md:block md:w-[100%] h-[42px] border-0 pl-2 rounded-[4px]"
                // value={searchStateArea}
                placeholder="Search by state/area , property type, etc "
                // onChange={(e) => setSearchState_Area(e.target.value)}
              />
              <input
                type="text"
                id="searchState_Area"
                name="searchState_Area"
                className=" md:hidden w-[97%] h-[42px] border-0 pl-2 rounded-[4px]"
                // value={searchStateArea}
                placeholder="Where will you like to stay? "
                // onChange={(e) => setSearchState_Area(e.target.value)}
              />
              <button className="md:hidden cursor-pointer">
                <Image
                  src="/static/images/search-normal.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
            <button className="hidden md:flex cursor-pointer h-[44px] p-[12px] bg-[#006AFF] gap-[8px] text-white items-center rounded-[4px]">
              <Image
                src="/static/images/white-search.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className="">Find Home</span>
            </button>
          </div>
          {!openFilter ? (
            <button
              className="md:hidden flex items-center mt-1 gap-2"
              onClick={handleOpen}
            >
              <span className="">Show all filters</span>
              <Image
                src="/static/images/black-arrow-down.svg"
                alt=""
                width={16}
                height={16}
              />
            </button>
          ) : (
            <div className="md:hidden flex gap-2 flex-col md:flex-row">
              <div>
                <State
                  //  getState={handleSearch}
                  width="w-[292px]"
                />
              </div>
              <div>
                <PropertyType
                  // getPropertyType={handleSearch}
                  width="w-[292px]"
                />
              </div>
              <div>
                <Bedroom
                  // getBedrooms={handleSearch}
                  width="w-[292px]"
                />
              </div>
              <div>
                <Price
                  // getPrice={handleSearch}
                  width="w-[292px]"
                />
              </div>
              <div>
                <SqrFeet
                  // getSquareFeet={handleSearch}
                  width="w-[292px]"
                />
              </div>

              <button
                className="md:hidden flex items-center my-2 gap-2"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <span className="">Hide filters</span>
                <Image
                  src="/static/images/black-arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
              <div className="flex justify-between w-full">
                <button
                  className="adminBorders border-BlueHomz items-center justify-center w-[122.5px] md:w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[44px]"
                  // onClick={() => {
                  //   // setDataProperties(Properties);
                  //   // setState("");
                  // }}
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

                  <span className="ml-1"> Reset</span>
                </button>
                <button className="md:hidden flex cursor-pointer h-[44px] p-[12px] bg-[#006AFF] gap-[8px] text-white items-center rounded-[4px]">
                  <Image
                    src="/static/images/white-search.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="">Find Home</span>
                </button>
              </div>
            </div>
          )}
          <div className="hidden md:flex gap-2 ">
            <div>
              <State
                //  getState={handleSearch}
                width="w-[292px]"
              />
            </div>
            <div>
              <PropertyType
                // getPropertyType={handleSearch}
                width="w-[292px]"
              />
            </div>
            <div>
              <Bedroom
                // getBedrooms={handleSearch}
                width="w-[292px]"
              />
            </div>
            <div>
              <Price
                // getPrice={handleSearch}
                width="w-[292px]"
              />
            </div>
            <div>
              <SqrFeet
                // getSquareFeet={handleSearch}
                width="w-[292px]"
              />
            </div>

            <button
              className="adminBorders border-BlueHomz items-center justify-center w-[122.5px] md:w-[73px] text-[14px] font-[500] flex text-BlueHomz px-[7px] p-1 rounded cursor-pointer h-[44px]"
              // onClick={() => {
              //   // setDataProperties(Properties);
              //   // setState("");
              // }}
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

              <span className="ml-1"> Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="md:w-full bg-[#EEF5FF]  overflow-hidden flex flex-col gap-[15px] md:py-[64px] md:px-[87px] px-6 pt-8 mt-6 pb-12">
        <p className="w-[202px] text-[13px] md:w-[272px] font-[400] leading-[16.38px] md:h-[43px] p-[8px]  text-center md:text-[18px] rounded-[4px] bg-[#039855] text-[#CDEADD] md:font-[500] md:leading-[27px] mx-auto">
          Designed for stress-free living
        </p>

        <h1 className="hidden md:block text-[36px] font-[700] leading-[45.36px] text-[#202020] text-center">
          Effortless Solution for Landlords, Property Managers and Tenants
        </h1>
        <h1 className="w-[295px] text-[23px] text-left leading-[28.98px] font-[700] md:hidden text-[#202020] mx-auto">
          Effortless Solution for all
        </h1>
        <div className="flex md:mt-5 md:gap-[12rem] flex-col md:flex-row w-[330px] md:w-full ">
          <div className="relative md:h-[468.66px] hidden md:block">
            <Image
              src="/static/images/HP-image.png"
              alt=""
              width={324}
              height={368.36}
              className="relative rounded-[15.6px] z-0 top-7"
            />

            <Image
              src="/static/images/homz.gif"
              alt=""
              width={520}
              height={426.13}
              className="relative rounded-[9.92px] h-[426.13px] z-10 bottom-[373px] left-[135px]"
            />
            <Image
              src="/static/images/Property-Added-Successfully-1.png"
              alt=""
              width={275}
              height={205.66}
              className="relative rounded-[15.6px] z-20 bottom-[535px] left-[44px]"
            />
          </div>

          <div className="md:pt-20 md:w-[416px] w-[330px] pt-0 md:pb-[48px] pb-0  ">
            <div className="flex gap-3 flex-wrap">
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${
                  landlord
                    ? "bg-[#006AFF] text-white"
                    : "bg-white text-[#006AFF"
                }`}
                onClick={handleLandlords}
              >
                For Landlords
              </button>
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${
                  manager ? "bg-[#006AFF] text-white" : "bg-white text-[#006AFF"
                }`}
                onClick={handleManager}
              >
                For Property Managers
              </button>
              <button
                className={` h-[36px] py-[8px] px-[16px] rounded-[4px] text-[13px] ${
                  tenant ? "bg-[#006AFF] text-white" : "bg-white text-[#006AFF"
                } `}
                onClick={handleTenants}
              >
                For Tenants
              </button>
            </div>
            <div className="mb-3 pt-10">
              {/* Landlords section */}
              {landlord && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/money-recive.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Receive Rent On Time
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/buildings-2.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Monitor All Properties In One Place
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/verify.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Get Verified Tenants on Your Property
                    </p>
                  </div>
                  <Link
                    href=""
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}

              {/* Managers section */}
              {manager && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/wallet-check.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Collect Rent Faster
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/blue-people.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Manage Existing Tenants
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/Red-setting.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Offer Seamless Maintenance Services
                    </p>
                  </div>
                  <Link
                    href=""
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}
              {/* Tenants section */}
              {tenant && (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/card.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Pay & Save rent
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/card-coin.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Pay bills
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="md:w-[32px] md:h-[52px]  bg-[#EEF5FF] md:py-[10px] px-0 rounded-[48px]">
                      <Image
                        src="/static/images/messages.svg"
                        alt=""
                        width={32}
                        height={32}
                        className=""
                      />
                    </span>
                    <p className="md:text-[20px] leading-[17.64px] md:leading-[30px] md:font-[500] text-[14px] font-[400]">
                      Interact with property management
                    </p>
                  </div>
                  <Link
                    href=""
                    className="text-[14px] md:text-[16px] text-[#006AFF] flex gap-1"
                  >
                    <span>learn more</span>
                    <Image
                      src="/static/images/blue-arrow-right.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* <div className="md:hidden px-2 h-[339px]"> */}

          <div className="relative md:hidden h-[339px] ">
            <Image
              src="/static/images/proyotype2.png"
              alt=""
              width={314}
              height={102.83}
              className="relative rounded-[15.6px] z-0 top-7 h-[250px] mx-auto"
            />

            <Image
              src="/static/images/homz.gif"
              alt=""
              width={356}
              height={252.83}
              className="relative rounded-[9.92px] z-10 bottom-[167px] h-[252.83px] w-[370px]"
            />
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="md:w-full md:h-[750px] h-[640px] gap-4 bg-[#006AFF] text-white flex flex-col px-6 md:px-[3rem] md:py-9 pt-6">
        {/* <p className=""></p> */}
        <h1 className="text-[23px] px-3 leading-[36.54px] md:text-[36px] font-[700] md:leading-[51.66px]  flex justify-between md:px-[6rem]">
          <span className="">Featured Listed Properties</span>

          <Link
            href="user_homepage/PropertyListing"
            className="hidden adminBorders border-white w-[103px] h-[48px] p-[5px] pl-2 rounded-[4px] text-[16px] md:flex gap-1 items-center"
          >
            <span className="">View All</span>

            <Image
              src="/static/images/white-right-arrow.svg"
              alt=""
              width={16}
              height={16}
              className="h-[12px] w-[12px] md:w-[16px] md:h-[16px]"
            />
          </Link>
        </h1>
        <p className=" md:text-[16px] font-[500] md:leading-[25px] md:w-[754px] md:px-[6rem] w-[308px] px-3">
          <span className="hidden md:block">
            Below are the list of the different houses that we currently have on
            the platform. Select any of these to view the house details and the
            features.
          </span>
          <span className="md:hidden ">
            Browse through house listings on our platform for details and
            features.
          </span>
        </p>

        <Carousel
          slide={false}
          className="md:px-[6rem] px-2  pb-9"
          theme={parentCarousel}
          // onSlideChange={handleNext}
        >
          {Properties.slice(0, 8).map((property, index) => (
            <div
              className="flex flex-col w-[241px]  md:w-[360px] bg-white md:h-[458px] rounded-[12px] shadow-md"
              key={index}
            >
              <div
                className="cursor-pointer md:w-[360px] md:h-[252px] "
                // onClick={() => handleClearInputField("option4Qestion")}
              >
                <Carousel
                  slide={false}
                  theme={customTheme}
                  className="w-[241px] h-[156.06px] md:h-full md:w-full"
                >
                  {property.image &&
                    property.image.map((img, index) => (
                      <div
                        key={index}
                        className="w-[241px] h-[156.06px] md:h-full md:w-full"
                      >
                        <Image
                          src={img}
                          alt=""
                          width={373}
                          height={252}
                          className="w-[241px] h-[156.06px] md:h-full md:w-full object-cover relative z-0"
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
              <div className="flex flex-col px-2 md:px-3 pt-2 md:pt-5 gap-[2px] md:gap-[10px] ">
                <div className="flex justify-between items-center">
                  <p className="text-[#006AFF] text-[14px] md:text-[23px] font-[700] leading-[28.98px] text-center">
                    {property.Location}
                  </p>
                  <p className=" w-[45.86px] h-[20px] md:w-[67px] md:h-[25px] py-[4px] text-[6.81px] md:text-[11px] font-[400] px-2 md:px-[12px] rounded-[4px] text-white bg-[#006AFF]">
                    {property.Status}
                  </p>
                </div>

                <p className="text-[8px] md:text-[14px] font-[400] text-[#006AFF]">
                  {property.Property_type}
                </p>
                <p className="font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[9.91px] md:text-[16px] flex items-center ">
                  <Image
                    src="/static/images/nairaIcon.svg"
                    alt=""
                    width={17}
                    height={25}
                    className="h-[9.82px] w-[7.43px] md:w-[15px] md:h-[25px]"
                  />
                  <span className="pl-1 text-[#202020]">
                    {Number(property.Price).toLocaleString()}{" "}
                  </span>
                  {/* <span className="md:hidden text-[8px] ml-1 pt-1 text-gray-500">
                      per year
                    </span> */}
                </p>
                <p className="flex gap-1 items-center">
                  <Image
                    src="/static/images/Location_Vector.svg"
                    alt=""
                    width={12}
                    height={15.85}
                    className="h-[9.82px] w-[7.43px] md:w-[12px] md:h-[15.85px]"
                  />
                  <span className="text-[8px] md:text-[16px] font-[500] text-[#020202]">
                    {property.Street}
                  </span>
                </p>
                <div className=" flex gap-2 md:justify-between mb-2">
                  <div className="flex  gap-4">
                    <p className="flex md:gap-1 items-center md:pt-4">
                      <Image
                        src="/static/images/bed_Vector.svg"
                        alt=""
                        width={17}
                        height={11.9}
                        className="h-[7.37px] w-[10.53px] md:w-[17px] md:h-[11.9px]"
                      />
                      <span className=" text-[7px] md:text-[10px] font-[500] md:leading-[15px] text-center font-['Plus Kakarta Sans'] text-[#202020]">
                        {property.Bedrooms}
                      </span>
                      {/* <span className="md:hidden text-[10px] font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                          {property.Bedrooms.split("")[0]}
                        </span> */}
                    </p>
                    <p className="flex gap-1 items-center md:pt-4">
                      <Image
                        src="/static/images/shower_Vector.svg"
                        alt=""
                        width={17}
                        height={11.9}
                        className="h-[7.8px] w-[8.67px] md:w-[17px] md:h-[11.9px]"
                      />
                      <span className="text-[#202020] text-[7px] md:text-[10px] font-[500] md:leading-[15px] text-center font-['Plus Kakarta Sans']">
                        {property.Bathroom}
                      </span>
                      {/* <span className=" md:hidden text-[10px] font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                          {property.Bathroom.split("")[0]}
                        </span> */}
                    </p>
                    <p className="flex gap-1 items-center md:pt-4">
                      <Image
                        src="/static/images/sqrtFeet-vector.svg"
                        alt=""
                        width={21}
                        height={11.86}
                        className="h-[7.34px] w-[13px] md:w-[21px] md:h-[11.86px]"
                      />
                      <span className=" text-[#202020] text-[7px] md:text-[10px] font-[500] leading-[4px] md:leading-[15px] text-center font-['Plus Kakarta Sans']">
                        {property.SqrTF} Sqft
                      </span>
                    </p>
                  </div>
                  <button className="cursor-pointer">
                    <Image
                      src="/static/images/arrow-in-circle.svg"
                      alt=""
                      width={40}
                      height={40}
                      className="h-[24.77px] w-[24.77px] md:w-[40px] md:h-[40px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <button className="md:hidden mb-3 adminBorders mx-auto border-white w-[103px] h-[48px] p-[5px]  rounded-[4px] text-[16px] flex gap-1 items-center justify-center">
          <span className="">View All</span>

          <Image
            src="/static/images/white-right-arrow.svg"
            alt=""
            width={16}
            height={16}
            className="h-[12px] w-[12px] md:w-[16px] md:h-[16px]"
          />
        </button>
      </div>
      <div className="h-[239px] md:h-[303px] w-full  bg-center bg-opacity-5 bg-cover bg-[url('https://s3-alpha-sig.figma.com/img/a4f4/d5e1/871a6ade1220a3d8c6f14f7aca031b73?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UbzQjXk6Ul6C5B1y8g4sukqAyvH7hxThMjd7RwsUlOCzABDMuThCQqJPLa8TSqLbuSKTZ~BYxNU5g39yKvgsdPvvd8nghZNPR98PUt2WR5LmvIfs1xL7diaK~AdAJWMPTCi7sxhiUk4klBS-0Danh6RAW~LhmXCgG4Kh7wL2AC2c7qwvQ-gVLeor-gvefkttdhIITohMiRgg9ua~PAq6IAl9GcNeU3iRHCZqfaZemL48OykaWU1OKabek5QjWDp9qktzuvvz0IiEuFVeoQxHGkzWC9fTsLS58xKzkxs6-VMrgomR63ZpsnvX2nhn2Dondut2n26BCwS6FQxi19UysA__')]">
        <div className="h-[239px] md:h-[303px]  flex flex-col items-center  gap-[15px] justify-center bg-[#202020] bg-opacity-95 mb-2">
          <p className="hidden md:block  px-4 text-center md:text-[36px] font-[700] md:leading-[45.36px] text-white">
            Discover More Apartments Tailored to Your Lifestyle
          </p>
          <p className="md:hidden text-[23px] leading-[28.98px] w-[297px] text-center font-[700] text-white">
            Explore apartments suited to your lifestyle.
          </p>

          <p className="md:text-[20px] font-[500] leading-[20.16px] text-center text-white md:w-full w-[297px]">
            Join over 2,000+ happy clients who have found their ideal apartments
            on Homz
          </p>

          <div className="flex gap-2 mt-2">
            <Link
              href="user_homepage/PropertyListing"
              className=" md:h-[48px] adminBorders border-r-white text-white bg-[#006AFF] md:text-[16px] md:font-[500] md:leading-[24px] p-[12px] rounded-[4px]"
            >
              Explore properties
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:h-[491px] min-h-[500px] md:py-[72px] py-8 md:px-[140px] bg-[#EEF5FF] flex flex-col gap-5 md:gap-0">
        <h1 className="text-left  mx-auto md:mx-0 w-[296px] md:w-full text-[23px] font-[700] leading-[28.98px]  flex justify-between items-center text-[#0058D4]">
          <span className="">Don’t Just Take Our Word For It</span>

          <Link
            href=""
            className="hidden  adminBorders text-[#006AFF] border-[#006AFF] w-[110px] h-[48px]  rounded-[4px] text-[16px] md:flex items-center justify-center"
          >
            Contact Us
          </Link>
        </h1>
        <p className=" md:text-[20px] leading-[20.16px] text-[#006AFF] font-[400] md:font-[500] md:leading-[25px] md:w-[754px]  w-[308px] mx-auto md:mx-0">
          <span className="">
            Hear from our delighted clients who found dream apartments with
            Homz.
          </span>
        </p>
        <div>
          <Carousel className="" theme={testimonialTheme} pauseOnHover>
            {Testimonials.map((testimonial, index) => (
              <div
                className="flex flex-col gap-4 items-center justify-center w-[277px] h-[260px] mb-4 md:h-[180px] pt-2 bg-white md:w-[65.5rem]  md:py-[20px] px-[22px] rounded-[12px]"
                key={index}
              >
                <p className=" md:text-[20px] leading-[20.16px] mx-6 md:pr-5 md:pl-1 text-center text-[#4E4E4E] font-[400] md:font-[500] md:leading-[40.32px] ">
                  {testimonial.Testimony}
                </p>

                <p className="flex flex-col gap-1 items-center justify-center">
                  <span className="md:text-[14px] md:font-[400] md:leading-[24px] text-[#202020]">
                    {testimonial.Name}
                  </span>
                  <span className="md:text-[13px] md:font-[500] md:leading-[19.5px] text-[#A9A9A9]">
                    {testimonial.Type}
                  </span>
                </p>
              </div>
            ))}
          </Carousel>
        </div>

        <Link
          href=""
          className="md:hidden mx-auto flex items-center justify-center adminBorders border-[#006AFF]  text-[#006AFF] w-[110px] h-[48px]  rounded-[4px] text-[16px] "
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

const Testimonials = [
  {
    _id: 1,
    Name: "John Doe",
    Type: "Client",
    Testimony:
      "Homz Company has been instrumental in streamlining our real estate management system. Their expertise and dedication have significantly improved our operations.",
  },
  {
    _id: 2,
    Name: "Jane Smith",
    Type: "Client",
    Testimony:
      "We are extremely satisfied with the services provided by Homz Company. Their innovative solutions have helped us effectively manage our real estate assets.",
  },
  {
    _id: 3,
    Name: "Alice Johnson",
    Type: "Client",
    Testimony:
      "Homz Company's commitment to excellence is commendable. Their real estate management system has transformed our processes and improved our overall efficiency.",
  },
  {
    _id: 4,
    Name: "David Brown",
    Type: "Client",
    Testimony:
      "We have been working with Homz Company for several years now, and they continue to exceed our expectations. Their professionalism and expertise in real estate management are unparalleled.",
  },
  {
    _id: 5,
    Name: "Emily Davis",
    Type: "Client",
    Testimony:
      "Homz Company has been an invaluable partner in our real estate endeavors. Their cutting-edge solutions have allowed us to stay ahead in the competitive market.",
  },
  {
    _id: 6,
    Name: "Michael Wilson",
    Type: "Client",
    Testimony:
      "We highly recommend Homz Company to anyone looking for reliable real estate management services. Their team's dedication and attention to detail are truly commendable.",
  },
];

const testimonialTheme = {
  root: {
    base: "relative md:w-full md:h-[295px] w-[297px] h-[310px] mx-auto ",
    leftControl:
      " hidden absolute top-0 left-0  h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 hidden h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-white testimonial md:border-0 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-[#006AFF] dark:bg-gray-800",
    },
    base: "h-2 w-2 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block md:w-[65.5rem] md:rounded-[12px] -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full md:h-full h-[260px] md:w-[65.5rem] md:rounded-[12px] flex-shrink-0 transform cursor-default snap-center",
      on: "w-full md:h-full h-[260px] md:w-[65.5rem]  md:rounded-[12px] flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
