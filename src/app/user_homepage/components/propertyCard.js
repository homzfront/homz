"use client";
import Image from "next/image";
import React from "react";
import Button from "./button";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import MiniPropertyListing from "./miniPropertyListings";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import LoadingII from "@/components/mainmenu/loadingII";
import Skeleton from 'react-loading-skeleton';

const PropertyCard = ({
  Property,
  currentPage,
  totalPages,
  handleNext,
  handlePageClick,
  handlePrev,
  totalData,
  loading,
  firstThreePages,
  lastThreePages,
  loadingII,
  reset,
  setLoadingII,
  properties
}) => {
  const currentProperties = Property
  return (
    <div className="w-full">
      {loadingII ? <LoadingII /> :
        <div className="w-[335px] md:w-full flex flex-col  gap-[17px] px-[76px]">
          <div className="flex flex-col gap-1 items-start">
            <h1 className="md:text-[23px] font-[700] leading-[28.98px] text-[#4E4E4E] mb-1">
              {Property && Property.length > 0
                ? ` Property`
                : "Property not found"}
            </h1>
            <p className="text-[#A9A9A9] text-[14px] md:text-[18px] font-[400] leading-[27px] text-left font-['Plus Jakarta Sans'] mb-2">
              {Property && Property.length > 0
                ? `${totalData} ${Property.length > 1 ? " results found" : " result found"}`
                : "We’re sorry, the property you searched for are unavailable"}
            </p>
          </div>
          {Property === null ? (
            <>
              <div className="w-full flex items-center justify-center">
                <div className="h-[239px] md:mb-4 md:px-0 md:h-[303px] md:w-[1225px] mx-auto rounded-[16px] bg-center bg-opacity-5 bg-cover bg-[url('https://s3-alpha-sig.figma.com/img/a4f4/d5e1/871a6ade1220a3d8c6f14f7aca031b73?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UbzQjXk6Ul6C5B1y8g4sukqAyvH7hxThMjd7RwsUlOCzABDMuThCQqJPLa8TSqLbuSKTZ~BYxNU5g39yKvgsdPvvd8nghZNPR98PUt2WR5LmvIfs1xL7diaK~AdAJWMPTCi7sxhiUk4klBS-0Danh6RAW~LhmXCgG4Kh7wL2AC2c7qwvQ-gVLeor-gvefkttdhIITohMiRgg9ua~PAq6IAl9GcNeU3iRHCZqfaZemL48OykaWU1OKabek5QjWDp9qktzuvvz0IiEuFVeoQxHGkzWC9fTsLS58xKzkxs6-VMrgomR63ZpsnvX2nhn2Dondut2n26BCwS6FQxi19UysA__')]">
                  <div className="h-[239px] md:h-[303px]   rounded-[16px] flex flex-col items-center  gap-[15px] justify-center bg-[#006AFF] bg-opacity-95 mb-2">
                    <p className="text-[18px] leading-[22.68px] px-4 text-center md:text-[36px] font-[700] md:leading-[45.36px] text-white">
                      Can’t find the property you’re looking for?
                    </p>
                    <p className="hidden md:block  text-[20px] font-[500] leading-[30px] text-white ">
                      Explore similar properties that suit your taste
                    </p>
                    <p className="text-[16px] leading-[20.16px] font-[400] px-3  md:hidden text-white ">
                      Explore similar properties
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setLoadingII(true);
                          reset()
                        }
                        }
                        className=" rounded-[4px] md:h-[48px] bg-white text-[#006AFF] md:text-[16px] md:font-[700] md:leading-[24px] p-[12px]">
                        Explore properties
                      </button>
                      <Link href={"/contact-page"}>
                        <button className=" md:h-[48px] border border-r-white text-white bg-[#006AFF] md:text-[16px] md:font-[500] md:leading-[24px] p-[12px] rounded-[4px]">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <MiniPropertyListing
                Properties={properties}
                width={"md:w-[345px]"}
                reset={reset}
                setLoadingII={setLoadingII}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-full flex-col ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[30px] mb-3 md:w-full ">
                  {Property && currentProperties?.map((property, index) => (
                    <div
                      className="flex flex-col w-[100%]  md:w-[363px]  md:h-[458px] rounded-[12px] shadow-md"
                      key={index}
                    >
                      <div
                        className="cursor-pointer md:w-[363px] md:h-[252px] rounded-[10px] "
                      >
                        {loading ? <Skeleton height={252} count={5} />
                          :
                          <Carousel
                            slide={false}
                            theme={customTheme}
                            className="w-[100%] h-[226.33px] md:h-full md:w-full"
                          >
                            {property?.photos &&
                              property?.photos.map((img, index) => (
                                <div
                                  key={index}
                                  className="w-[100%] h-[226.33px border border-BlueHomz md:h-full md:w-full"
                                >
                                  <Link
                                    className="cursor-pointer "
                                    href={{
                                      pathname: "/user_homepage/PreviewProperty",
                                      query: { property: property?.slug },
                                    }}
                                  >
                                    <Image
                                      src={img?.url}
                                      alt=""
                                      width={363}
                                      height={252}
                                      className="w-[100%] h-[226.33px] md:h-full md:w-full object-cover realtive z-0"
                                    />
                                  </Link>
                                </div>
                              ))}
                          </Carousel>
                        }
                      </div>
                      <div className="flex flex-col px-4 pt-2 md:pt-5 gap-[5px] md:gap-[10px]">
                        <div className="flex justify-between">
                          <p className="text-[#006AFF] text-[20.66px] md:text-[23px] font-[700] leading-[28.98px] text-center">
                            {capitalizeFirstLetter(property?.name || property?.title)}
                          </p>
                          <p className={` w-auto h-[25px] flex items-center justify-center text-[11px] font-[400] px-[12px] rounded-[4px] text-white bg-[#006AFF] ${property?.listingType ? "" : "hidden"}`}
                          >
                            {capitalizeFirstLetter(property?.listingType)}
                          </p>
                        </div>

                        <p className="text-[12.57px] md:text-[14px] font-[400] text-[#006AFF]">
                          {capitalizeFirstLetter(property?.propertyType)}
                        </p>
                        <p className={`font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[14.37px] md:text-[16px] flex items-center  ${property?.totalFee ? "" : "hidden"}`}
                        >
                          <Image
                            src="/static/images/nairaIcon.svg"
                            alt=""
                            width={17}
                            height={25}
                            className="h-[12px] w-[12px] md:w-[15px] md:h-[25px]"
                          />
                          <span className="pl-1">
                            {property?.totalFee ? Number(property?.totalFee).toLocaleString() : ""}
                          </span>
                        </p>
                        <p className="flex gap-1 items-center">
                          <Image
                            src="/static/images/Location_Vector.svg"
                            alt=""
                            width={12}
                            height={15.85}
                            className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px]"
                          />
                          <span className="text-[12.57px] md:text-[16px] font-[500]">
                            {`${capitalizeFirstLetter(property?.area)}, ${capitalizeFirstLetter(property?.state)}`}
                          </span>
                        </p>
                        <div className="h-full flex justify-between mb-2">
                          <div className="flex  gap-4">
                            <p className="flex gap-1 items-center md:pt-4">
                              <Image
                                src="/static/images/bed_Vector.svg"
                                alt=""
                                width={17}
                                height={11.9}
                                className="h-[12px] w-[14px] md:w-[17px] md:h-[11.9px]"
                              />
                              <span className=" text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                                {property?.numberOfRooms}
                              </span>
                            </p>
                            <p className="flex gap-1 items-center md:pt-4">
                              <Image
                                src="/static/images/shower_Vector.svg"
                                alt=""
                                width={17}
                                height={11.9}
                                className="h-[12px] w-[14px] md:w-[17px] md:h-[11.9px]"
                              />
                              <span className="text-[8.98px] md:text-[10px] font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                                {property?.numberOfBathrooms}
                              </span>
                            </p>
                            <p className={`flex gap-1 items-center md:pt-4 ${property?.squareMeter ? "" : "hidden"}`}>
                              <Image
                                src="/static/images/sqrtFeet-vector.svg"
                                alt=""
                                width={21}
                                height={11.86}
                              />
                              <span className="text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                                {property?.squareMeter} Sqft
                              </span>
                            </p>
                          </div>
                          <Link
                            className="cursor-pointer "
                            href={{
                              pathname: "/user_homepage/PreviewProperty",
                              query: { PropertyId: property._id },
                            }}
                          >
                            <Image
                              src="/static/images/arrow-in-circle.svg"
                              alt=""
                              width={40}
                              height={40}
                              className="h-[35.92px] w-[35.92px] md:w-[40px] md:h-[40px]"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {<Button
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handleNext={handleNext}
                  handlePageClick={handlePageClick}
                  handlePrev={handlePrev}
                  firstThreePages={firstThreePages}
                  lastThreePages={lastThreePages}
                />
                }
              </div>
            </>
          )}
        </div>
      }
    </div>
  );
};

export default PropertyCard;
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
    base: "flex h-full snap-mandatory overflow-y-hidden  scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
