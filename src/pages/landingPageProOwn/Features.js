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
      title: "Receive Rent Payments On Time Every Month",
      description:
        "Our robust rent collection system makes it easy for tenants to pay rent on time. ",
    },
    {
      icon: <Verify />,
      title: "Get Verified, Quality Tenants for Your Properties",
      description:
        "Our platform ensures that only verified tenants can access your property. Easily review your tenants from your dashboard.",
    },
    {
      icon: <Building />,
      title: "Monitor All Your Properties from One Dashboard",
      description:
        "Stay on top of your property with our intuitive dashboard! Track your rental income and your property's performance.",
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative">
          <div className="hidden lg:inline absolute left-[-200px]">
            <Image
              src={"/static/images/DashboardLandLord.png"}
              width={2880}
              height={2048}
              alt="img"
              layout="responsive"
              objectFit="cover"
              objectPosition="right" // Adjust this to crop from the left
              className="object-top bg-top h-[504px] image-clipII border-t-4 border-r-4 border-BlueHomz rounded-[12px]"
            />
          </div>
        </div>
        <div className="">
          <div className="hidden md:grid max-w-[768px] px-[64px] sm:p-0 sm:max-w-full md:grid-cols-2 gap-3">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col h-auto gap-4 w-full"
              >
                <div
                  className={`rounded-full h-[48px] w-[48px] flex justify-center items-center bg-blue-100`}
                >
                  <>
                    {card.icon}
                  </>
                </div>
                <div className="flex flex-col gap-1 justify-between h-max">
                  <h2 className={`font-[600] text-[20px] text-BlackHomz ${card?.title === "Receive Rent Payments On Time Every Month" ? "w-[60%]" : ""} `}>
                    {card.title}
                  </h2>
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
                    <>
                      {card.icon}
                    </>
                  </div>
                  <div className="flex flex-col justify-between items-center h-max">
                    <h2 className="font-[700] text-[20px] text-center text-BlackHomz">
                      {card.title}
                    </h2>
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
