import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MiniPropertyListings = ({
  Properties,
  width,
  padding,
  reset,
  setLoadingII
}) => {


  return (
    <div className={``}>
      <p className="text-[#A9A9A9] md:text-[18px] font-[400] md:leading-[27px] my-3 ">
        Other properties
      </p>
      <div className="flex  w-[340px] flex-wrap md:gap-[50px] gap-[36px] mb-3 md:w-full md:justify-cent">
        {Properties?.slice(0, 3)?.map((property, index) => (
          <div
            className={`flex flex-col w-[335px]  ${width ? width : " md:w-[333px]"
              }  md:h-[458px] rounded-[12px] shadow-md`}
            key={index}
          >
            <div
              className={`cursor-pointer ${width ? width : "md:w-[333px]"
                } md:h-[252px] rounded-[10px] `}
            >
              <Carousel
                slide={false}
                theme={customTheme}
                className="w-[335px] h-[226.33px] md:h-full md:w-full"
              >
                {property?.photos &&
                  property?.photos.map((img, index) => (
                    <div
                      key={index}
                      className="w-[335px] h-full md:h-full md:w-full"
                    >
                      <Image
                        src={img?.url}
                        alt=""
                        width={393}
                        height={252}
                        className="w-[335px] h-[226.33px] md:h-full md:w-full object-cover realtive z-0"
                      />
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="flex flex-col px-4 pt-2 md:pt-5 gap-[5px] md:gap-[10px]">
              <div className="flex justify-between">
                <p className="text-[#006AFF] text-[20.66px] md:text-[21px] font-[700] leading-[28.98px] text-center">
                  {capitalizeFirstLetter(property?.name || property?.title)}
                </p>
                <p className={`hidden md:flex h-[25px] items-center justify-center text-[11px] font-[400] px-[12px] rounded-[4px] text-white bg-[#006AFF]
            ${property?.listingType ? "" : "hidden"}
            `}
                >
                  {capitalizeFirstLetter(property?.listingType)}
                </p>
              </div>

              <p className="text-[9px] md:text-[14px] font-[400] text-[#006AFF]">
                {capitalizeFirstLetter(property?.propertyType)}
              </p>
              <p className={`font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[11px] md:text-[16px] flex items-center
                 ${property?.totalFee ? "" : "hidden"}
              `}>
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
              <div className=" flex justify-between mb-2">
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
                  className="cursor-pointer"
                  href={{
                    pathname: "/user_homepage/PreviewProperty",
                    query: { property: property.slug },
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
      <button
        className="h-[48px] w-[189px] p-[12px] rounded-[4px] filterBorder text-[#006AFF] mx-auto block mt-10"
        onClick={() => {
          setLoadingII(true);
          reset()
        }
        }
      >
        View more properties
      </button>
    </div>
  );
};

export default MiniPropertyListings;

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
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
