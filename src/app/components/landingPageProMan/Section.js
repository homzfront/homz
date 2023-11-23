import Image from "next/image";
import React from "react";

const Section = () => {
  return (
    <div className=" flex flex-col gap-14 p-4">
      <div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[41px] font-[700] text-center leading-tight text-BlackHomz">
            All-in-one account portal to manage and monitor your property and
            schedule maintenance.
          </p>
          <p className="text-[20px] max-w-[1024px] font-[500] mt-2 text-center text-GrayHomz">
            Elevate your property management game with our intuitive and
            efficient software solution. Seamlessly manage your renter database,
            incentivize on-time payments, and gain a clear financial overview.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button className="text-md w-[147px] h-[48px] text-[16px] mt-10  rounded-md font-normal  text-white bg-BlueHomz  px-4 py-1 hover:bg-blue-400">
            Get Started
          </button>
        </div>
      </div>
      <div>
        <Image
          src={"/image 1.png"}
          alt="img"
          // objectFit={"contain"}
          width={1133}
          height={515}
        />
      </div>
    </div>
  );
};

export default Section;
