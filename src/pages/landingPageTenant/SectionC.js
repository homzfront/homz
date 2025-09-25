import CardCoin from "@/components/icons/cardCoin";
import Settings from "@/components/icons/settings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SectionC = ({routeTo, profile}) => {
  // Array of card objects
  const cards = [
    {
      icon: <CardCoin />,
      title: "Easy Bill Payments and Maintenance Requests",
      description:
        "Easily pay your light and estate bills with just a few clicks.",
    },
    {
      icon: <Settings />,
      title: "Access Maintenance Services On-the-Go",
      description:
        "Access maintenance services on the go with our software, ensuring your living space is cared for effortlessly."
    },
  ];
  return (
    <div className="mt-20 max-w-[1160px] m-auto px-6">
      <div className=" md:hidden ">
        <p className="text-center text-[23px] font-[700] text-BlackHomz">
          Your All-in-One Solution For Comfort.
        </p>
      </div>
      <div className="flex flex-row-reverse justify-center md:gap-4 md:justify-between mt-10">
        <div className="hidden gap-8 md:flex flex-col max-w-sm">
          {cards.map((card, index) => (
            <div key={index}>
              <div
                className={`rounded-full h-[52px] w-[52px] flex justify-center items-center bg-blue-100`}
              >
                <>
                  {card.icon}
                </>
              </div>
              <div className="flex mt-5 gap-1 flex-col">
                <h2 className="font-[700] text-[20px] text-BlackHomz">
                  {card.title}
                </h2>
                <p className="font-[400] text-[18px] text-GrayHomz">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Image
            src={"https://res.cloudinary.com/dniaq8eiz/image/upload/v1713181020/public/images/HappyLady_so6gfe.jpg"}
            alt="img"
            width={4096}
            height={2731}
            // layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="object-cover w-[573px] h-[310px] sm:h-[598px] bg-center border rounded-tr-[62px] rounded-bl-[62px] sm:rounded-tr-[135px] sm:rounded-bl-[135px]" // Add the '.image-clip' class
            priority
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="flex flex-col gap-2 justify-around items-center p-8 bg-[url('/Background_image.png')] text-white rounded-lg shadow-2xl bg-cover bg-center bg-BlackHomz max-w-full xl:w-[1159px] h-[303px]">
          <h1 className="font-[700] sm:leading-none leading-tight text-center text-[20px] sm:text-[30px] md:text-[36px]">
            Elevate Your Renting Experience Today
          </h1>
          <p className="mt-[-10px] sm:leading-none leading-tight text-center font-normal  sm:font-[500] text-[16px] sm:text-[20px]">
            Join over 2,000+ renters who are living a stress-free life.
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Link href={profile ? routeTo : "/register"}>
              <button className="w-full sm:w-[171px] h-[48px] text-[16px] rounded-md font-[600px]  text-BlackHomz  bg-white  px-2 py-1 hover:bg-transparent hover:text-white border hover:border-white ">
                Get started for free
              </button>
            </Link>
            <Link href={"/contact-page"}>
              <button className="w-full sm:w-[108px] h-[48px] text-[16px] rounded-md font-[500px]  text-white border bg-transparent px-2 py-1 hover:bg-white hover:text-BlackHomz">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionC;
