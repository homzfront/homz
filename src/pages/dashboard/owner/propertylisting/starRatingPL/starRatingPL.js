"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CommentAndRatings from "./components/commentAndRatings";

const StarRatingPL = () => {
  return (
    <div className="p-8 w-[1147px]">
      <Link href={"/dashboard/enterprise-property/propertylisting"} className="flex gap-2 items-center">
        <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          height={16}
          width={16}
          alt=""
        />
        <p className="text-[11px] font-[400]">Go Back</p>
      </Link>
      <div className="mt-8">
        <CommentAndRatings/>
      </div>
    </div>
  );
};

export default StarRatingPL;
