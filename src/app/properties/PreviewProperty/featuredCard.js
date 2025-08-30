import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import api from "@/utils/api";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import trucateWord from "@/utils/trucateWord";

const FeaturedCard = ({ updateMetrics }) => {
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/public/properties/featured`);
      const propertyData = response?.data?.data || null;
      setFeaturedData(propertyData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-[16px] rounded-[12px] bg-[#006AFF] text-white py-[20px] px-[20px] w-[100%] sm:h-[600px] h-[443px]">
      <div className=" flex justify-between w-full   flex-nowrap">
        <p className="font-[500] leading-[24px] sm:text-[16px] text-[13px] ">
          Featured Properties
        </p>
        <Link
          href="/properties/PropertyListing"
          className="flex items-center gap-2 rounded px-2 py-1 sm:text-[13px] text-[11.5px] font-[400] leading-[19.5px]"
        >
          <span>View All</span>
          <Image
            src="/static/images/white-right-arrow.svg"
            alt=""
            width={6}
            height={6}
            // className="sm:w-[8px] sm:h-[8px] w-[8px] h-[8px]"
          />
        </Link>
      </div>

      <div className=" sm:w-[333px] sm:h-[460px] rounded-[12px] w-full h-[331px]">
        <Carousel
          theme={parentTheme}
          // slide={false}
          className="rounded-[12px] sm:h-[460px] w-full h-full"
        >
          {featuredData?.map((property, idx) => (
            <div
              className="rounded-[12px] w-full h-full sm:h-[460px]"
              key={idx}
            >
              <div className="w-full sm:w-[320px] h-full bg-white rounded-[12px] shadow-md mx-auto">
                <div className="cursor-pointer sm:w-[300px] sm:h-[252px] w-full h-[182px]">
                  <Carousel
                    slide={false}
                    theme={customTheme}
                    className="w-full h-full sm:w-[320px] sm:h-[252px]"
                  >
                    {property?.property?.photos &&
                      property?.property?.photos.map((img, index) => (
                        <Link
                          href={`/properties/PreviewProperty/${property?.property?.slug}`}
                          key={index}
                          className="w-full sm:w-[320px]  h-full"
                          onClick={() => updateMetrics("call")}
                        >
                          <Image
                            src={img?.url}
                            alt=""
                            width={343}
                            height={252}
                            className="w-full sm:w-[320px] h-[252px]  object-cover"
                          />
                          <p className="bg-[#EEF5FF] text-[#006AFF] rounded-[8px] py-[4px] px-[8px] absolute left-[75%] sm:left-[241px] top-[12px] text-[11px] leading-[16.5px] font-[400]">
                            Featured
                          </p>
                        </Link>
                      ))}
                  </Carousel>
                </div>
                <div className="flex w-full flex-col sm:px-6 py-4 px-3 justify-between h-fit rounded-b-[12px] gap-[7.43px] sm:gap-[12px]">
                  <div className="flex w-full justify-between items-center">
                    <Link
                      href={`/properties/PreviewProperty/${property?.property?.slug}`}
                      className="text-BlueHomz sm:text-[23px] font-[700] text-[16.59px] sm:leading-[28.98px] leading-[20.9px]"
                      onClick={() => updateMetrics("call")}
                    >
                      {trucateWord(
                        capitalizeFirstLetter(
                          property?.property?.name || property?.property?.title
                        ),
                        12
                      )}
                    </Link>
                    {property?.property?.listingType && (
                      <p className="text-white sm:text-[11px] text-[7.93px] font-[400] sm:py-[4px] sm:px-[12px] bg-BlueHomz rounded-[4px] flex justify-center items-center py-[2.89px] px-[8.66px]">
                        {capitalizeFirstLetter(property?.property?.listingType)}
                      </p>
                    )}
                  </div>
                  {property?.property?.propertyType && (
                    <p className="text-blue-600 sm:text-[14px] font-[400] w-fit text-[10.1px]">
                      {capitalizeFirstLetter(property?.property?.propertyType)}
                    </p>
                  )}
                  {property?.property?.price && (
                    <p className=" text-BlackHomz text-[11.54px] sm:text-[16px] font-[700] w-fit">
                      <span style={{ fontFamily: "Arial" }}>₦</span>{" "}
                      {Number(property?.property?.price).toLocaleString()}
                    </p>
                  )}
                  <p className="flex gap-1 items-center sm:text-[14px] text-[10.1px] font-[500] text-BlackHomz  w-fit">
                    <Image
                      src="/static/images/Location_Vector.svg"
                      alt=""
                      width={12}
                      height={16}
                      className="sm:h-4 sm:w-3 h-[11.43px] w-[8.66px]"
                    />
                    {`${capitalizeFirstLetter(
                      property?.property?.area
                    )}, ${capitalizeFirstLetter(property?.property?.state)}`}
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-[500] text-BlackHomz">
                    <div className="flex gap-4 items-center text-[10px] text-gray-800">
                      {property?.property?.numberOfRooms && (
                        <div className="flex items-center gap-1 sm:text-[10px] text-[9px] w-fit">
                          <Image
                            src="/static/images/bed_Vector.svg"
                            alt=""
                            width={17}
                            height={12}
                            className="h-4 w-4"
                          />
                          {property?.property?.numberOfRooms === 1
                            ? `${property?.property?.numberOfRooms} bedroom`
                            : `${property?.property?.numberOfRooms} bedrooms`}
                        </div>
                      )}
                      {property?.property?.numberOfBathrooms && (
                        <div className="flex items-center gap-1 sm:text-[10px] text-[9px]">
                          <Image
                            src="/static/images/shower_Vector.svg"
                            alt=""
                            width={17}
                            height={12}
                            className="h-4 w-4"
                          />
                          {property?.property?.numberOfBathrooms === 1
                            ? `${property?.property?.numberOfBathrooms} bathroom`
                            : `${property?.property?.numberOfBathrooms} bathrooms`}
                        </div>
                      )}
                      {property?.property?.squareMeter && (
                        <div className="flex items-center gap-1 sm:text-[10px] text-[9px]">
                          <Image
                            src="/static/images/sqrtFeet-vector.svg"
                            alt=""
                            width={21}
                            height={12}
                            className="h-4 w-5"
                          />
                          {property?.property?.squareMeter} Sqft
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/properties/PreviewProperty/${property?.property?.slug}`}
                      onClick={() => updateMetrics("call")}
                    >
                      <button className="">
                        <Image
                          src="/static/images/arrow-in-circle.svg"
                          alt=""
                          width={30}
                          height={30}
                          className="w-[25.85px] h-[25.85px] sm:w-[30px] sm:h-[30px]"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* <Link href="properties/PropertyListing">
        <button className="md:hidden mt-10 mb-8 border border-white px-4 py-2 rounded text-[13px] font-[500] flex gap-1 items-center">
          <span>View All</span>
          <Image
            src="/static/images/white-right-arrow.svg"
            alt=""
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>
      </Link> */}
    </div>
  );
};

