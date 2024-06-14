"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Button from "./button";
import { Properties } from "./Properties";
import { useRouter } from "next/navigation";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import ConfirmationModal from "@/components/mainmenu/ConfirmationModal";
import SuccessModal from "@/components/mainmenu/SuccessModal";
import CardMenus from "./cardMenu";

const PropertyCard = ({ Property, state, setDataProperties }) => {
  // console.log(Property)
  const ITEMS_PER_PAGE = 8;
  const [publish, setPublish] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Property?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = Property?.slice(startIndex, endIndex);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteProperty, setDeleteProperty] = useState(false);
  const [propertyDeleted, setPropertyDeleted] = useState(false);
  const [unpublishProperty, setUnpublisProperty] = useState(false);
  const [propertyUnpublished, setPropertyUnpublished] = useState(false);

  const popUp = useRef(null);
  const router = useRouter();
  const handleClickOutside = (event) => {
    if (popUp.current && !popUp.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
   
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteProperty = () => {
    setDeleteProperty(false);
    setPropertyDeleted(true);
  };
  const handleUnpublishProperty = () => {
    setUnpublisProperty(false);
    setPropertyUnpublished(true);
  };
  const closeSuccessModal = () => {
    setPropertyUnpublished(false);
    setPropertyDeleted(false);
  };
  const handleUnpublished = () => {
    setUnpublisProperty(true);
  
  };
  const handlePublished = () => {
   
  };
  const handleMenuToggle = (index) => {
    setSelectedDataId(index);
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1);
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="w-full flex flex-col gap-[64px] pt-6 justify-center items-center mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentProperties.map((property, index) => (
          <div
            className="flex flex-col w-[100%] md:w-[234px] md:h-[281px] rounded-[12px] shadow-md"
            key={index}
          >
            <div className="cursor-pointer w-[100%] md:w-[234px] md:h-[168px] rounded-[10px] ">
              <div className="w-[100%] relative h-[100.55px] md:h-full md:w-full">
                <Link
                  className="cursor-pointer text-[14px]"
                  href={`/dashboard/list_Property/PreviewProperty/${property?._id}`}
                >
                  <Image
                    src={property?.coverPhoto?.url}
                    alt=""
                    width={264}
                    height={168}
                    className="w-[100%] h-[100.55px] md:h-full md:w-full object-cover relative z-0 rounded-t-[12px]"
                  />
                </Link>

                {/* <p className="bg-[#DC6803] text-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[96px] top-[12px] text-[11px] leading-[16.5px] font-[400]">Undergoing Review</p> */}
                {/* <p className="text-[#DC6803] bg-[#FCF3EB] rounded-[8px] py-[4px] px-[8px] absolute left-[165px] top-[12px] text-[11px] leading-[16.5px] font-[400]">Drafts</p> */}
                {/* <p className="bg-[#FDF2F2] text-[#D92D20] rounded-[8px] py-[4px] px-[8px] absolute left-[130px] top-[12px] text-[11px] leading-[16.5px] font-[400]">Unpublished</p> */}
                <p className="bg-[#CDEADD] text-[#039855] rounded-[8px] py-[4px] px-[8px] absolute left-[145px] top-[12px] text-[11px] leading-[16.5px] font-[400]">
                  Published
                </p>
              </div>
            </div>
            <div className="flex flex-col px-2 pb-2  pt-2 md:pt-5 gap-[5px] md:gap-[2px]">
              <div className="flex justify-between items-center mb-2 text-[11px] md:text-[16px]">
                <p className="text-[#006AFF] font-[700] leading-[13.86px] md:leading-[24px] text-center">
                  {truncateText(
                    property?.name ? property?.name : property?.title,
                    22
                  )}
                </p>
                    
                <div className="relative" >
                  <Image
                    src="/static/images/verticatDotsIcon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-[15px] w-[15px] md:w-[20px] md:h-[20px] cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMenuToggle(index);
                    }}
                  />
                  {isMenuOpen && selectedDataId === index && (
                    <CardMenus
                      data={property}
                      publish={publish}
                      setDeleteProperty={setDeleteProperty}
                      handleUnpublished={handleUnpublished}
                      handlePublished={handlePublished}
                      setIsMenuOpen={setIsMenuOpen}
                      refs={popUp}
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
                <span className="text-[9px] md:text-[11px] font-[500]">
                  {`${property?.area}, ${property?.state}`}
                </span>
              </p>
              <div className="flex justify-between items-center">
                <p className=" text-[9px] md:font-[700] leading-[11.34px] font-[500] md:leading-[13.86px]  font-['Plus Jakarta Sans'] text-[9px] md:text-[11px] flex items-center ">
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
            </div>
          </div>
        ))}
      </div>

      <Button
        firstThreePages={firstThreePages}
        currentPage={currentPage}
        lastThreePages={lastThreePages}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePageClick={handlePageClick}
        handlePrev={handlePrev}
      />
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
      />
      <SuccessModal
        isOpen={propertyDeleted}
        title="Property Deleted Successfully"
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
    </div>
  );
};

export default PropertyCard;
