// components/PropertyCard.js
"use client";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "@/components/general/pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import SkeletonLoader from "./skeletonLoader.js"

const PropertyCard = ({
  firstThreePages,
  currentPage,
  totalPages,
  handleNext,
  handlePageClick,
  handlePrev,
  lastThreePages,
  currentData,
  loading,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(
    Array(currentData?.length).fill(false)
  );
  const router = useRouter();
  const handleMenuToggle = (index) => {
    const newMenuState = [...isMenuOpen];
    newMenuState[index] = !newMenuState[index];
    setIsMenuOpen(newMenuState);
  };

  return (
    <div className="w-full flex flex-col gap-[64px] pt-6 justify-center items-center">
      {loading ? (
        <SkeletonLoader count={currentData?.length || 8} />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {currentData?.map((property, index) => (
              <div
                className="flex flex-col w-[100%] md:w-[224px] md:h-[281px] rounded-[12px] shadow-md"
                key={index}
              >
                <div className="cursor-pointer w-[100%] md:w-[224px] md:h-[168px] rounded-[10px]">
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
                  </div>
                </div>
                <div className="flex flex-col px-2 pb-2 pt-2 md:pt-5 gap-[5px] md:gap-[2px]">
                  <div className="flex justify-between items-center mb-2 text-[11px] md:text-[16px]">
                    <p className="text-[#006AFF] truncate font-[700] leading-[13.86px] md:leading-[24px] text-center">
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
                      className="h-[12px] w-[12px] md:w-[12px] md:h-[15.85px]"
                    />
                    <span className="text-[9px] md:text-[11px] font-[500]">
                      {`${property?.area}, ${property?.state}`}
                    </span>
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] md:font-[700] leading-[11.34px] font-[500] md:leading-[13.86px]  font-['Plus Jakarta Sans'] text-[9px] md:text-[11px] flex items-center">
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
          {currentData &&
            <Pagination
              firstThreePages={firstThreePages}
              currentPage={currentPage}
              lastThreePages={lastThreePages}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePageClick={handlePageClick}
              handlePrev={handlePrev}
            />
          }
        </>
      )}
    </div>
  );
};

export default PropertyCard;
