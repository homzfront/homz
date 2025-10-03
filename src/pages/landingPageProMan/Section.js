import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = (routeTo, profile) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'linear', 
  };

  const cards = [
    {
      id: 1, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738077822/public/Enterprise/firstImage_yysihm.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    },
    {
      id: 2, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738144268/public/Enterprise/imageTwo_zrreek.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    },
    {
      id: 3, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738077824/public/Enterprise/thirdImage_r28fq0.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    },
    {
      id: 4, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738077822/public/Enterprise/fourthImage_kdeyic.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    },
    {
      id: 5, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738077822/public/Enterprise/fifthImage_csffac.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    },
    {
      id: 6, image: <Image
        src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1738077823/public/Enterprise/sixthImage_er2eoy.png"}
        alt="img"
        width={2880}
        height={2048}
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        className="object-top bg-top h-[504px] image-clip border-t-4 border-l-4 border-r-4 sm:border-t-8 sm:border-l-8 sm:border-r-8 border-BlueHomz rounded-[12px]" // Add the '.image-clip' class
        priority
      />
    }
  ]
  return (
    <div className=" flex flex-col mt-16 max-w-[1160px] m-auto px-6 gap-14 py-4">
      <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" hidden sm:inline text-[41px] font-[700] text-center leading-tight text-BlackHomz">
            All-In-One Property Management Software for Professional Managers
          </h1>
          <h1 className="text-[29px] sm:hidden font-[700] text-center">
            All-In-One Property Management Software for Professional Managers
          </h1>
          <p className="text-[18px] sm:text-[20px] max-w-[1024px] font-[500] mt-2 text-center text-GrayHomz">
            Elevate your property management game with our intuitive and
            efficient software solution. Seamlessly manage your renter database,
            incentivize on-time payments, and gain a clear financial overview.
          </p>
        </div>
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2">
          <Link
            href={"https://cal.com/homzng/"}
            className="text-md w-full md:w-[147px] h-[48px] text-[16px] mt-10 rounded-md font-normal flex items-center justify-center text-white bg-BlueHomz  px-4 py-1 hover:bg-white hover:border hover:border-BlueHomz hover:text-BlueHomz">
           Book Demo
          </Link>
          <Link
            href={"/document-generation"}
            className="h-[48px] w-full md:w-auto text-[16px] md:mt-10 rounded-md font-[500] px-4 flex  justify-center items-center text-BlueHomz border border-BlueHomz hover:border-none hover:bg-BlueHomz4 hover:text-white"
          >
            Generate Property Documents
          </Link>
        </div>
      </div>
      <div>
      <div className="mt-2 w-full px-4">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full px-4"
            >
              {
                card.image
              }
            </div>
          ))}
        </Slider>
      </div>

      </div>
    </div>
  );
};

export default Section;
