import { Carousel } from "flowbite-react";
import Image from "next/image";
import React from "react";

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
const PropertyCarousel = ({ Properties }) => {
  return (
    <div>
      {Properties.slice(0, 1).map((property, index) => (
        <div
          className="flex flex-col w-[335px]  md:w-[373px] bg-white md:h-[458px] rounded-[12px] shadow-md"
          key={index}
        >
          <div
            className="cursor-pointer md:w-[373px] md:h-[252px] "
            // onClick={() => handleClearInputField("option4Qestion")}
          >
            <Carousel
              slide={false}
              theme={customTheme}
              className="w-[335px] h-[226.33px] md:h-full md:w-full"
            >
              {property.image &&
                property.image.map((img, index) => (
                  <div
                    key={index}
                    className="w-[335px] h-[22.33px] md:h-full md:w-full"
                  >
                    <Image
                      src={img}
                      alt=""
                      width={373}
                      height={252}
                      className="w-[335px] h-[226.33px] md:h-full md:w-full object-cover relative z-0"
                    />
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="flex flex-col px-4 pt-2 md:pt-5 gap-[5px] md:gap-[10px] ">
            <div className="flex justify-between">
              <p className="text-[#006AFF] text-[20.66px] md:text-[23px] font-[700] leading-[28.98px] text-center">
                {property.Location}
              </p>
              <p className="hidden md:block w-[68px] h-[25px] py-[4px] text-[11px] font-[400] px-[12px] rounded-[4px] text-white bg-[#006AFF]">
                {property.Status}
              </p>
            </div>

            <p className="text-[9px] md:text-[14px] font-[400] text-[#006AFF]">
              {property.Property_type}
            </p>
            <p className="font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[11px] md:text-[16px] flex items-center ">
              <Image
                src="/static/images/nairaIcon.svg"
                alt=""
                width={17}
                height={25}
                className="h-[12px] w-[12px] md:w-[15px] md:h-[25px]"
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
                className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px]"
              />
              <span className="text-[12.57px] md:text-[16px] font-[500] text-[#202020]">
                {property.Street}
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
                  <span className=" text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans'] text-[#202020]">
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
                    className="h-[12px] w-[14px] md:w-[17px] md:h-[11.9px]"
                  />
                  <span className="text-[#202020] text-[8.98px] md:text-[10px] font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
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
                  />
                  <span className=" text-[#202020] text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
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
                  className="h-[35.92px] w-[35.92px] md:w-[40px] md:h-[40px]"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCarousel;
