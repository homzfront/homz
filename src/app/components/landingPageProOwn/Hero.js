import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-[100vh]">
      <div className="absolute bg-BlueHomz w-full lg:w-[1360px] left-1/2 transform -translate-x-1/2">
        <div className="max-w-[1160px] mx-auto p-8">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-center text-2xl lg:text-[41px] font-bold">
              Effortless Property Ownership Starts Here
            </h1>
            <p className="max-w-[894px] text-center mt-6 text-lg lg:text-xl font-medium">
              Enjoy timely rent, verified renters, and a dedicated dashboard for
              monitoring your properties with our comprehensive management
              services.
            </p>
            <button className="text-BlueHomz hover:bg-BlackHomz hover:text-white bg-white border mt-6 rounded-md h-[42px] lg:h-[50px] w-[116px] lg:w-[160px]">
              Get Started
            </button>
          </div>
          <div className="flex justify-center items-center mt-[40px]">
            <Image
              src={"/Hand-drawn line.png"}
              height={350}
              width={794}
              alt="OwnerImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
