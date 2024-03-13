import Image from "next/image";
import Link from "next/link";
import React from "react";

const Section = () => {
  return (
    <div className=" flex flex-col mt-16 max-w-[1160px] m-auto px-6 gap-14 py-4">
      <div>
        <div className="flex flex-col justify-center items-center">
          <p className=" hidden sm:inline text-[41px] font-[700] text-center leading-tight text-BlackHomz">
            All-in-one account portal to manage and monitor your property and
            schedule maintenance.
          </p>
          <p className="text-[29px] sm:hidden font-[700] text-center">
            All-In-One Portal For Property Management
          </p>
          <p className="text-[18px] sm:text-[20px] max-w-[1024px] font-[500] mt-2 text-center text-GrayHomz">
            Elevate your property management game with our intuitive and
            efficient software solution. Seamlessly manage your renter database,
            incentivize on-time payments, and gain a clear financial overview.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Link href={"/register"} className="text-md w-full sm:w-[147px] h-[48px] text-[16px] mt-10  rounded-md font-normal flex items-center justify-center text-white bg-BlueHomz  px-4 py-1 hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz">
            Get Started
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={"/Dashboard.png"}
          alt="img"
          width={2880}
          height={2048}
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
          className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
          priority
        />

      </div>
    </div>
  );
};

export default Section;
