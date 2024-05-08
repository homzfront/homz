"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";
import { Properties2 } from "../components/previewProperties";
import { Properties } from "../components/Properties";
import Lightbox from "yet-another-react-lightbox";
import {
  Captions,
  Thumbnails,
  Download,
  Zoom,
  Counter,
  Fullscreen,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import MiniPropertyListings from "../components/miniPropertyListings";

const ViewProperty = ({ PropertyID }) => {
  const [open, setOpen] = useState(false);

  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });
  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const property = Properties2.find(
      ({ _id }) => _id === parseInt(PropertyID)
    );
    setPropertyData(property);
  }, [PropertyID]);

  const handleCopyClick = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
      setTimeout(
        () =>
          setCopiedState((prevState) => ({
            ...prevState,
            [identifier]: false,
          })),
        2000
      );
    } catch (error) {
      // console.error("Unable to copy to clipboard:", error);
    }
  };
  const otherPhotos = Array.isArray(propertyData?.Photos?.otherPhotos)
    ? propertyData.Photos.otherPhotos
    : [];
  return (
    <div className="w-full pt-10 md:pt-8 pb-10 md:px-[120px] px-5">
      <div className="w-full flex md:justify-between items-center gap-[4rem] md:gap-0">
        <Link
          href="/user_homepage/PropertyListing"
          className="flex gap-2 items-center"
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
        </Link>
      </div>
      <div className="flex flex-col gap-[12px] pt-7">
        <div className="md:w-full md:h-[368px] w-[33%] h-[174px]">
          <Image
            src={propertyData?.Photos?.coverPhoto}
            alt=""
            height={368}
            width={1110}
            className="w-full h-full  rounded-[12px] cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
        <Lightbox
          open={open}
          plugins={[Thumbnails, Zoom, Counter, Fullscreen]}
          close={() => setOpen(false)}
          slides={[
            {
              srcSet: otherPhotos.map((photo) => ({
                src: photo,
                width: 1110,
                height: 752,
              })),
            },
            ...otherPhotos.map((photo) => ({
              src: photo,
              alt: "",
              width: 1110,
              height: 752,
              srcSet: [{ src: photo, width: 1110, height: 752 }],
            })),
          ]}
        />

        <div className="md:flex justify-evenly items-center hidden min-w-min">
          {propertyData?.Photos?.otherPhotos.map((photo, index) => (
            <Image
              src={photo}
              alt=""
              height={160.2}
              width={160.2}
              className="h-[157.41px] w-[156px] md:w-[150.2px] md:h-[150.2px] md:rounded-[9.81px] rounded-[11.24px] "
              key={index}
            />
          ))}
        </div>
        <Carousel
          slide={true}
          theme={customTheme}
          className="w-[33%] h-[156.06px] md:hidden"
        >
          {propertyData?.Photos?.otherPhotos.map((img, index) => (
            <div key={index} className="w-[156px] h-[157.41px]">
              <Image
                src={img}
                alt=""
                height={157.41}
                width={156}
                className="h-[157.41px] w-[156px] rounded-[11.24px] "
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col md:gap-[19px] pt-5 pb-3 gap-[20px] ">
        <div className="flex justify-between items-center">
          <p className="font-[700] md:text-[23px] md:leading-[28.98px] text-[18px] leading-[22.68px] text-[#4E4E4E]">
            {propertyData?.PropertyInfo?.Property_type}
          </p>
        </div>
        <p className=" text-[16px] md:font-[700] leading-[19.16px] font-[500] md:leading-[28.98px]  font-['Plus Jakarta Sans'] md:text-[23px] flex items-center ">
          <Image
            src="/static/images/NairaVector.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="pl-1">
            {Number(propertyData?.PropertyInfo?.Price).toLocaleString()}{" "}
          </span>
          <span className="text-[16px] font-[400] md:text-[18px] md:font-[500] ml-1 pt-1 text-[#4E4E4E]">
            per year
          </span>
        </p>
        <div className="flex gap-2 items-center">
          <p className="flex gap-1 items-center">
            <Image
              src="/static/images/location.svg"
              alt=""
              width={24}
              height={24}
              className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
            />
            <span className="md:leading-[21px] leading-[17.64px] text-[14px] font-[500] text-[#A9A9A9]">
              {propertyData?.PropertyInfo?.Area}
            </span>
          </p>
          <p className="flex gap-1 items-center">
            <Image
              src="/static/images/location.svg"
              alt=""
              width={24}
              height={24}
              className="h-[16px] w-[16px] md:w-[24px] md:h-[24px] "
            />
            <span className="md:leading-[21px] leading-[17.64px] text-[14px] font-[500] text-[#A9A9A9]">
              {/* {property.PropertyInfo.Area} */}
              Posted 4 hours ago
            </span>
          </p>
        </div>

        <button className="md:w-[128px] md:h-[37px] px-[12px] md:text-[14px] py-[8px] w-[33%] h-[42px] text-center rounded-[4px] bg-[#006AFF] text-[#FFFFFF]">
          Contact Owner
        </button>
      </div>
      <div className="border-b pt-2 pb-3 ">
        <div className="flex flex-col my-2 gap-3">
          <div className="flex">
            <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
              Property Type
            </p>
            <p className={`text-[14px] font-[500] w-[40%] text-BlackHomz`}>
              {propertyData?.PropertyInfo?.Property_type}
            </p>
          </div>
          <div className="flex">
            <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
              Address
            </p>
            <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
              {`${propertyData?.PropertyInfo?.Area}, ${propertyData?.PropertyInfo?.State}`}
              ,&nbsp;
            </p>
          </div>
          <div className="flex">
            <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
              Rooms
            </p>
            <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
              {propertyData?.PropertyInfo?.Bedrooms}
            </p>
          </div>
          <div className="flex">
            <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
              Bathrooms
            </p>
            <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
              {propertyData?.PropertyInfo?.Bathroom}
            </p>
          </div>
          <div className="flex">
            <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
              Toilets
            </p>
            <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
              {propertyData?.PropertyInfo?.Toilets}
            </p>
          </div>
        </div>
      </div>
      <div className=" md:h-[91px] py-3 md:w-full w-[33%]">
        <p className="md:text-[14px] md:font-[500] md:leading-[21px] text-left text-[#4E4E4E] break-words">
          {propertyData?.PropertyInfo?.Description}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-4 md:h-[180px]  mb-10 ">
        <p className="text-[13px] font-[400] text-GrayHomz2">Landlord</p>
        <div className="flex gap-2 items-center">
          <Image
            src={"/static/images/OwnerImagesTwo.png"}
            alt=""
            height={40}
            width={40}
            layout="full" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[40px] rounded-full"
            quality={100}
            priority
          />

          <p className="text-[18px] font-[500] text-GrayHomz">
            {propertyData?.PropertyInfo?.Title}
          </p>
        </div>
        <div className="flex gap-6 md:gap-16 flex-col md:flex-row">
          <div>
            <p className="text-[13px] font-[400] text-BlackHomz">
              Phone Number
            </p>
            <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
              <p className="text-[14px] font-[500] text-BlueHomz">
                {propertyData?.contactInfo?.PhoneNumber}
              </p>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/propertyList/copy.png"
                }
                width={16}
                height={17}
                alt=""
                onClick={() =>
                  handleCopyClick(`${"09076543276"}`, "phoneNumber")
                }
                className="cursor-pointer"
              />
            </div>
            <div>
              {copiedState.phoneNumber && (
                <div className="italic text-[12px] text-Success">Copied</div>
              )}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-[400] text-BlackHomz">Email</p>
            <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
              <p className="text-[14px] font-[500] text-BlueHomz">
                {propertyData?.contactInfo?.Email}
              </p>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/propertyList/copy.png"
                }
                width={16}
                height={17}
                alt=""
                onClick={() =>
                  handleCopyClick(
                    `${propertyData?.contactInfo?.Email}`,
                    "email"
                  )
                }
                className="cursor-pointer"
              />
            </div>
            <div>
              {copiedState.email && (
                <div className="italic text-[12px] text-Success">Copied</div>
              )}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-[400] text-BlackHomz">
              WhatsApp Link
            </p>
            <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
              <p className="text-[14px] font-[500] text-BlueHomz">
                {propertyData?.contactInfo?.WhatsAppLink
                  ? `${propertyData?.contactInfo?.WhatsAppLink}`
                  : ""}
              </p>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/propertyList/copy.png"
                }
                width={16}
                height={17}
                alt=""
                onClick={() =>
                  handleCopyClick(
                    `${propertyData?.contactInfo?.WhatsAppLink}`,
                    "whatsAppNumber"
                  )
                }
                className="cursor-pointer"
              />
            </div>
            <div>
              {copiedState.whatsAppNumber && (
                <div className="italic text-[12px] text-Success">Copied</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MiniPropertyListings Properties={Properties} padding={"md:px-0"}/>
    </div>
  );
};

export default ViewProperty;


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
