import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import trucateWord from "@/utils/trucateWord";
import { useRouter } from "next/navigation";
const MiniPropertyListings = ({
  Properties,
  width,
  padding,
  reset,
  setLoadingII,
}) => {
  const router = useRouter();
  return (
    <div className={`w-full sm:mt-5`}>
      <div className="text-[16px] flex justify-between w-full ">
        <p className="text-[#4E4E4E] md:text-[20px] font-[400] md:leading-[24px] ">
          Similar properties
        </p>
        <Link
          href="/user_homepage/PropertyListing"
          className="flex text-BlueHomz items-center gap-2 rounded px-2 py-1 text-[14px] font-[400] leading-[19.5px]"
        >
          <span>View All</span>
          <Image
            src="/static/images/blue-arrow-right.svg"
            alt=""
            width={16}
            height={16}
            className=""
          />
        </Link>
      </div>
      <div className="flex justify-between items-center sm:flex-nowrap flex-wrap md:gap-[16.43px] gap-[12px] my-4 sm:w-[235px] w-full">
        {Properties?.slice(0, 3)?.map((property, index) => (
          <div
            className={`flex flex-col sm:w-[245px] h-fit rounded-[12px] shadow-md w-full`}
            key={index}
          >
            <div
              className={`cursor-pointer sm:w-[245px] sm:h-[181.77px] rounded-[10px] w-full`}
            >
              {property?.photos.length > 0 ? (
                <Carousel
                  slide={false}
                  theme={customTheme}
                  className="w-full h-[181.77px] md:w-full"
                >
                  {property?.photos.map((img, index) => (
                    <Link
                      href={`/user_homepage/PreviewProperty/${property?.slug}`}
                      key={index}
                      className="w-full h-[181.77px] md:w-full"
                    >
                      <Image
                        src={img?.url}
                        alt=""
                        width={383}
                        height={181.77}
                        className="w-full h-[181.77px]   sm:object-cover retive z-0"
                      />
                    </Link>
                  ))}
                </Carousel>
              ) : (
                <Link
                  href={`/user_homepage/PreviewProperty/${property?.slug}`}
                  className="w-full h-[181.77px] md:w-full"
                >
                  <Image
                    src="/static/images/comingSoonImage.svg"
                    alt=""
                    width={393}
                    height={181.77}
                    className="w-full h-[181.77px]   sm:object-cover retive z-0"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col px-4 pt-2 md:pt-5 gap-[5px] md:gap-[6px]">
              <div className="flex justify-between">
                <Link
                  href={`/user_homepage/PreviewProperty/${property?.slug}`}
                  className="text-[#006AFF]  md:text-[16.59px] font-[700] leading-[20.9px] text-center"
                >
                  {trucateWord(capitalizeFirstLetter(property?.title), 12)}
                </Link>
                <Link
                  href={`/user_homepage/PreviewProperty/${property?.slug}`}
                  className={`hidden sm:flex h-[17.77px] items-center justify-center text-[7.93px] leading-[11.9px] font-[400] px-[8.66px] py-[2.89px] rounded-[4px] text-white bg-[#006AFF]
                 ${property?.listingType ? "" : "hidden"}
                   `}
                >
                  {capitalizeFirstLetter(property?.listingType)}
                </Link>
              </div>

              <p className="text-[9px] md:text-[10.1px] font-[400] text-[#006AFF]">
                {capitalizeFirstLetter(property?.propertyType)}
              </p>
              <p
                className={`font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[11px] md:text-[11.54px] 
                 ${property?.price ? "" : "hidden"}
                 `}
              >
                <span className="pl-1">
                  ₦{" "}
                  {property?.price
                    ? Number(property?.price).toLocaleString()
                    : ""}
                </span>
              </p>
              <p className="flex gap-1 items-center">
                <Image
                  src="/static/images/Location_Vector.svg"
                  alt=""
                  width={12}
                  height={15.85}
                  className="h-[12px] w-[12px] md:w-[8.66px] md:h-[11.43px]"
                />
                <span className="text-[10.1px] font-[500]">
                  {`${capitalizeFirstLetter(
                    property?.area
                  )}, ${capitalizeFirstLetter(property?.state)}`}
                </span>
              </p>
              <div className=" flex justify-between mb-2">
                <div className="flex  gap-4">
                  {property?.numberOfRooms && (
                    <p className="flex gap-1 items-center md:pt-4">
                      <Image
                        src="/static/images/bed_Vector.svg"
                        alt=""
                        width={17}
                        height={11.9}
                        className="h-[12px] w-[14px] md:w-[12.26px] md:h-[8.58px]"
                      />
                      <span className=" text-[6.98px] md:text-[7.21px] font-[500] leading-[10.82px] text-center font-['Plus Kakarta Sans']">
                        {property?.numberOfRooms === 1
                          ? `${property?.numberOfRooms} bedroom`
                          : `${property?.numberOfRooms} bedrooms`}
                      </span>
                    </p>
                  )}
                  {property?.numberOfBathrooms && (
                    <p className="flex gap-1 items-center md:pt-4">
                      <Image
                        src="/static/images/shower_Vector.svg"
                        alt=""
                        width={17}
                        height={11.9}
                        className="h-[12px] w-[14px] md:w-[10.1px] md:h-[9.09px]"
                      />
                      <span className=" text-[6.98px] md:text-[7.21px] font-[500] leading-[10.82px] text-center font-['Plus Kakarta Sans']">
                        {property?.numberOfBathrooms === 1
                          ? `${property?.numberOfBathrooms} bathroom`
                          : `${property?.numberOfBathrooms} bathrooms`}
                      </span>
                    </p>
                  )}
                  <p
                    className={`flex gap-1 items-center md:pt-4 ${
                      property?.squareMeter ? "" : "hidden"
                    }`}
                  >
                    <Image
                      src="/static/images/sqrtFeet-vector.svg"
                      alt=""
                      width={21}
                      height={11.86}
                      className="h-[12px] w-[14px] md:w-[13.89px] md:h-[6.13px]"
                    />
                    <span className=" text-[6.98px] md:text-[7.21px] font-[500] leading-[10.82px] text-center font-['Plus Kakarta Sans']">
                      {property?.squareMeter} Sqft
                    </span>
                  </p>
                </div>
                <Link
                  className="cursor-pointer"
                  href={`/user_homepage/PreviewProperty/${property?.slug}`}
                >
                  <Image
                    src="/static/images/arrow-in-circle.svg"
                    alt=""
                    width={28.85}
                    height={28.85}
                    className="h-[25.92px] w-[25.92px] md:w-[28.85px] md:h-[28.85px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <button
        className="h-[48px] w-[189px] p-[12px] rounded-[4px] filterBorder text-[#006AFF] mx-auto block mt-10"
        onClick={() => {
          setLoadingII(true);
          reset();
        }}
      >
        View more properties
      </button> */}
    </div>
  );
};

export default MiniPropertyListings;

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "hidden md:inline-block absolute  top-[5rem] left-4 flex h-[21px] w-0 items-center justify-center px- focus:outline-none",
    rightControl:
      " hidden md:inline-block absolute top-[5rem] right-4 flex h-[21px] w-[21px] items-center justify-center px- focus:outline-none",
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
    base: "hidden md:inline-flex h-[21px] w-[21px] items-center bg-[#292D32] justify-center rounded-full bg-opacity-10 hover:bg-opacity-100  group-focus:outline-none group-focus:ring-4 group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 ",
    icon: "h-3 w-2 text-white/60 dark:text-gray-800 group-hover:text-white sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
