"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

const PricingCard = ({ price, title, billing, features }) => (
  <div className=" max-w-[268px] m-auto flex flex-col gap-4 p-6 text-[16px] font-[400] h-[604px] border shadow-lg rounded-2xl">
    <h1 className="text-[23px] text-center font-[700] text-BlackHomz">
      {price}
    </h1>
    <h1 className="text-[20px] text-center font-[500]">{title}</h1>
    <p className="text-[14px] mt-[-20px] text-center font-[500] text-BlackHomz">
      {billing}
    </p>
    <button className="h-[48px] rounded-lg text-[16px] w-full bg-BlueHomz hover:bg-blue-400 text-white">
      Start free trial
    </button>
    {features.map((feature, i) => (
      <div key={i} className="flex flex-row items-center gap-2">
        <div className="h-[14px] w-[16px] bg-green-200 flex justify-center border rounded-full">
          <Image height={10.5} width={12} src={"/IconMark.png"} />
        </div>
        <p>{feature}</p>
      </div>
    ))}
  </div>
);

const Pricing = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const pricingPlans = [
    {
      price: "N9,500",
      title: "Enterprise starter",
      billing: "Billed monthly",
      features: [
        "Up to 5 estates",
        "Up to 2 users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant Management",
      ],
    },
    {
      price: "N19,000",
      title: "Enterprise plus",
      billing: "Billed monthly",
      features: [
        "Up to 20 estates",
        "Up to 5 users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant",
      ],
    },
    {
      price: "N30,000",
      title: "Enterprise premium",
      billing: "Billed monthly",
      features: [
        "Up to 100 estates",
        "Unlimited",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant",
      ],
    },
    {
      price: "Contact Sales", // You might want to provide an actual price for the premium plan
      title: "Premium plan",
      billing: "Billed monthly",
      features: [
        "Unlimited Estates",
        "Unlimited Users",
        "Free Trial",
        "Accounts & reporting",
        "Whitelabels",
        "Maintenance management",
        "Property information",
        "Tenant",
      ],
    },
  ];
  return (
    <div className="pt-[4px] ">
      <div className="max-w-[1156px] m-auto flex flex-col gap-[80px] ">
        <div className="h-[29px]  mt-10 sm:mt-0 p-7">
          <Link href={"/plan/enterprise-plan"}>
            <Image src={"/Link (1).png"} alt="img" height={25} width={85} />
          </Link>
        </div>
        <div className="mt-[-50px] m-auto px-8 h-[800px]"> 
          <div className="max-w-[897px] m-auto mb-10 flex flex-col items-center gap-3">
            <h2 className="  text-BlueHomz text-[18px]  text-center font-[500]">
              Pricing
            </h2>
            <h1 className="text-[23px] sm:text-[36px] text-center font-[700]">
              Simple, transparent pricing
            </h1>
            <p className="text-[18px] sm:text-[20px] text-center text-GrayHomz font-[500]">
              We believe our enterprise plans should be accessible to all
              property managers.
            </p>
          </div>
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-GrayHomz">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col justify-around p-6 text-[16px] font-[400] w-[265px] h-[604px] border shadow-lg rounded-2xl"
              >
                <h1 className="text-[23px] text-center font-[700] text-BlackHomz">
                  {plan.price}
                </h1>
                <h1 className="text-[20px] text-center font-[500]">
                  {plan.title}
                </h1>
                <p className="text-[14px] mt-[-20px] text-center font-[500] text-BlueHomz">
                  {plan.billing}
                </p>
                <button className="h-[48px] rounded-lg text-[16px] w-full bg-BlueHomz hover:bg-blue-400 text-white">
                  Start free trial
                </button>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex flex-row items-center gap-2">
                    <div className="h-[14px] w-[16px] bg-green-200 flex justify-center border rounded-full">
                      <Image height={10.5} alt="img" width={12} src={"/IconMark.png"} />
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="sm:hidden grid text-GrayHomz">
            <Slider {...settings} className="max-w-sm">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