export default FeaturedCard;

const parentTheme = {
  root: {
    base: "relative h-full w-full ",
    leftControl:
      "hidden md:inline-block mt-5 absolute top-[rem] left-[-0.25rem] flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    rightControl:
      "hidden md:inline-block mt-5 absolute top-[rem] right-7 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    "&:hover $leftControl, &:hover $rightControl": {
      display: "inline-block",
    },
  },
  indicators: {
    active: {
      off: " bg-[#559CFf] hover:bg-white dark:bg--600/50 dark:hover:bg-gray-800 ",
      on: " bg-[#EEF5FF] dark:bg-gray-800",
    },
    base: "h-[8px] w-[8px] rounded-full ",
    wrapper:
      "absolute sm:bottom-[-40px] bottom-[-25px] w-fit  items-center flex justify-center  sm:left-1/2 left-[150px] -translate-x-1/2  space-x-1 ",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "hidden md:inline-flex h-[20px] w-[20px] px-2 items-center bg-[#292D32] justify-center border rounded-[8px] bg-opacity-10 hover:bg-opacity-50  group-focus:outline-none group-focus:ring-1 border-[#559CFF] group-focus:ring-[#EEF5FF] dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-[30px] sm:w-[30px]",
    icon: "h-3 w-3 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      " inline-block absolute top-[5rem] left-3  sm:top-[7rem] sm:left-6 flex h-[15px] w-[15px] items-center justify-center  focus:outline-none transition-opacity duration-300",
    rightControl:
      " inline-block absolute top-[5rem] right-3 sm:top-[7rem] sm:right-6 flex h-[15px] w-[15px] items-center justify-center  focus:outline-none transition-opacity duration-300",
    "&:hover $leftControl, &:hover $rightControl": {
      display: "inline-block",
    },
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
    base: " inline-flex h-[20px] w-[20px] items-center bg-[#292D32] justify-center rounded-full sm:bg-opacity-10 bg-opacity-70 hover:bg-opacity-100  group-focus:outline-none sm:group-focus:ring-4 sm:group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-3 w-3 sm:text-white/60 text-white dark:text-gray-800 group-hover:text-white sm:h- sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
