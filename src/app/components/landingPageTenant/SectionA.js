import Image from "next/image";
import React from "react";

const SectionA = () => {
  return (
    <div className="max-w-[1160px] m-auto px-6 mt-20 justify-center sm:flex-row  flex flex-col">
      <div className="w-[100%] flex flex-col gap-4 justify-center mt-0">
        <h1 className="text-[41px] leading-snug sm:text-start text-center font-[700] text-BlackHomz">
          Enjoy The Convenience <br/> You Deserve As A Tenant.
        </h1>
        <p className="text-[20px] max-w-[735px] sm:text-start text-center font-[500] text-GrayHomz">
          Streamline rent payments, savings, maintenance requests, and
          communication in just one click!
        </p>
        <div className="flex sm:mb-0 mb-10 pt-4 sm:flex-row flex-col gap-4">
          <button className="w-full  sm:w-[109px] h-[48px] text-[16px]  rounded-md font-normal  bg-BlueHomz  text-white hover:bg-white hover:text-BlueHomz hover:border-BlueHomz hover:border hover:font-[700] px-2 py-1 ">
            Get started
          </button>
          <button className=" w-full  sm:w-[180px] h-[48px] text-[16px] rounded-md font-normal  text-BlueHomz border-BlueHomz  hover:border-none hover:bg-BlueHomz hover:text-white hover:font-[700]  border bg-transparent px-2 py-1">
            Know more about us
          </button>
        </div>
      </div>
      <div className="w-full">
        <Image src={"/Image_2.png"} height={567} width={573} alt="Hero-Icon" />
      </div>
    </div>
  );
};

export default SectionA;
