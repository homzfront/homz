import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertySkeletonLoader = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="flex flex-col w-full sm:w-[325px] md:w-[363px] md:h-[458px] rounded-[12px] shadow-md"
          key={index}
        >
          {/* Image carousel section */}
          <div className="cursor-pointer md:w-[363px] h-[226.33px] md:h-[252px] rounded-t-[12px] overflow-hidden">
            <Skeleton 
              height="100%" 
              width="100%" 
              borderRadius={0}
              className="h-[226.33px] md:h-[252px]"
            />
          </div>

          {/* Content section */}
          <div className="flex flex-col px-4 pt-4 md:pt-5 gap-[5px] md:gap-[10px]">
            {/* Title and listing type badge */}
            <div className="flex justify-between items-start">
              <Skeleton 
                width={140} 
                height={29} 
                className="md:w-[160px]"
              />
              <Skeleton 
                width={65} 
                height={25} 
                borderRadius={4}
              />
            </div>

            {/* Property type */}
            <div className="h-[14px] md:h-[16px]">
              <Skeleton width={100} height={14} />
            </div>

            {/* Price */}
            <div className="flex items-center gap-1 h-[12px] md:h-[25px]">
              <Skeleton circle width={12} height={12} className="md:w-[15px] md:h-[25px]" />
              <Skeleton width={90} height={16} className="md:h-[24px]" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-1">
              <Skeleton width={12} height={12} className="md:h-[15.85px]" />
              <Skeleton width={150} height={16} className="md:w-[180px]" />
            </div>

            {/* Bottom section with amenities and arrow */}
            <div className="h-full flex justify-between items-end mb-4 mt-2 md:mt-4">
              <div className="flex gap-4">
                {/* Bedrooms */}
                <div className="flex gap-1 items-center">
                  <Skeleton width={14} height={12} className="md:w-[17px] md:h-[11.9px]" />
                  <Skeleton width={60} height={10} />
                </div>
                {/* Bathrooms */}
                <div className="flex gap-1 items-center">
                  <Skeleton width={14} height={12} className="md:w-[17px] md:h-[11.9px]" />
                  <Skeleton width={65} height={10} />
                </div>
                {/* Square feet */}
                <div className="flex gap-1 items-center">
                  <Skeleton width={14} height={12} className="md:w-[21px] md:h-[11.86px]" />
                  <Skeleton width={50} height={10} />
                </div>
              </div>
              {/* Arrow circle */}
              <Skeleton 
                circle 
                width={35.92} 
                height={35.92} 
                className="md:w-[40px] md:h-[40px]"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertySkeletonLoader;