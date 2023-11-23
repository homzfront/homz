"use client";

import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactCard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);



  const users = [
    {
      id: 1,
      name: "John Daniels",
      image: (
        <Image
          className="rounded-2xl"
          src={"/image.png"}
          width={480}
          height={464}
        />
      ),
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "Ayomide Uriel",
      image: (
        <Image
          className="rounded-2xl"
          src={"/image.png"}
          width={480}
          height={464}
        />
      ),
      position: "Tenant",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "Costa David",
      image: (
        <Image
          className="rounded-2xl"
          src={"/image.png"}
          width={480}
          height={464}
        />
      ),
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

    slidesToShow: 1.01,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div style={{ marginBottom:"-20px"}}>
        <ul style={{ margin: "0" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <div className="mt-[60px] relative">
      <Slider {...sliderSettings}>
        {users.map((user) => (
          <div key={user.id}>
            <div className="flex flex-col-reverse sm:flex-row max-w-[460px] sm:max-w-full md:max-w-[820px] lg:max-w-full xl:max-w-[1308px] mr-0  sm:mr-4  rounded-2xl border">
              <div className="flex flex-col justify-start p-12">
                <div className="star-rating">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={`focus:outline-none ${
                          index <= (hover || rating)
                            ? "text-BlueHomz"
                            : "text-gray-300"
                        }`}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        onDoubleClick={() => {
                          setRating(0);
                          setHover(0);
                        }}
                      >
                        <span className="text-2xl">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
                <h1 className="font-[500] text:[28px]  lg:text-[36px] mb-4 text-BlackHomz">
                  {user.content}
                </h1>
                <p className="font-[500] text-[14px] lg:text-[18px] text-BlackHomz">
                  - {user.name}
                </p>
                <p className="font-[500] text-[14px] lg:text-[18px] text-GrayHomz">
                  {user.position}
                </p>
              </div>
              <div className="w-full  h-full rounded-2xl object-cover">
                {user.image}
              </div>
            </div>
          </div>
        ))}
      </Slider>
          <div className="sm:hidden mt-[80px] flex flex-col gap-4">
            <button className=" w-[100%] h-[48px] text-[16px] rounded-md font-normal  text-white  bg-BlueHomz  px-2 py-1 hover:text-[18px] ">
            Contact us

            </button>
            <button className=" w-[100%] h-[48px] text-[16px] rounded-md font-normal  text-BlueHomz  border border-BlueHomz bg-transparent px-2 py-1 hover:text-[18px]">
              Get started
            </button>
          </div>
    </div>
  );
};

export default ContactCard;
