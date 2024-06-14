import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "flowbite-react";
import api from "@/utils/api";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const FeaturedCard = () => {
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/public/properties/featured`);
      const propertyData = response?.data?.data || null;
      setFeaturedData(propertyData);
    };
    fetchData();
  }, []);
  const slidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1320) return 3;
      if (window.innerWidth < 1000) return 1;
      if (window.innerWidth < 1321 && window.innerWidth > 999) return 2;
    }
    return 1;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1, // Adjusted based on screen size
    className: "center",
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
    // appendDots: (dots) => <div style={{ marginTop: "40px" }}>{dots}</div>,
    appendDots: (dots) => (
      <div className=" ">
        <ul className="flex space-x-2"> {dots} </ul>
      </div>
    ),
  };

  const sliderSettingsII = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    className: "center",
    centerMode: true,
    centerPadding: "0%",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };
  return (
    <div className="flex flex-col items-center gap-[16px] rounded-[12px] bg-[#006AFF] text-white py-[20px] px-[20px] w-[100%] sm:h-[600px] ">
      <div className="text-[16px] flex justify-between w-full ">
        <p className="font-[500] leading-[24px] ">Featured Properties</p>
        <Link
          href="user_homepage/PropertyListing"
          className="hidden md:flex items-center gap-2 rounded px-2 py-1 text-[13px] font-[400] leading-[19.5px]"
        >
          <span>View All</span>
          <Image
            src="/static/images/white-right-arrow.svg"
            alt=""
            width={8}
            height={8}
            className=""
          />
        </Link>
      </div>

      <div className=" sm:w-[333px] sm:h-[480px] rounded-[12px] ">
        <Carousel
          theme={parentTheme}
        //   slide={false}
          className="rounded-[12px] sm:h-[478px] w-full"
        >
          {featuredData?.map((property, idx) => (
            <div
              className="rounded-[12px] w-full h-full sm:h-[478px]"
              key={idx}
            >
              <div className="w-[300px] sm:w-[320px] h-fit bg-white rounded-[12px] shadow-md mx-auto">
                <div className="cursor-pointer w-[300px] h-[252px] ">
                  <Carousel
                    slide={false}
                    theme={customTheme}
                    className="w-[300px] sm:w-[320px] h-[252px]"
                  >
                    {property?.property?.photos &&
                      property?.property?.photos.map((img, index) => (
                        <div
                          key={index}
                          className="w-[300px] sm:w-[320px] h-[252px]"
                        >
                          <Image
                            src={img?.url}
                            alt=""
                            width={343}
                            height={252}
                            className="w-[300px] sm:w-[320px] h-[252px] rounded-lg object-cover"
                          />
                          <p className="bg-[#EEF5FF] text-[#006AFF] rounded-[8px] py-[4px] px-[8px] absolute left-[241px] top-[12px] text-[11px] leading-[16.5px] font-[400]">
                            Featured
                          </p>
                        </div>
                      ))}
                  </Carousel>
                </div>
                <div className="flex flex-col px-6 py-4 justify-between h-[206px] rounded-b-[12px]">
                  <div className="flex justify-between items-center">
                    <p className="text-BlueHomz text-[23px] font-[700]">
                      {capitalizeFirstLetter(
                        property?.property?.name || property?.property?.title
                      )}
                    </p>
                    {property?.property?.listingType && (
                      <div className="bg-BlueHomz rounded-[4px] flex justify-center items-center w-[68px] h-[25px]">
                        <p className="text-white text-[11px] font-[400]">
                          {capitalizeFirstLetter(
                            property?.property?.listingType
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  {property?.property?.propertyType && (
                    <p className="text-blue-600 text-[14px] font-[400]">
                      {capitalizeFirstLetter(property?.property?.propertyType)}
                    </p>
                  )}
                  {property?.property?.price && (
                    <p className="text-[16px] font-[700] flex items-center">
                      <Image
                        src="/static/images/nairaIcon.svg"
                        alt=""
                        width={15}
                        height={25}
                        className="h-6 w-4"
                      />
                      <span className="pl-1 text-BlackHomz">
                        {Number(property?.property?.price).toLocaleString()}
                      </span>
                    </p>
                  )}
                  <p className="flex gap-1 items-center text-[14px] font-[500] text-BlackHomz">
                    <Image
                      src="/static/images/Location_Vector.svg"
                      alt=""
                      width={12}
                      height={16}
                      className="h-4 w-3"
                    />
                    {`${capitalizeFirstLetter(
                      property?.property?.area
                    )}, ${capitalizeFirstLetter(property?.property?.state)}`}
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-[500] text-BlackHomz">
                    <div className="flex gap-4 items-center text-[10px] text-gray-800">
                      {property?.property?.numberOfRooms && (
                        <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-1">
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
                        <div className="flex items-center gap-1">
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
                      href={`/user_homepage/PreviewProperty/${property?.property?.slug}`}
                    >
                      <button className="">
                        <Image
                          src="/static/images/arrow-in-circle.svg"
                          alt=""
                          width={30}
                          height={30}
                          className=""
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
      <Link href="user_homepage/PropertyListing">
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
      </Link>
    </div>
  );
};

export default FeaturedCard;

const parentTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "hidden md:inline-block absolute top-[rem] left-[-0.25rem] flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    rightControl:
      "hidden md:inline-block absolute top-[rem] right-7 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none transition-opacity duration-300",
    "&:hover $leftControl, &:hover $rightControl": {
      display: "inline-block",
    },
  },
  indicators: {
    active: {
      off: " bg-[#559CFF] hover:bg-white dark:bg-blue-600/50 dark:hover:bg-gray-800",
      on: " bg-[#EEF5FF] dark:bg-gray-800",
    },
    base: "h-[8px] w-[8px] rounded-full ",
    wrapper:
      "absolute bottom-[-25px] left-1/2 -translate-x-1/2  space-x-1 ",
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
      "hidden md:inline-block absolute top-[7rem] left-2 flex h-[30px] w-[30px] items-center justify-center  focus:outline-none transition-opacity duration-300",
    rightControl:
      "hidden md:inline-block absolute top-[7rem] right-6 flex h-[20px] w-[20px] items-center justify-center  focus:outline-none transition-opacity duration-300",
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
    base: "hidden md:inline-flex h-[30px] w-[30px] items-center bg-[#292D32] justify-center rounded-full bg-opacity-10 hover:bg-opacity-100  group-focus:outline-none group-focus:ring-4 group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-[30px] sm:w-[30px]",
    icon: "h-3 w-3 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
