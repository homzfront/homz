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
        <div className="sm:w-[680px]">
          <Image
            src={"/static/images/DashboardTenant.png"}
            alt="img"
            width={2880}
            height={2048}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
            priority
          />
        </div>
        <div className="absolute hidden md:inline right-[-5px] w-[550px] top-[67px]">
          <Image
            src={"/static/images/DashboardPayment.png"}
            alt="img"
            width={2880}
            height={2048}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AllInOne;
