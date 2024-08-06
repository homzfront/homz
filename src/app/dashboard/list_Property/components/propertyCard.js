"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, useTransition } from "react";
import PromotionHooks from "@/utils/promoteProperty";
import { useRouter } from "next/navigation";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import CardMenus from "./cardMenu";
import formatDate from "@/utils/formatDate";

const PropertyCard = ({
  Property,
  selectedProperty,
  setSelectedProperty,
  promoteOptions,
  refreshData,
  setOpenPlanModal,
  setPromotePropertry
}) => {
  const ITEMS_PER_PAGE = 8;
  const [publish, setPublish] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Property?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = Property?.slice(startIndex, endIndex);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePromo, setActivePromoted] = useState(false);
  const [deleteProperty, setDeleteProperty] = useState(false);
  const [propertyDeleted, setPropertyDeleted] = useState(false);
  const [unpublishProperty, setUnpublisProperty] = useState(false);
  const [stopPromote, setStopPromotion] = useState(false);
  const [promotionStoppedModal, setPromotionStoppedModal] = useState(false);
  const [propertyUnpublished, setPropertyUnpublished] = useState(false);
  const [isLoading, setLoader] = useState(false);

  const popUp = useRef(null);
  const router = useRouter();
  // console.log(Property);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUp.current && !popUp.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCheckboxChange = (property, is_promoted) => {
    if (is_promoted) {
      setActivePromoted(true);
      return;
    }

    setSelectedProperty((prevSelected) =>
      prevSelected.includes(property)
        ? prevSelected.filter((item) => item !== property)
        : [...prevSelected, property]
    );
  };
  const handleDeleteProperty = () => {
    setDeleteProperty(false);
    setPropertyDeleted(true);
  };
  const handleUnpublishProperty = () => {
    setUnpublisProperty(false);
    setPropertyUnpublished(true);
  };
 
  const handleStopPropertyPromotion = async () => {
    setLoader(true);
    try {
      const results = await PromotionHooks.stopSinglePromotion(selectedDataId);
      if (results.status === true) {
        setLoader(false);
        setPromotionStoppedModal(true);
        setStopPromotion(false);
      } else {
        setLoader(false);
        return;
      }
      // console.log(results);
    } catch (error) {
      console.error("Error Stopping the promotion:", error);
      setLoader(false);
    }
  };
  const closeSuccessModal = () => {
    setPropertyUnpublished(false);
    setPropertyDeleted(false);
    setActivePromoted(false);
  };

  const handlePromotionStop = () => {
    refreshData();
    setPromotionStoppedModal(false);
  };
  const handleUnpublished = () => {
    setUnpublisProperty(true);
  };
  const handlePublished = () => {};
  const handleMenuToggle = (index) => {
    setSelectedDataId(index);
    setIsMenuOpen(!isMenuOpen);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="w-full flex flex-col gap-[64px] mt-6 sm:justify-center sm:items-center h-fit">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-fit">
        {currentProperties.map((property, index) => (
          <div
            className=" relative flex flex-col h-fit w-full md:w-[234px] md:h-[313px] rounded-[12px] shadow-md"
            key={index}
          >
            <div className="cursor-pointer w-full md:w-[234px] h-[168px] rounded-[10px] ">
              <div className=" relative h-[168px] md:h-full w-full">
                <Link
                  className="cursor-pointer text-[14px]"
                  href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
                >
                  <Image
                    src={
                      property?.coverPhoto?.url
                        ? property.coverPhoto.url
                        : "/static/images/comingSoonImage.svg"
                    }
                    alt=""
                    width={264}
                    height={168}
                    className="w-[100%] h-full md:w-full object-cover relative z-0 rounded-t-[12px]"
                  />
                </Link>

                {/* <p className="bg-[#CDEADD] rounded-full w-[24px] h-[24px] absolute  left-[305px] sm:left-[205px] flex items-center justify-center top-[14px] ">
                  <Image
                    src="/static/images/green_verify.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </p> */}
                {property?.is_published && (
                  <p className="bg-[#CDEADD] text-[#039855] rounded-[8px] py-[4px] px-[8px] absolute left-[250px] sm:left-[150px] top-[14px] text-[11px] leading-[16.5px] font-[400]">
                    Published
                  </p>
                )}

                {/* <p className="bg-[#DC6803] text-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[96px] top-[12px] text-[11px] leading-[16.5px] font-[400]">Undergoing Review</p> */}
                {/* <p className="text-[#DC6803] bg-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[250px] sm:left-[165px] top-[14px] text-[11px] leading-[16.5px] font-[400]">Drafts</p> */}
                {/* <p className="bg-[#FDF2F2] text-[#D92D20] rounded-[8px] py-[4px] px-[8px] absolute left-[215px] sm:left-[120px] top-[14px] text-[11px] leading-[16.5px] font-[400]">Unpublished</p> */}
              </div>
            </div>
            <div className="flex flex-col px-2 py-5 md:pt-2 gap-[5px] md:gap-[2px]">
              <div className="flex justify-between items-center mb-2 text-[11px] md:text-[16px]">
                <Link
                  href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
                  className="text-[#006AFF] font-[700] leading-[13.86px] md:leading-[24px] text-center text-[16px]"
                  title={property?.name ? property?.name : property?.title}
                >
                  {truncateText(
                    property?.name ? property?.name : property?.title,
                    20
                  )}
                </Link>
                <div className="relative">
                  <Image
                    src="/static/images/verticatDotsIcon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-[15px] w-[15px] md:w-[20px] md:h-[20px] cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMenuToggle(property?._id);
                    }}
                  />
                  {isMenuOpen && selectedDataId === property?._id && (
                    <CardMenus
                      data={property}
                      publish={publish}
                      setDeleteProperty={setDeleteProperty}
                      handleUnpublished={handleUnpublished}
                      handlePublished={handlePublished}
                      setIsMenuOpen={setIsMenuOpen}
                      refs={popUp}
                      promoted={property?.is_promoted}
                      setStopPromotion={setStopPromotion}
                      setOpenPlanModal={setOpenPlanModal}
                      setPromotePropertry={setPromotePropertry}
                    />
                  )}
                </div>
              </div>

              <p className="flex gap-1 items-center">
                <Image
                  src="/static/images/Location_Vector.svg"
                  alt=""
                  width={12}
                  height={15.85}
                  className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px] "
                />
                <span className="text-[11px] font-[500]">
                  {`${property?.area}, ${property?.state}`}
                </span>
              </p>
              <div className="flex justify-between items-center">
                <p className=" md:font-[700] leading-[11.34px] font-[500] md:leading-[13.86px]  font-['Plus Jakarta Sans'] text-[11px] flex items-center ">
                  <Image
                    src="/static/images/nairaIcon.svg"
                    alt=""
                    width={17}
                    height={25}
                    className="h-[12px] w-[12px] md:w-[15px] md:h-[25px]"
                  />
                  <span className="pl-1">
                    {Number(property?.price).toLocaleString()}{" "}
                  </span>
                  <span className="text-[16px] font-[400] md:text-[18px] md:font-[500] ml-1 pt-1 text-[#4E4E4E]">
                    {capitalizeFirstLetter(property?.paymentType)}
                  </span>
                </p>
              </div>
              <p
                className={`text-[13px] sm:text-[11px]  leading-16.5px] ${
                  property?.is_promoted || property?.is_promoted === null
                    ? "mt-1"
                    : "mt-6"
                } mb- `}
              >
                <span className="text-[#A9A9A9] font-[400]">
                  {"Added: " + formatDate(property?.createdAt)}
                </span>
              </p>
              {property?.is_promoted && (
                <button
                  className="border w-fit border-[#006AFF] bg-[#EEF5FF] py-[2px] px-[6px] rounded-[4px] flex items-center gap-[2px]"
                  onClick={() => {
                    setSelectedDataId(property?._id);
                    setStopPromotion(true);
                  }}
                >
                  <Image
                    src="/static/images/medal-star.svg"
                    alt=""
                    width={10}
                    height={10}
                  />
                  <span className="font-[500] text-[11px] text-[#006AFF] leading-[16.5px]">
                    Promoted
                  </span>
                </button>
              )}

              {/* ) : (
                <p className="border w-fit border-[#DC6803] bg-[#FCF3EB] font-[500] text-[11px] py-[2px] px-[6px] rounded-[4px] flex items-center gap-[2px] leading-[16.5px] text-[#DC6803]">
                  <Image
                    src="/static/images/orangePromote.svg"
                    alt=""
                    width={10}
                    height={10}
                  />
                  <span className="sm:inline-block hidden" >Promotion in review</span>
                  <span className=" sm:hidden" >In review</span>
                </p> */}
            </div>
            {promoteOptions && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-[12px] ">
                <label
                  className="absolute  top-[12px] left-[15px] flex items-center rounded-full cursor-pointer"
                  htmlFor={`checkbox-${index}`}
                >
                  <input
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#D0D5DD] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 bg-[#FFFFFF] before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-[#EEF5FF] checked:before:bg-[#FFFFFF] hover:before:opacity-2"
                    id={`checkbox-${index}`}
                    onChange={() =>
                      handleCheckboxChange(property._id, property.is_promoted)
                    }
                    checked={selectedProperty.includes(property._id)}
                  />
                  <span className="absolute text-BlueHomz transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete a property */}
      <ConfirmationModal
        isOpen={deleteProperty}
        title="Delete Property?"
        confirmatoryText={`This property will be permanently removed`}
        handleEvent={handleDeleteProperty}
        cancel={setDeleteProperty}
        optionText="Proceed"
        optionText2="Cancel"
        color="text-[#D92D20]"
        // isLoading={isLoading}
      />
      <SuccessModal
        isOpen={propertyDeleted}
        title="Property Deleted Successfully"
        handleEvent={closeSuccessModal}
      />
      <SuccessModal
        isOpen={activePromo}
        title="This property is already promoted"
        handleEvent={closeSuccessModal}
      />

      {/* Unpublish a property */}
      <ConfirmationModal
        isOpen={unpublishProperty}
        title="Unpublish Property?"
        confirmatoryText={`This property will no longer be visible to the public but will be saved in your drafts`}
        handleEvent={handleUnpublishProperty}
        cancel={setUnpublisProperty}
        optionText="Proceed"
        optionText2="Cancel"
        // isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={propertyUnpublished}
        title="Property Unpublished Successfully"
        handleEvent={closeSuccessModal}
        optionTextnbutton="View drafts"
        handleOptionButton={() => {
          setPropertyUnpublished(false);
          router.push("/dashboard/list_Property");
        }}
        buttonColor={true}
      />
    
      {/* stop property promotion */}
      <ConfirmationModal
        isOpen={stopPromote}
        title="Stop Promotion?"
        confirmatoryText="This property will no longer be promoted on Homz"
        handleEvent={handleStopPropertyPromotion}
        cancel={setStopPromotion}
        optionText="Proceed"
        optionText2="Cancel"
        isLoading={isLoading}
        // color="text-[#D92D20]"
      />
      <SuccessModal
        isOpen={promotionStoppedModal}
        title="Promotion Stopped Successfully"
        handleEvent={handlePromotionStop}
      />
    </div>
  );
};

export default PropertyCard;
