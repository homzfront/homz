import Image from "next/image";
import Link from "next/link";
import React from "react";

const SectionA = ({ routeTo, profile }) => {
  return (
    <div className="max-w-[1160px] m-auto px-6 mt-20 justify-center gap-8 sm:flex-row h-auto sm:h-[540px] flex flex-col">
      <div className="sm:w-[50%] flex flex-col gap-4 justify-center mt-0">
        <h1 className="text-[29px] sm:text-[41px] leading-snug sm:text-start text-center font-[700] text-BlackHomz">
          Enjoy The Convenience <br /> You Deserve As A Tenant.
        </h1>
        <p className="text-[18px] sm:text-[20px] max-w-[735px] sm:text-start text-center font-[500] text-GrayHomz">
          Streamline rent payments, savings, maintenance requests, and
          communication in just one click!
        </p>
        <div className="flex sm:mb-0 mb-10 pt-4 sm:flex-row flex-col gap-4">
          <Link href={profile ? routeTo : "/register"}>
            <button className="w-full  sm:w-[120px] h-[48px] text-[16px]  rounded-md  bg-BlueHomz  text-white hover:bg-white hover:text-BlueHomz hover:border-BlueHomz hover:border font-[700] px-2 py-1 ">
              Get started
            </button>
          </Link>
          <Link href={"/contact-page"}>
            <button className=" w-full  sm:w-auto h-[48px] text-[16px] rounded-md  text-BlueHomz border-BlueHomz  hover:border-none hover:bg-BlueHomz hover:text-white font-[500]  border bg-transparent px-2 py-1">
              Contact us
            </button>
          </Link>
        </div>
      </div>
      <div className="relative sm:w-[50%] h-[360px] sm:h-full flex flex-col justify-center items-center">
        <div className="w-full sm:w-[498px] h-[360px] sm:h-full">
          <Image
            src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1713180777/public/images/HappyCouple_fiby0d.jpg"}
            alt="img"
            // width={4096}
            // height={2732}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="object-cover w-[498px] bg-center border rounded-tl-[80px] sm:rounded-tl-[135px]" // Add the '.image-clip' class
            priority
          />
        </div>
        <div className="hidden sm:inline sm:absolute w-[280px] bottom-[-80px] right-[350px]">
          <Image
            src={"/static/images/PhilipDashboard.png"}
            alt="img"
            width={2880}
            height={2048}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            className="object-top bg-top h-[504px] image-clip border-t-2 border-l-2 border-r-2 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
            priority
          />
        </div>
        <div className="sm:hidden w-[262px] mb-[-55px]">
          <Image
            src={"/static/images/PhilipDashboard.png"}
            alt="img"
            width={2880}
            height={2048}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
            className=" w-[262px] h-[190px] image-clip border-t-2 border-l-2 border-r-2 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SectionA;
