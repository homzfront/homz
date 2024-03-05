import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};



const images = [
    {
      icon: "/Hand-drawn line_22.png",
      alt: "people",
    },
    {
      icon: "/Hand-drawn line (2).png",
      alt: "people",
    },
    {
      icon: "/Hand-drawn line (1).png",
      alt: "people",
    },
  ];


const SliderAuth = () => {
  return (
    <div>
        <div className="flex flex-col  justify-around items-center">
          <div className="max-w-[472px] pt-8 flex flex-col gap-[50px]">
            <Link href={"/"}>
              <Image
                src={"/Homz_colorless.png"}
                className="ml-2"
                height={27}
                width={131}
                alt="img"
              />
            </Link>
            <div className="">
              <Slider {...settings}>
                {images.map((card, index) => (
                  <div key={index} className="">
                    <Image
                      src={card.icon}
                      height={399}
                      width={333}
                      alt={`${card.alt}-img`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              <p className="text-[20px] mt-6 text-white text-start font-[500]">
                All-In-One Account Portal To Find, Manage And Monitor Your
                Property Effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="font-[600] pt-[140px] text-GrayHomz3 text-center  text-[14px]">
          &copy; 2022 Homz.ng. All rights reserved
        </div>
      </div>
 
  );
};

export default SliderAuth;
