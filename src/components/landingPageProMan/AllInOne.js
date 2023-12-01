import Image from "next/image";
import React from "react";

const AllInOne = () => {
  return (
    <div className="mt-[200px] max-w-[1160px] m-auto px-6">
      <p className="text-[23px] font-[700] text-center text-BlackHomz">
        Your All-in-One Solution for Success — Seamless, Efficient, and
        Empowering.
      </p>
      <div className="relative mt-12">
        <div>
          <Image
            src={"/image 10.png"}
            height={314}
            width={670}
            alt="chart-img"
          />
        </div>
        <div className="absolute hidden md:inline right-[-5px] top-9">
          <Image
            src={"/image 11.png"}
            height={297}
            width={562}
            alt="chart-img"
          />
        </div>
      </div>
    </div>
  );
};

export default AllInOne;
