"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MiniPropertyListings from "../components/miniPropertyListings";
import timeAgo from "@/utils/timeAgo";
import { useRouter } from "next/navigation";
import { fetchSinglePropertyPublic } from "@/api/propertyService";
import api from "@/utils/api";
import LoadingII from "@/components/mainmenu/loadingII";
import ImageModal from "../components/imageModal";
import useBodyScroll from "@/utils/useBodyScroll";

const ViewProperty = ({ PropertyID }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSelectedImage, setOpenSelectedImage] = useState(false);
  useBodyScroll([openSelectedImage])
  const router = useRouter();
  const goBack = () => {
    router.back()
  };
  const [loading, setLoading] = useState(true);
  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });

  const [propertyData, setPropertyData] = useState([]);

  useEffect(() => {
    const propertyData = async () => {
      const response = await fetchSinglePropertyPublic(PropertyID);
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
      const combinedData = [newData.coverPhoto, ...newData.photos].map((item) => ({
        url: item.url,
      }));
      setCombinedData(combinedData);
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

  const [properties, setProperties] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(
        `/public/properties/others`)
      const propertyData = response?.data?.data || null
      setProperties(propertyData);
      setLoading(false);
    }
    fetchData()
  }, []);

  const openImageModal = (imageIndex, item) => {
    setSelectedImage({ index: imageIndex, data: combinedData, item: item });
    setOpenSelectedImage(!openSelectedImage);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setOpenSelectedImage(false);
  };

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

  const linkToSearch = () => {
    router.push("/user_homepage/PropertyListing")
  }

  return (
    <div>
      {loading ? <LoadingII /> : <div className="w-full pt-10 md:pt-8 pb-10 md:px-[120px] px-5">
        <div className="w-full flex md:justify-between items-center gap-[4rem] md:gap-0">
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
        </div>
        <div className="md:hidden mt-4 grid grid-cols-2">
          {combinedData &&
            combinedData?.map((item, index) => (
              <div key={index} className="my-2">
                <Image
                  src={item.url}
                  alt=""
                  height={161}
                  width={162}
                  className={`rounded-md cursor-pointer object-cover bg-center h-[120px] w-[180px]`}
                  layout="full" 
                  objectFit="cover"
                  objectPosition="center"
                  quality={100}
                  priority
                />
              </div>
            ))}
        </div>
        <div className="hidden xl:block mt-4 ml-3">
          <div className="flex flex-wrap gap-4">
            {combinedData &&
              combinedData?.map((item, index) => (
                <div
                  key={item.id}
                  className={` ${index === 0 ? "w-full flex-shrink-0" : "flex-grow"
                    }`}
                  onClick={() => openImageModal(index, item)}
                >
                  {index === 0 || index <= 5 ? (
                    <Image
                      src={item.url}
                      alt=""
                      height={index === 0 ? 368 : 161}
                      width={index === 0 ? 1110 : 162}
                      className={`rounded-md cursor-pointer object-cover bg-center h-[120px] w-[180px] ${index === 0 ? "w-full h-[368px]" : ""
                        }`}
                      layout="full" // Specify the desired height
                      objectFit="cover"
                      objectPosition="center"
                      quality={100}
                      priority
                    />
                  ) : index === 6 ? (
                    <div className="cursor-pointer relative inline-block rounded-md flex-grow">
                      <div className="bg-black opacity-[40%] absolute h-full w-full rounded-md text-[16px] font-[500] text-white flex justify-center items-center">
                        <p>+{remainder} more</p>
                      </div>
                      <Image
                        src={item.url}
                        alt=""
                        height={161}
                        width={162}
                        className="rounded-md"
                      />
                    </div>
                  ) : null}
                </div>
              ))}
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
        <div className="flex flex-col md:gap-[19px] pt-5 pb-3 gap-[20px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <p className={`font-[700] md:text-[23px] md:leading-[28.98px] text-[18px] leading-[22.68px] text-[#4E4E4E]`}>
                {propertyData?.name || propertyData?.title}
              </p>

              <p className="text-[#006AFF] font-[500] md:leading-[24px] text-[13px] leading-[19.5px] flex md:text-[16px] px-[8px] bg-[#EEF5FF] items-center h-[28px] md:h-[35px]  rounded-[8px]">
                {propertyData?.listingType && (propertyData?.listingType === "Sale" || propertyData?.listingType === "Rent") ? `For ${propertyData?.listingType}` : propertyData?.listingType}
                {/* {"For Rent"} */}
              </p>
            </div>
            {/* <button
              className="md:w-[128px] md:h-[37px] px-[12px] md:text-[14px] py-[8px] w-[335px] h-[42px] text-center rounded-[4px] bg-[#006AFF] text-[#FFFFFF] hidden md:block"
            >
              Contact Owner
            </button> */}
          </div>
          <p className=" text-[16px] md:font-[700] leading-[19.16px] font-[500] md:leading-[28.98px]  font-['Plus Jakarta Sans'] md:text-[23px] flex items-center ">
            <Image
              src="/static/images/NairaVector.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="pl-1">
              {Number(propertyData?.price).toLocaleString()}{" "}
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
                {propertyData?.area}, {propertyData?.state}
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
                {timeAgo(propertyData?.createdAt)}
              </span>
            </p>
          </div>

          {/* <button className="md:hidden md:h-[37px] px-[12px] md:text-[14px] py-[8px] w-[33%] h-[42px] text-center rounded-[4px] bg-[#006AFF] text-[#FFFFFF]">
            Contact Owner
          </button> */}
        </div>
        <div className="border-b pt-2 pb-3 ">
          <div className="flex flex-col my-2 gap-3">
            <div className={`flex  ${propertyData?.propertyType ? "" : "hidden"}`}>
              <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
                Property Type
              </p>
              <p className={`text-[14px] pl-2 font-[500] w-[40%] text-BlackHomz`}>
                {propertyData?.propertyType}
              </p>
            </div>
            <div className={`flex  ${propertyData?.state ? "" : "hidden"}`}>
              <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
                Address
              </p>
              <p className={`text-[14px] pl-2 font-[500] w-[40%] text-GrayHomz`}>
                {`${propertyData?.area}, ${propertyData?.state}`}
                ,&nbsp;
              </p>
            </div>
            <div className={`flex  ${propertyData?.numberOfRooms ? "" : "hidden"}`}>
              <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
                Rooms
              </p>
              <p className={`text-[14px] pl-2 font-[500] w-[40%] text-GrayHomz`}>
                {propertyData?.numberOfRooms}
              </p>
            </div>
            <div className={`flex  ${propertyData?.numberOfBathrooms ? "" : "hidden"}`}>
              <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
                Bathrooms
              </p>
              <p className={`text-[14px] pl-2 font-[500] w-[40%] text-GrayHomz`}>
                {propertyData?.numberOfBathrooms}
              </p>
            </div>
            <div className={`flex  ${propertyData?.numberOfToilets ? "" : "hidden"}`}>
              <p className="text-[14px] font-[400] text-GrayHomz md:w-[20%] md:leading-[21px]">
                Toilets
              </p>
              <p className={`text-[14px] pl-2 font-[500] w-[40%] text-GrayHomz`}>
                {propertyData?.numberOfToilets}
              </p>
            </div>
          </div>
        </div>
        <div className=" md:h-[91px] py-3 md:w-full w-[33%]">
          <p className="md:text-[14px] md:font-[500] md:leading-[21px] text-left text-[#4E4E4E] break-words">
            {propertyData?.description}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-4 md:h-[180px]  mb-10 ">
          <p className="text-[13px] font-[400] text-GrayHomz2">Property Owner</p>
          <div className="flex gap-2 items-center">
            <Image
              src={"/static/images/OwnerImagesTwo.png"}
              alt=""
              height={40}
              width={40}
              layout="full"
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[40px] rounded-full"
              quality={100}
              priority
            />

            <p className="text-[18px] font-[500] text-GrayHomz">
              {propertyData?.lisitingPropertyId?.fullName}
            </p>
          </div>
          <div className="flex gap-6 md:gap-16 flex-col md:flex-row">
            <div>
              <p className="text-[13px] font-[400] text-BlackHomz">
                Phone Number
              </p>
              <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                  {propertyData?.contacts?.phoneNumber}
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() =>
                    handleCopyClick(`${propertyData?.contacts?.phoneNumber}`, "phoneNumber")
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
                  {propertyData?.contacts?.email}
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
                      `${propertyData?.contacts?.email}`,
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
                  {propertyData?.contacts?.whatsapp
                    ? `${propertyData?.contacts?.whatsapp}`
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
                      `${propertyData?.contacts?.whatsapp}`,
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
        <MiniPropertyListings reset={linkToSearch} setLoadingII={setLoading} Properties={properties} padding={"md:px-0"} />
      </div>
      }
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
