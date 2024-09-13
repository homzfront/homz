import Image from "next/image";
import Link from "next/link";
import React from "react";

const Section = (routeTo, profile) => {
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
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2">
          <Link
            href={profile ? routeTo : "/register"}
            className="text-md w-full md:w-[147px] h-[48px] text-[16px] mt-10 rounded-md font-normal flex items-center justify-center text-white bg-BlueHomz  px-4 py-1 hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz">
            Get Started
          </Link>
          <Link 
          href={"/document-generation"}
          className="h-[48px] w-full md:w-auto text-[16px] md:mt-10 rounded-md font-[500] px-4 flex  justify-center items-center text-BlueHomz border border-BlueHomz hover:border-none hover:bg-BlueHomz4 hover:text-white"
          >
            Generate Property Documents
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1713182738/public/images/Dashboard_z0cmqx.png"}
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
