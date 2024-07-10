import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertySkeletonLoader = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="flex flex-col w-[335px] md:w-[363px] md:h-[458px] rounded-[12px] shadow-md"
          key={index}
        >
          <div className="cursor-pointer md:w-[363px] md:h-[252px] rounded-[10px]">
            <Skeleton height={252} />
          </div>
          <div className="flex flex-col px-4 pt-2 md:pt-5 gap-[5px] md:gap-[10px]">
            <div className="flex justify-between">
              <Skeleton width={80} height={28.98} />
              <Skeleton width={60} height={25} />
            </div>
            <Skeleton width={120} height={14} />
            <Skeleton width={100} height={24} />
            <Skeleton width={200} height={16} />
            <div className="h-full flex justify-between mb-2">
              <div className="flex gap-4">
                <Skeleton width={50} height={15} />
                <Skeleton width={50} height={15} />
                <Skeleton width={50} height={15} />
              </div>
              <Skeleton width={40} height={10} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertySkeletonLoader;