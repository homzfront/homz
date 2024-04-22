"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./button";
import { Properties } from "./Properties";
import { Carousel } from "flowbite-react";
import Link from "next/link";

const PropertyCard = ({ Property, state, setDataProperties }) => {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Property.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = Property.slice(startIndex, endIndex);
  const [isMenuOpen, setIsMenuOpen] = useState(
    Array(currentProperties.length).fill(false)
  );

  const handleMenuToggle = (index) => {
    const newMenuState = [...isMenuOpen];
    newMenuState[index] = !newMenuState[index];
    setIsMenuOpen(newMenuState);
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
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );
  return (
    <div className="w-[335px] md:w-full flex flex-col  gap-[64px] pt-6">
      <div className="flex  w-[340px] flex-wrap gap-[16px] md:w-full propertyListing">
        {currentProperties.map((property, index) => (
          <div
            className="flex flex-col w-[158px]  md:w-[234px]  md:h-[281px] rounded-[12px] shadow-md"
            key={index}
          >
            <div
              className="cursor-pointer w-[158px] md:w-[234px] md:h-[168px] rounded-[10px] "
              // onClick={() => handleClearInputField("option4Qestion")}
            >
              <div className="w-[158px] relative h-[100.55px] md:h-full md:w-full">
                <Link
                  className="cursor-pointer text-[14px]"
                  href={{
                    pathname: "/list_Property/PreviewProperty",
                    query: { PropertyId: property._id },
                  }}
                >
                  <Image
                    src={property.Photos.coverPhoto}
                    alt=""
                    width={264}
                    height={168}
                    className="w-[158px] h-[100.55px] md:h-full md:w-full object-cover relative z-0 rounded-t-[12px]"
                  />
                </Link>
                {/* <div className=" absolute flex items-center bottom-[75px] right-[.5rem] gap-[4px] w-[26px] h-[15px] rounded-[8px] py-[2px] px-[4px] bg-white z-20 md:hidden">
                  <Image
                    src="/static/images/star.svg"
                    alt=""
                    width={8}
                    height={8}
                  />
                  <span className="text-[9px] font-[500] leading-[11.34px] ">
                    {property.PropertyInfo.Rating}
                  </span>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col px-2 pb-2  pt-2 md:pt-5 gap-[5px] md:gap-[2px]">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#006AFF] text-[11px] md:text-[16px] font-[700] leading-[13.86px] md:leading-[24px] text-center">
                  {/* {`${property.Bedrooms.split(" ")[0]}-${property.Property_type}`} */}
                  {property.PropertyInfo.Property_type}
                </p>
                <div className="relative">
                  <Image
                    src="/static/images/verticatDotsIcon.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-[15px] w-[15px] md:w-[20px] md:h-[20px] cursor-pointer"
                    onClick={() => handleMenuToggle(index)}
                  />
                  {isMenuOpen[index] && (
                   
                      <Link
                    className="absolute md:top-[1.55rem] top-[1rem] right-[5px] w-[140px] md:right-[6px] mt-2 h-[37px] py-2 px-4 md:w-[212px] bg-white shadow-md rounded-md"
                        // className="cursor-pointer text-[14px]"
                        href={{
                          pathname: "/list_Property/edit_property",
                          query: { PropertyId: property._id },
                        }}
                      >
                        Edit details
                      </Link>
                    
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
                  {property.PropertyInfo.Area}
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
                    {Number(property.PropertyInfo.Price).toLocaleString()}{" "}
                  </span>
                  <span className=" text-[8px] ml-1 pt-1 text-gray-500">
                    per year
                  </span>
                </p>
                {/* <div className="hidden md:flex gap-[4px] w-[29px] h-[20px] rounded-[8px] py-[2px] px-[4px] bg-white">
                  <Image
                    src="/static/images/star.svg"
                    alt=""
                    width={8}
                    height={8}
                  />
                  <span className="text-[13px] font-[500] leading-[16.38px] ">
                    {property.PropertyInfo.Rating}
                  </span>
                </div> */}
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
    </div>
  );
};

export default PropertyCard;
