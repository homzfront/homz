"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoneyReceived from "@/components/icons/moneyReceived";
import Verify from "@/components/icons/verify";
import Building from "@/components/icons/building";

const Features = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Array of card objects
  const cards = [
    {
      icon: <MoneyReceived />,
      title: "Receive Rent On Time",
      description:
        "Seamlessly manage your finance, save and pay your rent with a click, making life as a tenant hassle-free.",
    },
    {
      icon: <Verify />,
      title: "Get Verified Renters on Your Property",
      description:
        "Secure your home effortlessly with our convenient rental loan options tailored for you.",
    },
    {
      icon: <Building />,
      title: "Monitor All Properties In One Place",
      description:
        "Secure your home effortlessly with our convenient rental loan options tailored for you.",
    },
  ];

  return (
    <div className="mt-[120px] max-w-[1160px] m-auto px-6 flex flex-col items-center gap-[80px]">
      <div className="max-w-[897px] flex flex-col items-center gap-3">
        <h2 className=" text-BlueHomz text-[18px]  text-center font-[500]">
          Features
        </h2>
        <h1 className="text-[36px] text-center font-[700] text-BlackHomz">
          Empowering Landlords
        </h1>
        <p className="text-[20px] max-w-[735px] text-center font-[400] text-GrayHomz">
          Stay in control with our easy to use owner property management
          solution.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative">
          <div className="hidden lg:inline absolute left-[-160px]">
            <Image src={"/static/images/DashboardManager"} width={610} height={506} alt="img" />
          </div>
        </div>
        <div className="">
          <div className="hidden md:grid max-w-[768px] px-[64px] sm:p-0  sm:max-w-full md:grid-cols-2 gap-6 mt-8 xl:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col h-auto gap-4 w-full justify-around"
              >
                <div
                  className={`rounded-full h-[48px] w-[48px] flex justify-center items-center bg-blue-100`}
                >
                  <>
                    {card.icon}
                  </>
                </div>
                <div className="flex flex-col gap-1 justify-between h-max">
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
          <div className="md:hidden max-w-sm gap-6 mt-2">
            <Slider {...settings}>
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col h-[260px] border rounded-[20px] p-6  max-w-sm "
                >
                  <div
                    className={`m-auto rounded-full h-[52px] w-[52px] flex justify-center items-center bg-blue-100`}
                  >
                    <Image
                      src={card.icon}
                      height={32}
                      width={32}
                      alt={`${card.title}-img`}
                    />
                  </div>
                  <div className="flex flex-col justify-between items-center h-max">
                    <p className="font-[700] text-[20px] text-center text-BlackHomz">
                      {card.title}
                    </p>
                    <p className="font-[400] text-[16px] text-center text-GrayHomz">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
