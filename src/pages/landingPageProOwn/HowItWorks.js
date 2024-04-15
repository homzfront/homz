"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import TickCircle from "@/components/icons/tickCircle";
import ChartSquare from "@/components/icons/chartSquare";
import DashArrow from "@/components/icons/dashArrow";

const HowItWorks = () => {
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
      icon: <TickCircle />,
      title: " Simple Onboarding",
      description:
        "Begin by signing up for free. Our intuitive interface guides you through the process ensuring a quick and easy setup.",
    },
    {
      icon: <ChartSquare />,
      title: "Centralized Dashboard",
      description:
        "Access a centralized dashboard that provides a comprehensive overview of all your properties in one place.",
    },
    {
      icon: <DashArrow />,
      title: "Effortless Navigation",
      description:
        "Effortlessly manage everything from finances and tenants to property maintenance with our intuitive interface.",
    },
  ];
  return (
    <div className="mt-[150px] max-w-[1160px] m-auto px-6 flex flex-col items-center">
      <div className="max-w-[897px] flex flex-col items-center gap-3">
        <h1 className="text-[36px] text-center font-[700] text-BlackHomz">
          How it Works
        </h1>
        <p className="text-[20px] max-w-[735px] text-center font-[400] text-GrayHomz">
          Explore our streamlined process designed for your unparalleled
          experience.
        </p>
      </div>

      <div>
        <div className="hidden md:grid max-w-[768px] px-[64px] sm:p-0  sm:max-w-full md:grid-cols-2 gap-4 mt-14 xl:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col h-auto gap-4 w-full items-center justify-around"
            >
              <div
                className={`rounded-full h-[48px] w-[48px] flex justify-center items-center bg-BlueHomz`}
              >
                <>
                  {card.icon}
                </>
              </div>
              <div className="flex flex-col gap-1 justify-between h-max">
                <p className="font-[700] text-[20px] text-center text-BlackHomz">
                  {card.title}
                </p>
                <p className="font-[400] text-[18px] text-center text-GrayHomz">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:hidden px-6 max-w-sm gap-6 mt-12">
          <Slider {...settings}>
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col h-[260px] border rounded-[20px] p-8  max-w-sm "
              >
                <div
                  className={`m-auto rounded-full h-[52px] w-[52px] flex justify-center items-center bg-BlueHomz `}
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
      <div className="mt-16 flex flex-col justify-around items-center py-[60px] px-8 bg-[url('/Background_image.png')] text-white rounded-lg shadow-2xl bg-cover bg-center bg-black max-w-full sm:w-[670px]  md:w-[786px] lg:w-[824px] xl:w-[1159px] h-[303px]">
        <h1 className=" mt-[-20px] sm:mt-0 font-[700] text-center text-[20px] sm:text-[36px]">
          Join over 2,000+ Landlords who are scaling up.
        </h1>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto mt-3  gap-4">
          <Link
            //  href={"https://forms.gle/aCwKh8aW7goPoRGWA"}>
            href={"/register"}>
            <button className="w-full sm:w-[116px] font-[700] h-[48px] text-[16px] hover:bg-transparent hover:border  hover:text-white rounded-md  text-BlackHomz  bg-white  px-2 py-1">
              Get started
              {/* Join Waitlist */}
            </button>
          </Link>
          <Link href={"/contact-page"}>
            <button className="w-full sm:w-[116px] h-[48px] text-[16px] hover:text-BlackHomz  hover:bg-white rounded-md font-normal  text-white border bg-transparent px-2 py-1">
              Contact us

            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
