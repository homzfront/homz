"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionB = () => {
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
      icon: "/card.png",
      title: "Pay & Save rent",
      description:
        "Seamlessly manage your finance, save and pay your rent with a click, making life as a tenant hassle-free.",
    },
    {
      icon: "/money-recive.png",
      title: "Get a rental loan",
      description:
      "Secure your home effortlessly with our convenient rental loan options tailored for you."
    },
    {
      icon: "/messages_2.png",
      title: "Interact with property management",
      description:
        "Connect with property management effortlessly, ensuring your concerns and inquiries are addressed promptly."
    },
  ];

  return (
    <div className="mt-20 max-w-[1160px] m-auto px-6">
      <div>
        <div className=" w-[100%] md:w-[50%]">
          <h1 className="text-BlueHomz text-[18px] md:text-start text-center font-[500]">Features</h1>
          <h1 className="text-[23px] mt-2 leading-tight sm:leading-none sm:text-[36px] md:text-start text-center font-[700] text-BlackHomz">
            Elevate Your Renting Experience
          </h1>
          <p className="text-[18px] mt-2 sm:text-[20px] md:text-start text-center font-[500] text-GrayHomz">
            Our intuitive features redefines convenience and ease in your
            everyday living
          </p>
        </div>
        <div className="mt-14 flex flex-row justify-center md:justify-between">
          <div className="hidden gap-4 md:grid grid-col-1 max-w-sm">
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
          
      <div className="md:hidden px-6  max-w-sm gap-6 mt-2">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col h-[260px] border rounded-[20px] p-8  max-w-sm "
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
        <div className="hidden md:inline">
          <Image
            src={"/Frame 635.png"}
            height={632}
            width={607}
            alt="features-img"
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SectionB;
