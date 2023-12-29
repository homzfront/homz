"use client";

import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactCard = () => {

  const users = [
    {
      id: 1,
      name: "John Daniels",
      image: "/static/images/image.png",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Ayomide Uriel",
      image: "/static/images/image.png",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Costa David",
      image: "/static/images/image.png",
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "1%", // Set centerPadding to 0 for the first slide
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mt-[60px] max-w-[1299px]  m-auto px-6 relative">
      <div className="ml-[3%]">
        <Slider {...sliderSettings}>
          {users.map((user) => (
            <div key={user.id}>
              <div className="h-auto flex flex-col-reverse sm:flex-row max-w-[460px] sm:max-w-full md:max-w-[820px] lg:max-w-full xl:max-w-[1308px] mr-0  sm:mr-4  rounded-2xl border">
                

              <div className="w-full  max-w-[480px] h-auto rounded-2xl ">
                <div className="w-full h-full  sm:bg-cover sm:bg-center">
                  <Image
                    className="rounded-lg"
                    src={user.image}
                    width={240}
                    height={232}
                    alt="img"
                    style={{ width: "auto", height: "auto" }}
                  
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      </div>
      <div className="sm:hidden mt-[80px] flex flex-col gap-4">
        <button className=" w-[100%] h-[48px] text-[16px]  rounded-md font-normal hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz  text-white  bg-BlueHomz  px-2 py-1">
          Get started
        </button>
        <button className=" w-[100%] h-[48px] text-[16px] rounded-md font-normal hover:bg-BlueHomz hover:text-white text-BlueHomz  border border-BlueHomz bg-transparent px-2 py-1">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
