"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Properties } from "../components/Properties";
import { fetchSingleProperty } from "@/api/propertyService";
import timeAgo from "@/utils/timeAgo";
import LoadingII from "@/components/mainmenu/loadingII";
import ImageModal from "../components/imageModal";
import useBodyScroll from "@/utils/useBodyScroll";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import GoogleMap from "@/utils/googleMap";
import OwnersCard from "./ownersCard";
import Amenities from "@/components/mainmenu/amenities";
import ExtraDetails from "@/components/mainmenu/extraDetails";
import { Carousel } from "flowbite-react";

const ViewProperty = ({ PropertyID }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabName, setTabName] = useState("Overview");

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
    // Update remainder state when combinedData length changes
    if (combinedData.length === 8) {
      setRemainder(combinedData.length - 7);
    }
  }, [combinedData]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const property = Properties.find(({ _id }) => _id === parseInt(PropertyID));
    setPropertyData(property);
  }, [PropertyID]);

  // console.log(combinedData);

  const openImageModal = (imageIndex, item) => {
    setSelectedImage({ index: imageIndex, data: combinedData, item: item });
    setOpenSelectedImage(!openSelectedImage);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };

  const slidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1278) return 3;
      if (window.innerWidth < 1000) return 1;
      if (window.innerWidth < 1279 && window.innerWidth > 999) return 2;
    }
    return 1;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow(), // Adjusted based on screen size
    className: "center",
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
    appendDots: (dots) => <div style={{ marginTop: "40px" }}>{dots}</div>,
  };

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
            <div className="sm:hidden my-4 w-full">
              <Slider {...sliderSettings}>
                {combinedData &&
                  combinedData?.map((item, index) => (
                    <div key={index} className="w-full">
                      <div className="h-[322px] w-[324px] mx-auto">
                        <Image
                          src={item.url}
                          alt=""
                          height={322}
                          width={324}
                          className={`rounded-md object-cover bg-center h-[322px] w-[324px]`}
                          layout="full"
                          objectFit="cover"
                          objectPosition="center"
                          quality={100}
                          priority
                        />
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
            <div className="hidden sm:block mt-6">
            <div className="flex  sm:flex-row gap-[13.97px] h-[472.69px] w-fit">
                <div className="w-[640.34px] h-full">
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

                <div className="grid sm:grid-cols-2 gap-[12px] ">
                  {combinedData &&
                    combinedData.slice(1, 5).map((item, index) => (
                      <div
                        key={item.id}
                        className=""
                        onClick={() => openImageModal(index, item)}
                      >
                        {/* {index === 0 || index <= 5 ? ( */}
                        <Image
                          src={item.url}
                          alt=""
                          width={160}
                          height={157}
                          className={`rounded-[9.81px] cursor-pointer object-cover bg-center w-[310.86px] h-[229.36px] `}
                          layout="full" // Specify the desired height
                          objectFit="cover"
                          objectPosition="center"
                          quality={100}
                          priority
                        />
                    
                      </div>
                    ))}
                </div>
              </div>
              {openSelectedImage && combinedData.length >= 1 && (
                <ImageModal
                  imageData={selectedImage.data}
                  onClose={closeImageModal}
                  totalImages={combinedData?.length}
                  currentImageIndex={currentImageIndex}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
              )}
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-[30px] mt-8 w-full">
              <div className=" w-[100%] flex flex-col gap-[12p] ">
                <div className="flex justify-between items-center ">
                  <div className="flex gap-3 items-center">
                    <p
                      className={`font-[700] md:text-[23px] md:leading-[28.98px] text-[18px] leading-[22.68px] text-[#4E4E4E]`}
                    >
                      {propertyData?.name || propertyData?.title}
                    </p>

                    <p className="text-[#006AFF] font-[500] md:leading-[24px] text-[13px] leading-[19.5px] flex md:text-[16px] px-[12px] bg-[#EEF5FF] items-center py-[8px]  rounded-[8px]">
                      {propertyData?.listingType &&
                      (propertyData?.listingType === "Sale" ||
                        propertyData?.listingType === "Rent")
                        ? `For ${propertyData?.listingType}`
                        : capitalizeFirstLetter(propertyData?.listingType)}
                      {/* {"For Rent"} */}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center border-b pb-4 mt-2">
                  <p className="flex gap-1 items-center">
                    <Image
                      src="/static/images/Location_Vector.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
                    />
                    <span className="md:leading-[21px] leading-[17.64px] text-[14px] font-[500] text-[#4E4E4E] min-w-[246px]">
                      {propertyData?.area}, {propertyData?.state}
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

                <div className="flex items-center  justify-between  pb-3 gap-[20p] border-b mt-5">
                  <p className=" text-[16px] md:font-[700] leading-[19.16px] font-[500] md:leading-[28.98px]  font-['Plus Jakarta Sans'] md:text-[23px] flex flex-col gap-1">
                    <span className="leading-[19.5px] font-400] text-[13px] text-[#202020]">
                      Total Price
                    </span>
                    <span className="pl-1">
                      ₦ {Number(propertyData?.price).toLocaleString()}{" "}
                    </span>
                  
                  </p>

                  <div className="flex gap-[20px] pt-8">
                    <p
                      className={`flex items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
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
                      <span>{propertyData?.numberOfRooms} Beds</span>
                    </p>
                    <p
                      className={`flex items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
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
                      <span>{propertyData?.numberOfBathrooms} Bathrooms</span>
                    </p>
                    <p
                      className={`flex items-center gap-[8px] font-[500] text-[#202020] sm:leading-[24px] ${
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
                      <span>{propertyData?.numberOfToilets} Toilet</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-3">
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
                        <p className="break-words leading-[21px] font-[500] text-[14px] text-[#4E4E4E] ">
                        {propertyData?.description}
                        </p>
                        <ExtraDetails
                          additionalDetails={additionalDetails}
                          propertyData={propertyData}
                        />
                      </>
                    )}
                  </div>
                  <div className="mb-4">

                  {tabName === "Amenities" && (
                    <Amenities amenities={amenities} />
                  )}


                  {tabName === "Map" && (
                    <div className="h-[556px] w-[100%]">
                      <GoogleMap addressData={"ikeja lagos"} />
                    </div>
                  )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-[24px]">
                <OwnersCard propertyData={propertyData && propertyData} />
              </div>
            </section>
          </>
        )
      )}
    </div>
  );
};

export default ViewProperty;
const otherPhotos = [
  "/static/images/Photo.png",
  "/static/images/imageHouseHP.png",
  "/static/images/house2.png",
  "/static/images/imageHouseHP.png",
  "/static/images/house2.png",
];

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
    base: "absolute top-1/2 left-1/2 block  -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-[160px] flex-shrink-0 transform cursor-default snap-center",
      on: "w-[161px] flex-shrink-0 transform cursor-grab snap-center",
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
      "hidden md:inline-block absolute  top-[12rem] left-2 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
    rightControl:
      " hidden md:inline-block absolute top-[12rem] right-11 flex h-[30px] w-[30px] items-center justify-center px-4 focus:outline-none",
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
