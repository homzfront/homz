import Image from "next/image";
import React from "react";

const SectionC = () => {
  // Array of card objects
  const cards = [
    {
      icon: "/card-coin.png",
      title: "Pay bills",
      description:
        "Easily pay your light and estate bills with just a few clicks.",
    },
    {
      icon: "/setting-2.png",
      title: "Get access to maintenance services on the go",
      description:
        "Access maintenance services on the go with our software, ensuring your living space is cared for effortlessly."
    },
  ];
  return (
    <div className="mt-20 max-w-[1160px] m-auto px-6">
        <div className=" md:hidden ">
            <p className="text-center text-[23px] font-[700] text-BlackHomz">
            Your All-in-One Solution For Comfort.
            </p>
        </div>
      <div className="flex flex-row-reverse justify-center md:gap-4 md:justify-between mt-10">
        <div className="hidden gap-8 md:flex flex-col max-w-sm">
          {cards.map((card, index) => (
            <div key={index}>
              <div
                className={`rounded-full h-[52px] w-[52px] flex justify-center items-center bg-blue-100`}
              >
                <Image
                  src={card.icon}
                  height={32}
                  width={32}
                  alt={`${card.title}-img`}
                />
              </div>
              <div className="flex mt-5 gap-1 flex-col">
                <p className="font-[700] text-[20px] text-BlackHomz">
                  {card.title}
                </p>
                <p className="font-[400] text-[18px] text-GrayHomz">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Image
            src={"/Frame_635_2.png"}
            height={598}
            width={573}
            alt="features-img"
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-2 justify-around items-center p-8 bg-[url('/Background_image.png')] text-white rounded-lg shadow-2xl bg-cover bg-center bg-BlackHomz max-w-full xl:w-[1159px] h-[303px]">
          <h1 className="font-[700] sm:leading-none leading-tight text-center text-[20px] sm:text-[30px] md:text-[36px]">
          Elevate Your Renting Experience Today
          </h1>
          <p className="mt-[-10px] sm:leading-none leading-tight text-center font-normal  sm:font-[500] text-[16px] sm:text-[20px]">
          Join over 2,000+ renters who are living a stress-free life.
           </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <button className="w-full sm:w-[171px] h-[48px] text-[16px] rounded-md font-[600px]  text-BlackHomz  bg-white  px-2 py-1 hover:bg-transparent hover:text-white border hover:border-white ">
            Get started for free
            </button>
            <button className="w-full sm:w-[108px] h-[48px] text-[16px] rounded-md font-[500px]  text-white border bg-transparent px-2 py-1 hover:bg-white hover:text-BlackHomz">
            Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionC;
