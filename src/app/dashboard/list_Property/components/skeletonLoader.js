import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ count }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          className="flex flex-col w-full md:w-[224px] md:h-[281px] rounded-[12px] shadow-md"
          key={index}
        >
          <div className="cursor-pointer w-full md:w-[224px] md:h-[168px] rounded-[10px]">
            <Skeleton height={168} width="100%" />
          </div>
          <div className="flex flex-col px-2 pb-2 pt-2 md:pt-5 gap-[5px] md:gap-[2px]">
            <Skeleton height={24} width="75%" />
            <Skeleton height={15} width="50%" />
            <Skeleton height={15} width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
