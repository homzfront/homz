"use client"
import Image from "next/image";
import React from "react";
import CommentAndRatings from "./components/commentAndRatings";

const StarRatingPL = ({goBack}) => {
  return (

    <div className="p-8 w-[1147px] ">
      <div onClick={goBack} className="flex gap-2 cursor-pointer">
       <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          height={16}
          width={16}
          alt=""
        />
        <p className="text-[11px] font-[400]">Go Back</p>
      </div>
      <div className="mt-8">
        <CommentAndRatings/>
      </div>
    </div>

  );
};

export default StarRatingPL;
