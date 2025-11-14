"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Properties } from "../components/Properties";
import { fetchSingleProperty } from "@/api/propertyService";
import timeAgo from "@/utils/timeAgo";
import LoadingII from "@/components/mainmenu/loadingII";
import ImageModal from "@/components/mainmenu/imageModal";
import useBodyScroll from "@/utils/useBodyScroll";
import { useRouter } from "next/navigation";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
// import GoogleMap from "@/utils/googleMap";
import DOMPurify from "isomorphic-dompurify";
import OwnersCard from "./ownersCard";
import Amenities from "@/components/mainmenu/amenities";
import ExtraDetails from "@/components/mainmenu/extraDetails";
import { Carousel } from "flowbite-react";
import MapFrame from "@/utils/map";
import he from "he";

const ViewProperty = ({ PropertyID }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabName, setTabName] = useState("Overview");
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobileView = viewportWidth < 640;

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  useBodyScroll([openSelectedImage]);

  useEffect(() => {
    const propertyData = async () => {
      const response = await fetchSingleProperty(PropertyID);
      const property = await response;
      setPropertyData(property?.data);
      setLoading(false);
    };
    propertyData();
  }, [PropertyID]);

  useEffect(() => {
    if (propertyData && propertyData.coverPhoto && propertyData.photos) {
      const newData = {
        coverPhoto: propertyData.coverPhoto,
        photos: propertyData.photos,
      };
      const combinedData = [newData.coverPhoto, ...newData.photos].map(
        (item) => ({
          url: item.url,
        })
      );
      setCombinedData(combinedData); // Update combinedData state
    } else {
      // console.error("Invalid or missing data structure.");
    }
  }, [propertyData]);

  useEffect(() => {
    const property = Properties.find(({ _id }) => _id === parseInt(PropertyID));
    setPropertyData(property);
  }, [PropertyID]);

  const slicedData = isMobileView
    ? combinedData.slice(1, 4)
    : combinedData.slice(1, 5);

  const remainedImages = isMobileView
    ? combinedData.length - 4
    : combinedData.length - 5;
  let indexNumber = isMobileView ? 2 : 3;

  const openImageModal = (imageIndex, item) => {
    setSelectedImage({ index: imageIndex, data: combinedData, item: item });
    setOpenSelectedImage(!openSelectedImage);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };
  // console.log(propertyData);

  return (
    <div className="mt-[-10px] md:mt-0 md:pt-0 pb-10 px-6">
      <div className="flex md:justify-between items-center gap-[16px] md:gap-0">
        <div
          onClick={goBack}
          className="flex gap-2 items-center cursor-pointer"
        >
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            height={16}
            width={16}
            alt=""
            className="hidden md:block"
          />
          <p className="text-[11px] font-[400] hidden md:block">Go Back</p>
          <span className="md:hidden bg-[#EEF5FF] w-[28px] h-[28px] p-[4px] rounded-[8px]">
            <Image
              src="/static/images/blue-arrow-left.svg"
              width={20}
              height={20}
              alt=""
            />
          </span>
        </div>
        <Link
          href={`/dashboard/list_Property/edit_property/${propertyData?._id}`}
          className={`text-[14px] font-[400] text-BlueHomz ${
            propertyData ? "" : "hidden"
          }`}
        >
          <span className="hidden md:block">Edit Property</span>
          <span className="md:hidden items-center flex">
            <Image
              src="/static/images/edit.svg"
              width={24}
              height={24}
              alt=""
            />
          </span>
        </Link>
      </div>
      {loading ? (
        <LoadingII />
      ) : (
        propertyData && (
          <>
            <div className="block mt-6">
              {combinedData && combinedData.length > 0 ? (
                <div className="flex  sm:flex-row flex-wrap sm:flex-nowrap gap-[13.97px] sm:h-[472.69px] w-fit">
                  <div className="sm:w-[640.34px] sm:h-full w-full h-[174px]">
                    <Carousel
                      slide={false}
                      theme={mainTheme}
                      className="w-full h-full"
                    >
                      {combinedData.map((img, index) => (
                        <div key={index} className="w-full h-full">
                          <Image
                            src={img?.url || "/placeholder-image.png"}
                            alt={`Carousel image ${index}`}
                            height={450}
                            width={450}
                            className="rounded-md cursor-pointer object-cover bg-center h-full w-full"
                            quality={100}
                            priority
                            onClick={() => openImageModal(index, img)}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  {/* className=" absolute top-0 left-0 w-full h-full  " */}
                  <div className="grid sm:grid-cols-2 grid-cols-3  gap-[12px] ">
                    {combinedData &&
                      slicedData.map((item, index) => (
                        <div
                          key={item.id}
                          className="relative"
                          onClick={() => openImageModal(index, item)}
                        >
                          <Image
                            src={item.url}
                            alt=""
                            width={160}
                            height={157}
                            className={`cursor-pointer sm:rounded-[9.81px] rounded-[7.67px] w-[106.36px] h-[90px] sm:w-[310.86px] sm:h-[229.36px]`}
                            layout="full"
                            objectFit="cover"
                            objectPosition="center"
                            quality={100}
                            priority
                          />
                          {remainedImages > 0 && index === indexNumber && (
                            <div className="cursor-pointer sm:rounded-[9.81px] rounded-[7.67px] absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
                              <p className="text-[18px] font-[500] leading-[27px] text-white">
                                +{remainedImages} more
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="sm:rounded-[9.81px] rounded-[7.67px] w-fit sm:h-[470.69px]">
                  <Image
                    src="/static/images/noImagePreview2.png"
                    alt="no-image"
                    width={1290}
                    height={470}
                    className={`sm:rounded-[9.81px] rounded-[7.67px]  w-fit sm:h-[470.69px]`}
                    layout="full"
                    objectFit="cover"
                    objectPosition="center"
                    quality={100}
                    priority
                  />
                </div>
              )}
            </div>
            {openSelectedImage && combinedData.length >= 1 ? (
              <ImageModal
                imageData={selectedImage.data}
                onClose={closeImageModal}
                totalImages={combinedData?.length}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
              />
            ) : (
              <section className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[30px] mt-8 w-full">
                <div className=" w-[100%] flex flex-col gap-[12p] ">
                  <div className="flex justify-between items-center ">
                    <div className="flex sm:gap-4 gap-[12px] items-center">
                      <p
                        className={`font-[700] md:text-[23px] md:leading-[28.98px] text-[18px] leading-[22.68px] text-[#4E4E4E]`}
                      >
                        {propertyData?.name || propertyData?.title}
                      </p>
                      {/* <Image
                        src="/static/images/green_verify.svg"
                        alt=""
                        width={32}
                        height={32}
                      /> */}
                      <p className="hidden text-[#006AFF] font-[500] md:leading-[24px] text-[13px] leading-[19.5px] sm:flex md:text-[16px] px-[12px] bg-[#EEF5FF] items-center py-[4px]  rounded-[8px]">
                        {propertyData?.listingType &&
                        (propertyData?.listingType === "Sale" ||
                          propertyData?.listingType === "Rent")
                          ? `For ${propertyData?.listingType}`
                          : capitalizeFirstLetter(propertyData?.listingType)}
                      </p>
                    </div>
                  </div>
                  <div className=" hidden sm:flex gap-[12px] items-center border-b pb-4 mt-2">
                    <p className="flex gap-1 items-center">
                      <Image
                        src="/static/images/Location_Vector.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
                      />
                      <span className="md:leading-[21px] leading-[17.64px] text-[14px] font-[500] text-[#4E4E4E]">
                        {propertyData?.street}, {propertyData?.area},{" "}
                        {propertyData?.state}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center">
                      <Image
                        src="/static/images/lastseen.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
                      />
                      <span className="md:leading-[21px] leading-[17.64px] text-[14px] font-[500] text-[#A9A9A9]">
                        {timeAgo(propertyData?.createdAt)}
                      </span>
                    </p>
                  </div>

                  <div className="flex sm:items-center sm:flex-row flex-col  sm:justify-between  sm:pb-3 sm:gap-[15px] gap-[12px] sm:border-b mt-5">
                    <p className=" text-[16px] md:font-[700] leading-[19.16px] font-[500] md:leading-[28.98px]  font-['Plus Jakarta Sans'] md:text-[23px] flex flex-col gap-1">
                      <span className="sm:leading-[19.5px] leading-[16.5px] font-400] sm:text-[13px] text-[11px] text-[#202020]">
                        Total Price
                      </span>
                      <span className="sm:pl-1 font-[700] leading-[20.16px] flex justify-between">
                        <span className="">
                          ₦ {Number(propertyData?.price).toLocaleString()}{" "}
                        </span>
                        <span className="sm:hidden text-[#006AFF] font-[500]  text-[13px] leading-[19.5px]  px-[8px] bg-[#EEF5FF] text-center py-[4px]  rounded-[8px]">
                          {propertyData?.listingType &&
                          (propertyData?.listingType === "Sale" ||
                            propertyData?.listingType === "Rent")
                            ? `For ${propertyData?.listingType}`
                            : capitalizeFirstLetter(propertyData?.listingType)}
                        </span>
                      </span>
                    </p>

                    <div className="flex gap-[20px] sm:pt-8">
                      <p
                        className={`flex text-[12px] sm:text-[16px] leading-[19.5px] items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
                          propertyData?.numberOfRooms ? "" : "block"
                        }`}
                      >
                        <Image
                          src="/static/images/bed_Vector.svg"
                          alt=""
                          width={24}
                          height={16}
                          className="h-[16px] w-[16px] md:w-[24px] md:h-[16px] "
                        />
                        <span>
                          {propertyData?.numberOfRooms}
                          {propertyData?.numberOfRooms > 1 ? ` Beds` : " Bed"}
                        </span>
                      </p>
                      <p
                        className={`flex text-[12px] sm:text-[16px] leading-[19.5px] items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
                          propertyData?.numberOfBathrooms ? "" : "block"
                        }`}
                      >
                        <Image
                          src="/static/images/bathroom.svg"
                          alt=""
                          width={20}
                          height={18}
                          className="h-[16px] w-[16px] md:w-[20px] md:h-[18px] "
                        />
                        <span>
                          {propertyData?.numberOfBathrooms}
                          {propertyData?.numberOfBathrooms > 1
                            ? ` Bathrooms`
                            : " Bathroom"}
                        </span>
                      </p>
                      <p
                        className={`flex text-[12px] sm:text-[16px] leading-[19.5px] items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
                          propertyData?.numberOfToilets ? "" : "block"
                        }`}
                      >
                        <Image
                          src="/static/images/toilet.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
                        />
                        {propertyData?.numberOfToilets}
                        {propertyData?.numberOfToilets > 1
                          ? ` Toilets`
                          : " Toilet"}
                      </p>
                    </div>
                  </div>
                  <div className="sm:hidden flex  flex-col gap-2  py-4 ">
                    <p className="flex gap-1 items-center">
                      <Image
                        src="/static/images/Location_Vector.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                      <span className="leading-[21px] text-[14px] font-[500] text-[#4E4E4E] min-w-[246px]">
                        {propertyData?.street}, {propertyData?.area},{" "}
                        {propertyData?.state}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center">
                      <Image
                        src="/static/images/lastseen.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="h-[16px] w-[16px]"
                      />
                      <span className="leading-[21px] text-[14px] font-[500] text-[#A9A9A9]">
                        {timeAgo(propertyData?.createdAt)}
                      </span>
                    </p>
                  </div>
                  <div className="sm:hidden mb-5 space-y-2">
                    <OwnersCard propertyData={propertyData && propertyData} />
                    <ViewMetrics property={propertyData && propertyData} />
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="flex items-start gap-[8px]">
                      <button
                        className={`py-[8px] px-[12px] rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500] ${
                          tabName === "Overview" && "bg-BlueHomz text-white"
                        }`}
                        onClick={() => setTabName("Overview")}
                      >
                        Overview
                      </button>
                      <button
                        className={`py-[8px] px-[12px] rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500] ${
                          tabName === "Amenities" && "bg-BlueHomz text-white"
                        }`}
                        onClick={() => setTabName("Amenities")}
                      >
                        Amenities
                      </button>
                      <button
                        className={`py-[8px] px-[12px] rounded-[4px] h-[37px] text-[14px] leading-[21px] font-[500] ${
                          tabName === "Map" && "bg-BlueHomz text-white"
                        }`}
                        onClick={() => setTabName("Map")}
                      >
                        Map
                      </button>
                    </div>
                    <div className="">
                      {tabName === "Overview" && (
                        <>
                          <div
                            className="prose prose-lg max-w-none break-words leading-[21px] font-[500] sm:text-[14px] text-[13px] text-[#4E4E4E] pb-1"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                he.decode(propertyData?.description)
                              ),
                            }}
                          ></div>

                          <ExtraDetails
                            additionalDetails={additionalDetails}
                            propertyData={propertyData}
                          />
                        </>
                      )}
                    </div>
                    <div className="mb-4">
                      {tabName === "Amenities" && (
                        <Amenities amenities={propertyData?.amenities} />
                      )}

                      {tabName === "Map" && (
                        <div className="h-[556px] w-[100%]">
                          {/* <GoogleMap addressData={"ikeja lagos"} /> */}
                          <MapFrame
                            street={propertyData?.address}
                            area={propertyData?.area}
                            state={propertyData?.state}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col  gap-[24px]">
                  <OwnersCard propertyData={propertyData && propertyData} />

                  <ViewMetrics property={propertyData && propertyData} />
                </div>
              </section>
            )}
          </>
        )
      )}
    </div>
  );
};

export default ViewProperty;
const ViewMetrics = ({ property }) => {
  // console.log(property);
  return (
    <div className="grid grid-cols-3 gap-[10px]">
      <div className="sm:w-[100px] w-full sm:h-[92px] h-[73px] bg-[#EEF5FF] rounded-[8px] gap-[10px] flex flex-col items-start justify-start p-2">
        <p className="sm:text-[16px] text-[14px] font-[500] leading-[150%] text-[#202020]">
          {Number(property?.totalViews) || 0}
        </p>
        <p className="font-[500] text-[13px] leading-[150%] text-[#006AFF]">
          Views
        </p>
      </div>
      <div className="sm:w-[100px] w-full sm:h-[92px] h-[73px] bg-[#EEF5FF] rounded-[8px] gap-[10px] flex flex-col items-start justify-start p-2">
        <p className="sm:text-[16px] text-[14px] font-[500] leading-[150%] text-[#202020]">
          {Number(property?.totalCallClicks) || 0}
        </p>
        <p className="font-[500] text-[13px] leading-[150%] text-[#006AFF]">
          Call Clicks
        </p>
      </div>
      <div className="sm:w-[100px] w-full sm:h-[92px] h-[73px] bg-[#EEF5FF] rounded-[8px] gap-[10px] flex flex-col items-start justify-start p-2">
        <p className="sm:text-[16px] text-[14px] font-[500] leading-[150%] text-[#202020]">
          {Number(property?.totalMessages) || 0}
        </p>

        <p className="font-[500] text-[13px] sm:leading-[150%] leading-[120%] text-[#006AFF]">
          WhatsApp Messages
        </p>
      </div>
    </div>
  );
};

const amenities = [
  "air conditioning",
  "bathtub",
  "constant electricity",
  "kitchen shelve",
  "microwave",
  "parking space",
  "POP ceiling",
  "pre-Paid meter",
  "refrigerator",
  "tiled floor",
  "TV",
  "wardrobe",
  "washing machine",
  "water heater",
  "water supply",
  "wi-Fi",
  "gym",
  "garage",
  "air vent",
  "cable TV",
  "pool",
  "generator",
  "walk in closet",
  "pets allowed",
  "supermarket nearby",
  "airport nearby",
  "schools nearby",
  "hospitals nearby",
  "c of o",
  "building permit",
  "fence",
  "drainage",
  "sewer system",
  "road access",
  "public transit",
];

const additionalDetails = ["fully furnished", "newly Built", "serviced"];

const mainTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      " md:inline-block absolute  sm:top-[12rem] sm:left-2 top-[4rem] left-2 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
    rightControl:
      " md:inline-block absolute sm:top-[12rem] sm:right-11 top-[4rem] right-3 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
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
    base: " inline-flex h-[30px] w-[30px] items-center sm:bg-[#292D32] bg-[#D5D5D5] justify-center rounded-full sm:bg-opacity-10 bg-opacity-50 hover:bg-opacity-100  group-focus:outline-none sm:group-focus:ring-4 sm:group-focus:ring-white/30 dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60  dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-3 w-3 sm:text-white/60 text-white dark:text-gray-800 group-hover:text-white sm:h- sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-hidden scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
