"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./button";
import { Properties } from "./Properties";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PropertyCard = ({ Property, state, setDataProperties }) => {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Property?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = Property?.slice(startIndex, endIndex);
  const [isMenuOpen, setIsMenuOpen] = useState(
    Array(currentProperties.length).fill(false)
  );
  const router = useRouter();
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
  const lastThreePagesStart = Math.max(totalPages - 2, 1); 
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );
  
  return (
    <div className="w-full flex flex-col gap-[64px] pt-6 justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentProperties.map((property, index) => (
          <div
            className="flex flex-col w-[100%] md:w-[234px] md:h-[281px] rounded-[12px] shadow-md"
            key={index}
          >
            <div
              className="cursor-pointer w-[100%] md:w-[234px] md:h-[168px] rounded-[10px] "
            >
              <div className="w-[100%] relative h-[100.55px] md:h-full md:w-full">
                <Link
                  className="cursor-pointer text-[14px]"
                  href={{
                    pathname: "/dashboard/list_Property/PreviewProperty",
                    query: { Property: property?._id },
                  }}
                >
                  <Image
                    src={property?.coverPhoto?.url}
                    alt=""
                    width={264}
                    height={168}
                    className="w-[100%] h-[100.55px] md:h-full md:w-full object-cover relative z-0 rounded-t-[12px]"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col px-2 pb-2  pt-2 md:pt-5 gap-[5px] md:gap-[2px]">
              <div className="flex justify-between items-center mb-2 text-[11px] md:text-[16px]">
                <p className="text-[#006AFF] font-[700] leading-[13.86px] md:leading-[24px] text-center">
                  {property?.name ? property?.name : property?.title}
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
                    <button
                      className="absolute md:top-[1.55rem] top-[1rem] right-[5px] w-[80px] md:right-[6px] mt-2 h-[37px] py-2  md:w-[212px] bg-white shadow-md rounded-md"
                      onClick={() =>
                        router.push(
                          `/dashboard/list_Property/edit_property/${property?._id}`
                        )
                      }
                    >
                      Edit details
                    </button>
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
                  <span className=" text-[8px] ml-1 pt-1 text-gray-500">
                    per year
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
    </div>
  );
};

export default PropertyCard;
