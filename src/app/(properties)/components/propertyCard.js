"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../../components/mainmenu/button";
import { Carousel } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MiniPropertyListing from "../../../components/mainmenu/miniPropertyListings";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import LoadingII from "@/components/mainmenu/loadingII";
import Skeleton from "react-loading-skeleton";
import PropertySkeletonLoader from "@/components/general/skeletonLoader";
import trucateWord from "@/utils/trucateWord";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import PropertyRequest from "@/components/mainmenu/propertyRequest";
import { motion } from "framer-motion";
import usePropertyStore from "@/store/usePropertyStore";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, // Coming from bottom
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
  properties,
}) => {
  // console.log(Property);
  const router = useRouter();
  const { setFilters, setCurrentPage } = usePropertyStore();
  const currentProperties = Property;
  const [openPropertyReq, setOpenPropertyReq] = useState(false);
  const [OpenSuccessModal, setOpenSuccessModal] = useState(false);

  // endpoint for the views, clicks, and whatsApp messages
  const { mutate: updateMetrics } = useMutation({
    mutationFn: async ({ type, id }) => {
      return await api.post(`/properties/metric/${id}`, {
        type,
      });
    },
  });

  // Handler for "Explore Properties" button
  const handleExploreProperties = () => {
    setLoadingII(true);
    // Reset all filters
    setFilters({
      search: '',
      propertyType: null,
      minPrice: null,
      maxPrice: null,
      numberOfBathrooms: null,
      listingType: null, // null for /all page
    });
    setCurrentPage(1);
    // Navigate to /all
    router.push('/all');
  };

  const closeSaveToDraftModal = () => {
    setOpenSuccessModal(false);
    // router.back()
  };
  return (
    <div className="w-full">
      {loadingII ? (
        <LoadingII />
      ) : (
        <div className="w-full flex flex-col gap-[17px] px-6 md:px-[76px]">
          <div className="flex flex-col md:gap-1 gap-[-10px] w-full sm:items-start ">
            <h1 className="md:text-[23px] font-[700] leading-[28.98px] text-[#4E4E4E] md:mb-1">
              {Property && Property.length > 0
                ? ` Property`
                : "Property not found"}
            </h1>
            <p className="text-[#A9A9A9] text-[14px] md:text-[18px] font-[400] leading-[27px]   font-['Plus Jakarta Sans'] mb-2">
              {Property && Property.length > 0
                ? `${totalData} ${
                    Property.length > 1 ? " results found" : " result found"
                  }`
                : "We’re sorry, the property you searched for are unavailable"}
            </p>
          </div>
          {Property === null ? (
            <>
              <div className="w-full flex justify-center">
                <div className="h-[239px] md:mb-4 md:px-0 md:h-[303px] md:w-[1225px] rounded-[16px] bg-center bg-cover bg-[url('/Background_image.png')] bg-[#006AFF]">
                  <div className="h-[239px] md:h-[303px] rounded-[16px] flex flex-col items-center  gap-[15px] justify-center mb-2">
                    <p className="text-[18px] leading-[22.68px] px-4 text-center md:text-[36px] font-[700] md:leading-[45.36px] text-white">
                      Can’t find the property you’re looking for?
                    </p>
                    <p className="hidden md:block  text-[20px] font-[500] leading-[30px] text-white ">
                      Explore similar properties that suit your taste
                    </p>
                    <p className="text-[16px] leading-[20.16px] font-[400] px-3  md:hidden text-white ">
                      Explore similar properties
                    </p>
                    <div className="flex flex-col sm:flex-row w-full sm:w-auto px-4 sm:px-0 gap-2 mt-2">
                      <button
                        onClick={handleExploreProperties}
                        className=" rounded-[4px] md:h-[48px] bg-white text-[#006AFF] md:text-[16px] md:font-[700] md:leading-[24px] p-2 sm:p-[12px]"
                      >
                        Explore properties
                      </button>

                      <button
                        className=" md:h-[48px] border border-r-white text-white bg-[#006AFF] md:text-[16px] md:font-[500] md:leading-[24px] p-2 sm:p-[12px] rounded-[4px]"
                        onClick={() => setOpenPropertyReq(true)}
                      >
                        Post a Property Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <PropertyRequest
                isOpen={openPropertyReq}
                setOpenPropertyReq={setOpenPropertyReq}
                setOpenSuccessModal={setOpenSuccessModal}
              />
              <SuccessModal
                isOpen={OpenSuccessModal}
                title="Property Request Sent Successfully"
                handleEvent={closeSaveToDraftModal}
              />
              <MiniPropertyListing
                width={"md:w-[345px]"}
                reset={reset}
                setLoadingII={setLoadingII}
                updateMetrics={updateMetrics}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-full px- flex-col ">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]  mb-3 w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={currentPage}
                >
                  {loading ? (
                    <PropertySkeletonLoader count={9} />
                  ) : (
                    Property &&
                    currentProperties?.map((property, index) => (
                      <motion.div
                        className="flex flex-col w-full sm:w-[325px] md:w-[363px] md:h-[458px] rounded-[12px] shadow-md"
                        key={property._id || index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="cursor-pointer w-full h-[226.33px] md:h-[252px] rounded-t-[12px] relative overflow-hidden">
                          {loading ? (
                            <Skeleton height={252} count={5} />
                          ) : (
                            <>
                              {property?.photos.length > 0 ? (
                                <Carousel
                                  slide={false}
                                  theme={customTheme}
                                  className="w-full h-full"
                                >
                                  {property?.photos.map((img, index) => (
                                    <div
                                      key={index}
                                      className="w-full h-full"
                                    >
                                      <Link
                                        className="cursor-pointer block w-full h-full"
                                        href={`/property/${property?.slug}`}
                                        onClick={() =>
                                          updateMetrics({
                                            type: "view",
                                            id: property?._id,
                                          })
                                        }
                                      >
                                        <Image
                                          src={img?.url}
                                          alt=""
                                          width={363}
                                          height={252}
                                          className="w-full h-full object-cover relative z-0"
                                        />
                                      </Link>
                                    </div>
                                  ))}
                                </Carousel>
                              ) : (
                                <Link
                                  className="cursor-pointer block w-full h-full"
                                  href={`/property/${property?.slug}`}
                                  onClick={() =>
                                    updateMetrics({
                                      type: "view",
                                      id: property?._id,
                                    })
                                  }
                                >
                                  <Image
                                    src="/static/images/comingSoonImage.svg"
                                    alt=""
                                    width={363}
                                    height={252}
                                    className="w-full h-full object-cover relative z-0"
                                  />
                                </Link>
                              )}
                            </>
                          )}
                          {/* <p className="bg-[#CDEADD] rounded-full w-[24.75px] h-[24.75px] absolute sm:left-[322px] top-[14px] left-[289px]  flex items-center justify-center  ">
                            <Image
                              src="/static/images/green_verify.svg"
                              alt=""
                              width={20.62}
                              height={20.63}
                            />
                          </p> */}
                          {/* {sponsored && ( */}

                          {property?.is_promoted && (
                            <p className=" absolute sm:left-[252px] left-[200px] top-[14px] w-fit bg-[#006AFF]  py-[4px] px-[6px] rounded-[8px] flex items-center gap-[2px] ">
                              <Image
                                src="/static/images/white-medal-star.svg"
                                alt=""
                                width={10}
                                height={10}
                                className=""
                              />
                              <span className="font-[500] text-[11px] text-[#EEF5FF] leading-[16.5px]">
                                Sponsored
                              </span>
                            </p>
                          )}
                          {/* )} */}
                        </div>
                        <Link
                          className="flex flex-col px-4 pt-4 md:pt-5 gap-[5px] md:gap-[10px]"
                          href={`/property/${property?.slug}`}
                          onClick={() =>
                            updateMetrics({ type: "view", id: property?._id })
                          }
                        >
                          <div className="flex justify-between">
                            <p className="text-[#006AFF] text-[19.66px] sm:text-[22px] font-[700] leading-[28.98px] text-center">
                              {trucateWord(
                                capitalizeFirstLetter(
                                  property?.name || property?.title
                                ),
                                15
                              )}
                            </p>
                            <p
                              className={` w-auto h-[25px] flex items-center justify-center text-[11px] font-[400] px-[12px] rounded-[4px] text-white bg-[#006AFF] ${
                                property?.listingType ? "" : "hidden"
                              }`}
                            >
                              {capitalizeFirstLetter(property?.listingType)}
                            </p>
                          </div>

                          <p className="text-[12.57px] md:text-[14px] font-[400] text-[#006AFF]">
                            {capitalizeFirstLetter(property?.propertyType)}
                          </p>
                          <p
                            className={`font-[700] leading-[24px]  font-['Plus Jakarta Sans'] text-[11px] md:text-[16px] flex items-center ${
                              property?.price ? "" : "hidden"
                            }`}
                          >
                            <Image
                              src="/static/images/nairaIcon.svg"
                              alt=""
                              width={17}
                              height={25}
                              className="h-[12px] w-[12px] md:w-[15px] md:h-[25px]"
                            />
                            <span className="pl-1">
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
                              className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px]"
                            />
                            <span className="text-[12.57px] md:text-[16px] font-[500]">
                              {`${capitalizeFirstLetter(
                                property?.area
                              )}, ${capitalizeFirstLetter(property?.state)}`}
                            </span>
                          </p>
                          <div className="h-full flex justify-between mb-4">
                            <div className="flex  gap-4">
                              {property?.numberOfRooms && (
                                <p className="flex gap-1 items-center md:pt-4">
                                  <Image
                                    src="/static/images/bed_Vector.svg"
                                    alt=""
                                    width={17}
                                    height={11.9}
                                    className="h-[12px] w-[14px] md:w-[17px] md:h-[11.9px]"
                                  />
                                  <span className=" text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
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
                                    className="h-[12px] w-[14px] md:w-[17px] md:h-[11.9px]"
                                  />
                                  <span className="text-[8.98px] md:text-[10px] font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
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
                                />
                                <span className="text-[8.98px] md:text-[10px]font-[500] leading-[15px] text-center font-['Plus Kakarta Sans']">
                                  {property?.squareMeter} Sqft
                                </span>
                              </p>
                            </div>
                            <p className="cursor-pointer ">
                              <Image
                                src="/static/images/arrow-in-circle.svg"
                                alt=""
                                width={40}
                                height={40}
                                className="h-[35.92px] w-[35.92px] md:w-[40px] md:h-[40px]"
                              />
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  )}
                </motion.div>
                {
                  <Button
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
      )}
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
