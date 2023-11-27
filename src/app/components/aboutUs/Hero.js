import Image from "next/image";
import React from "react";

const Hero = () => {
  const box = [
    {
      id: 1,
      value: "5+",
      Content: "Years in Business",
    },
    {
      id: 2,
      value: "1000+",
      Content: "Property Sold",
    },
    {
      id: 3,
      value: "500+",
      Content: "Featured Agents",
    },
    {
      id: 4,
      value: "5+",
      Content: "Years in Business",
    },
  ];

  return (
    <div className="max-w-[1160px] m-auto px-6 mt-20">
      <div className="flex flex-col md:flex-row gap-[72px] justify-between">
        <div className="flex flex-col gap-4 justify-around w-[100%]">
          <h1 className="text-[24px] sm:text-[60px] font-[700] ">About Us</h1>
          <p className="text-[13px] sm:text-[20px] font-[400] max-w-">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand. Whether it’s dreaming of
            your next rental buying your new home or selling a home, we provide
            customers with an end-to-end home journey experience that can
            include your brand.
          </p>
          <button className="w-full sm:w-[133px] h-[49px] bg-BlueHomz  hover:bg-blue-400 rounded-md text-white ">
            Contact Us
          </button>
        </div>
        <div className="w-[100%]">
          <Image src={"/Rectangle 44.png"} width={524} height={460} />
        </div>
      </div>
      <div className="mt-14 grid md:grid-cols-4 grid-cols-2 gap-4">
        {box.map((data) => (
          <div key={data.id} className="border flex justify-around items-center h-[135px] rounded-lg">
            <div className="flex flex-col items-center ">
              <div className="text-[28px] sm:text-[52px] text-BlackHomz font-[700]">{data.value}</div>
              <div className="text-[9px] sm:text-[16px]] text-BlackHomz font-[400]">{data.Content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-col md:flex-row-reverse gap-[72px] justify-between">
        <div className="flex flex-col gap-4 justify-around w-[100%]">
          <h1 className="text-[24px] sm:text-[60px] font-[700] ">Our Story</h1>
          <p className="text-[13px] sm:text-[20px] font-[400] max-w-">
            Finding a home is just the beginning of the homz.ng experience.
            Whether it’s dreaming of your next rental buying your new home or
            selling a home, we provide customers with an end-to-end home journey
            experience that can include your brand. Whether it’s dreaming of
            your next rental buying your new home or selling a home, we provide
            customers with an end-to-end home journey experience that can
            include your brand.
          </p>
          <button className="hidden sm:inline w-[133px] h-[49px] bg-BlueHomz hover:bg-blue-400 rounded-md text-white ">
            Contact Us
          </button>
        </div>
        <div className="w-[100%]">
          <Image src={"/Rectangle 49.png"} width={524} height={460} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
