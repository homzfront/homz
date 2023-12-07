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
      image: "/image.png",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 2,
      name: "John Daniels",
      image: "/image.png",
      position: "Property Manager",
      content:
        "“I love the simplicity of the services offered by the Homz.ng management software.”",
    },
    {
      id: 3,
      name: "John Daniels",
      image: "/image.png",
      position: "Property Manager",
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
    // centerPadding: "1%", // Set centerPadding to 0 for the first slide
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
                <div className="h-[40vh] sm:h-auto xl:h-[30vh]">
                  <div className="flex flex-col gap-3 xl:gap-4 w-full justify-start px-12">
                    <div className="star-rating mt-8">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={`focus:outline-none ${
                              index <= (hover || rating)
                                ? "text-gray-300"
                                : "text-BlueHomz"
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
                    <h1 className="font-[500] h-auto text:[24px] sm:text-[13px] lg:text-[22px] xl:text-[36px] mb-1 md:mb-0 xl:mb-4 text-BlackHomz">
                      {user.content}
                    </h1>
                    <div>
                      <p className="font-[500] text-[14px] sm:text-[11px] lg:text-[16px] xl:text-[18px] text-BlackHomz">
                        - {user.name}
                      </p>
                      <p className="xl:mt-3 mt-0 mb-4 sm:mb-4 font-[500]  text-[14px] sm:text-[9px] lg:text-[14px] xl:text-[16px] text-GrayHomz">
                        {user.position}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full  max-w-[480px] h-auto rounded-2xl ">
                  <div className="w-full h-full ">
                    <Image
                      className="rounded-2xl "
                      src={user.image}
                      width={481}
                      height={464}
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
      <div className="sm:hidden mt-20 flex flex-col gap-4">
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
