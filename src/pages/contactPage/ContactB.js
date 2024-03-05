import React from "react";

const ContactB = () => {
  return (
<div className="mt-[160px]">
        <div className="flex flex-col gap-2 justify-around items-center bg-[url('/Rectangle_5.png')] text-white rounded-lg shadow-2xl bg-center max-w-full xl:w-[1159px] h-[435px] ">
          <h1 className="font-[700] mt-4 max-w-2xl text-center text-[36px] sm:text-[60px]">
            Search For Your Next Home In Minutes
          </h1>
          <p className="text-center mt-[-15px] sm:text-[16px] font-[400] max-w-[780px] text-[14px]">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand.
          </p>
          <div className="mb-8">
            <button className=" w-[273px] h-[57px] text-[16px] sm:text-[20px] hover:border-white hover:bg-BlueHomz  rounded-md font-[700] border border-BlueHomz  text-white  bg-transparent  px-2">
              Explore homes
            </button>
          </div>
        </div>
      </div>
  );
};

export default ContactB;
