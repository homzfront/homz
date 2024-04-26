"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import PeopleWhite from "@/components/icons/peopleWhite";
import MoneySend from "@/components/icons/moneySend";
import WalletCheckWhite from "@/components/icons/walletCheckWhite";
import MessagesWhite from "@/components/icons/messagesWhite";
import NotificationWhite from "@/components/icons/notificationWhite";
import BuildingWhite from "@/components/icons/buildingWhite";

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
      icon: <PeopleWhite />,
      title: "Manage all renters in one place",
      description:
        "Effortlessly streamline your operations by managing all renters in one centralized platform.",
    },
    {
      icon: <MoneySend />,
      title: "Offer incentive for timely payment",
      description:
        "Boost cash flow seamlessly by offering enticing incentives for on-time rent payments.",
    },
    {
      icon: <WalletCheckWhite />,
      title: "Manage your finance",
      description:
        "Gain financial clarity with our intuitive platform, managing your property's finances has never been easier.",
    },
    {
      icon: <MessagesWhite />,
      title: "Manage complaints from renters",
      description:
        "Efficiently address and resolve renter concerns with our streamlined complaint management system.",
    },
    {
      icon: <NotificationWhite />,
      title: "Generate announcements to renters",
      description:
        "Keep renters informed by effortlessly creating and delivering announcements with our user-friendly platform.",
    },
    {
      icon: <BuildingWhite />,
      title: "Publish vacant properties for rent",
      description:
        "Minimize vacancy periods and maximize exposure by automating the publication of vacant properties for rent.",
    },
  ];

  return (
    <div className="sm:mt-[120px] mt-0 max-w-[1160px] m-auto px-6 flex flex-col items-center gap-[80px]">
      <div className="max-w-[897px] flex flex-col items-center gap-3">
        <h2 className=" text-BlueHomz text-[18px]  text-center font-[500]">
          Features
        </h2>
        <h1 className="text-[23px] sm:text-[36px] text-center font-[700] text-BlackHomz">
          All you need to stand out as a property manager
        </h1>
        <p className="text-[18px] sm:text-[20px] max-w-[735px] text-center font-[400] text-GrayHomz">
          Our comprehensive software offers everything you need to stand out,
          elevate your efficiency and thrive as a property manager.
        </p>
      </div>
      <div className="hidden mt-[-30px] md:grid max-w-[100%] px-[64px] sm:px-0 sm:max-w-full md:grid-cols-2 lg:gap-1 gap-4  xl:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col h-auto lg:h-[206px] w-full justify-around items-center"
          >
            <div
              className={`rounded-full h-[52px] w-[52px] flex justify-center items-center bg-BlueHomz`}
            >
              <>
                {card.icon}
              </>
            </div>
            <div className="flex flex-col gap-1 justify-between items-center h-max">
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
      <div className="md:hidden px-6 max-w-sm gap-6 mt-2">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col h-[260px] border rounded-[20px] p-8  max-w-sm "
            >
              <div
                className={`m-auto rounded-full h-[52px] w-[52px] flex justify-center items-center bg-BlueHomz`}
              >
                <>
                  {card.icon}
                </>
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
      <div className="">
        <div className="flex flex-col justify-around items-center p-8 bg-[url('/Background_image.png')] text-white rounded-lg shadow-2xl bg-cover bg-center bg-BlueHomz max-w-full xl:w-[1159px] h-[303px]">
          <h1 className="font-[700] text-center text-[20px] md:text-[36px]">
            Elevate your property management game today
          </h1>
          <p className=" md:inline hidden font-[500] text-[20px]">
            Join over 2,000+ property managers who are scaling up.
          </p>
          <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-4">
            <Link href={"/register"} className="w-full sm:w-[116px] h-[48px] text-[16px] hover:bg-BlueHomz hover:border  flex items-center justify-center hover:text-white rounded-md font-[700]  text-BlueHomz  bg-white  px-2 py-1">
              Get started
            </Link>
            <Link href={"/contact-page"} className="w-full sm:w-[116px] h-[48px] text-[16px] hover:bg-white  flex items-center justify-center hover:text-BlueHomz rounded-md font-normal  text-white border bg-transparent px-2 py-1">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
