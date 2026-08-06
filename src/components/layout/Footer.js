"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import InstaWhite from "../icons/instaWhite";
import FacebookWhite from "../icons/facebookWhite";
import LinkedInWhite from "../icons/linkedInWhite";
import TwitterWhite from "../icons/twitterWhite";
import DateFooter from "../auth/dateFooter";
import LocationWhite from "../icons/locationWhite";
import PhoneWhite from "../icons/phoneWhite";
import WhatsappWhite from "../icons/whatsappWhite";

const Footer = () => {
  const propertyLinks = [
  { title: "Houses for rent in Lagos", path: "/rent/lagos" },
  { title: "Houses for sale in Lagos", path: "/sales/lagos" },
  { title: "Land for sale in Lagos", path: "/land/lagos" },
  { title: "Mini flats for rent in Lagos", path: "/rent/lagos/mini-flat" },
  { title: "Self contain for rent in Lagos", path: "/rent/lagos/self-contain" },
  { title: "Houses for rent in Abuja", path: "/rent/abuja" },
  { title: "Houses for sale in Abuja", path: "/sales/abuja" },
  { title: "Houses for rent in Oyo", path: "/rent/oyo" },
];

  return (
    <div className="h-auto max-w-[1440px] m-auto font-[400] text-[14px]  px-8  sm:px-[140px] py-10 bg-black text-white">
      <div className=" items-center flex justify-center flex-col m-auto max-w-[1165px]">
        <div className="flex md:text-sm lg:w-full xl:w-[1165px] flex-col lg:flex-row items-center justify-center gap-0 md:gap-4 lg:flex lg:items-start">
          <div className="max-w-[338px] md:max-w-full lg:w-auto">
            <Link href={"/"}>
              <Image
                src={"/Homz_colorless.png"}
                alt="HOMZ"
                height={27}
                width={131}
                style={{ width: "131px", height: "27px" }}
              />
            </Link>
            <h6 className="mt-7">
              Your Trusted Partner in Real Estate - Simplifying Property
              Transactions for Landlords, Managers and Tenants
            </h6>
            <div className="mt-8 md:mt-3 lg:mt-8 flex items-center gap-2">
              Certified by
              <Image
                src={"/NDPC.png"}
                height={29}
                width={98}
                alt="img"
              />
            </div>
            <div className="md:mt-3 lg:mt-8 mt-8">
              <p className="mb-3 lg:max-w-[280px] ">
                Get weekly updates on the best deals on Properties &
                Developments in Nigeria.
              </p>
              <div className="flex flex-col max-w-full lg:flex-row  gap-2">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="border text-black font-semibold lg:w-[280px] h-8 text-[11.17px]  rounded-sm shadow-sm px-2 py-3"
                />
                <button className="boreder lg:w-[86px] rounded-sm shadow-sm  hover:bg-blue-400 bg-BlueHomz text-white h-8 p-1 text-[11.17px]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex md:text-sm pr-[160px] pl-0 lg:pl-14 sm:pr-0 gap-4 md:gap-0   md:max-w-full max-w-[338px]  flex-col mt-10 lg:mt-[-10px]  md:grid md:grid-cols-2 xl:grid-cols-4"> */}
          <div className="flex flex-wrap md:flex-nowrap w-full mt-4 lg:mt-0 gap-4 justify-between">
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0 ">
              <h2 className="font-[700] text-[16px] lg:mb-3 truncate">Useful Links</h2>
              <Link href={"/about-us"}>
                <p>About Us</p>
              </Link>
              <Link href={"/all"}>
                <p>Properties</p>
              </Link>
              <Link href={"/privacy-policy"}>
                <p>Privacy Policy</p>
              </Link>
              <Link href={"/terms-and-conditions"}>
                <p>Terms of Use</p>
              </Link>
              <Link href={"/contact-page"}>
                <p>Contact</p>
              </Link>
              <Link href={"http://blog.homz.ng/"}>
                <p>Blog</p>
              </Link>
            </div>
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0 ">
              <h2 className="font-[700] text-[16px] lg:mb-3 truncate">
                Popular Properties
              </h2>
              <div className=" flex flex-col">
                {propertyLinks.map((prop) => (
                  <Link key={prop.title} href={prop.path}>
                    {prop.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0">
  <h2 className="font-[700] text-[16px] lg:mb-3">
    Contact Homz.ng
  </h2>

  <div className="flex flex-col gap-2 w-[200px]">

    <p className="flex items-center gap-2">
      <span className="mt-1">
        <LocationWhite />
      </span>
      <span>Lagos, Nigeria</span>
    </p>

    <p className="flex items-center gap-2">
      <span className="mt-1">
        <PhoneWhite />
      </span>
      <span>09160002460</span>
    </p>

    <p className="flex items-center gap-2">
      <span className="mt-1">
        <WhatsappWhite />
      </span>
      <span>WhatsApp Support</span>
    </p>

  </div>
            </div>
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0 ">
              <h2 className="font-[700] text-[16px] lg:mb-3">
                Socials
              </h2>
              <div className="flex flex-col gap-2 text-sm text-white font-medium">
                <Link className="flex gap-2 items-center" href={"https://www.instagram.com/homzng"}>
                  <InstaWhite /> Instagram
                </Link>
                <Link className="flex gap-2 items-center" href={"https://www.facebook.com/homzng"}>
                  <FacebookWhite /> Facebook
                </Link>
                <Link className="flex gap-2 items-center" href={"https://twitter.com/homzng"}>
                  <TwitterWhite /> X
                </Link>
                <Link className="flex gap-2 items-center" href={"https://linkedin.com/company/homzng"}>
                  <LinkedInWhite /> LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 m-auto lg:max-w-full max-w-[338px] md:text-sm lg:text-center">
          <DateFooter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
