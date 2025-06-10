// components/PropertySlider.tsx
"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "flowbite-react";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import useViewportStore from "@/store/useViewportState";


const PropertySlider = ({
  properties,
  isSingleSlide = false,
  carouselTheme,
}) => {
  const { width } = useViewportStore()
  console.log("width:", width)

  const slidesToShow = () => {
    if (isSingleSlide) return 1;
    if (width > 1260) return 3;
    if (width <= 1000) return 1;
    if (width > 1000 && width <= 1260) return 2;
    return 1;
  };


  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow(),
    className: "center",
    centerMode: true,
    centerPadding: "0",
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: null,
    nextArrow: null,
  };

  const singleSlideSettings = {
    ...sliderSettings,
    slidesToShow: 1,
    centerPadding: "0%",
  };

  const slidesToShowCount = slidesToShow();
  const slideWidth = width <= "640" ? 290 : 373 + 16;
  const totalSliderWidth = slidesToShowCount * slideWidth;


  return (
    <div style={{ width: totalSliderWidth, maxWidth: '100%' }} className="mx-auto">
      <Slider {...(isSingleSlide ? singleSlideSettings : sliderSettings)}>
        {properties?.map((property, idx) => (
          <div className="w-full mb-8" key={idx}>
            <div className="w-[290px] sm:w-[360px] h-[458px] bg-white rounded-lg shadow-md mx-auto">
              <div className="cursor-pointer w-[373px] h-[252px]">
                <Carousel
                  slide={false}
                  theme={carouselTheme}
                  className="w-[290px] sm:w-[360px] h-[252px]"
                >
                  {property?.property?.photos?.map((img, index) => (
                    <div key={index} className="w-[290px] sm:w-[360px] h-[252px]">
                      <Image
                        src={img?.url}
                        alt=""
                        width={373}
                        height={252}
                        className="w-[290px] sm:w-[360px] h-[252px] rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="flex flex-col px-6 py-4 justify-between h-[206px]">
                <div className="flex justify-between items-center">
                  <p className="text-BlueHomz w-[75%] truncate text-start text-[23px] font-[700]">
                    {capitalizeFirstLetter(
                      property?.property?.name || property?.property?.title || ""
                    )}
                  </p>
                  {property?.property?.listingType && (
                    <div className="bg-BlueHomz rounded-[4px] flex justify-center items-center w-[68px] h-[25px]">
                      <p className="text-white text-[11px] font-[400]">
                        {capitalizeFirstLetter(property?.property?.listingType)}
                      </p>
                    </div>
                  )}
                </div>
                {property?.property?.propertyType && (
                  <p className="text-blue-600 text-[14px] font-[400]">
                    {capitalizeFirstLetter(property?.property?.propertyType)}
                  </p>
                )}
                {property?.property?.price && (
                  <p className="text-[16px] font-[700] flex items-center">
                    <Image
                      src="/static/images/nairaIcon.svg"
                      alt=""
                      width={15}
                      height={25}
                      className="h-6 w-4"
                    />
                    <span className="pl-1 text-BlackHomz">
                      {Number(property?.property?.price).toLocaleString()}
                    </span>
                  </p>
                )}
                <p className="flex gap-1 items-center text-[14px] font-[500] text-BlackHomz">
                  <Image
                    src="/static/images/Location_Vector.svg"
                    alt=""
                    width={12}
                    height={16}
                    className="h-4 w-3"
                  />
                  {`${capitalizeFirstLetter(
                    property?.property?.area || ""
                  )}, ${capitalizeFirstLetter(property?.property?.state || "")}`}
                </p>
                <div className="flex justify-between items-center text-[10px] font-[500] text-BlackHomz">
                  <div className="flex gap-4 items-center text-xs md:text-sm text-gray-800">
                    {property?.property?.numberOfRooms && (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/static/images/bed_Vector.svg"
                          alt=""
                          width={17}
                          height={12}
                          className="h-4 w-4"
                        />
                        {property?.property?.numberOfRooms === 1
                          ? `${property?.property?.numberOfRooms} bedroom`
                          : `${property?.property?.numberOfRooms} bedrooms`}
                      </div>
                    )}
                    {property?.property?.numberOfBathrooms && (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/static/images/shower_Vector.svg"
                          alt=""
                          width={17}
                          height={12}
                          className="h-4 w-4"
                        />
                        {property?.property?.numberOfBathrooms === 1
                          ? `${property?.property?.numberOfBathrooms} bathroom`
                          : `${property?.property?.numberOfBathrooms} bathrooms`}
                      </div>
                    )}
                    {property?.property?.squareMeter && (
                      <div className="flex items-center gap-1">
                        <Image
                          src="/static/images/sqrtFeet-vector.svg"
                          alt=""
                          width={21}
                          height={12}
                          className="h-4 w-5"
                        />
                        {property?.property?.squareMeter} Sqft
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/user_homepage/PreviewProperty/${property?.property?.slug}`}
                  >
                    <button className="">
                      <Image
                        src="/static/images/arrow-in-circle.svg"
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>

  );
};

export default PropertySlider;