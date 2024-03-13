"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="h-auto max-w-[1440px] m-auto font-[400] text-[14px]  px-8  sm:px-[140px] py-10  mt-36 bg-black text-white">
      <div className=" items-center flex justify-center flex-col m-auto max-w-[1165px]">
        <div className="flex md:text-sm lg:w-full xl:w-[1165px] flex-col lg:flex-row items-center justify-center  lg:flex lg:items-start">
          <div className="max-w-[338px] md:max-w-full lg:w-auto">
            <Link href={'/'}>
              <Image
                src={"/Homz_colorless.png"}
                alt="HOMZ"
                height={27}
                width={131}  
                style={{ width: "auto", height: "auto" }} 
                
              />
            </Link>
            <p className="mt-7 lg:max-w-[280px]">
              Below are the list of the trusted agents that we currently have on
              the platform.
            </p>
            <div className="mt-8 md:mt-3 lg:mt-8  ">
              <p className="mb-1">Follow Us</p>
              <div className="flex gap-2">
                <Link href={"https://www.instagram.com/homzng"}>
                  <Image
                    src={"/ph_instagram-logo-fill.png"}
                    alt="Instagram"
                    height={"25"}
                    width={"25"}
                    
                  />
                </Link>
                <Link href={""}>
                  <Image
                    src={"/ic_baseline-facebook.png"}
                    alt="Facebook"
                    height={"25"}
                    width={"25"}
                  />
                </Link>
                <Link href={"https://twitter.com/homzng"}>
                  <Image
                    src={"/ant-design_twitter-circle-filled.png"}
                    alt="Twitter"
                    height={"25"}
                    width={"25"}
                  />
                </Link>
                <Link href={""}>
                  <Image
                    src={"/entypo-social_linkedin-with-circle.png"}
                    alt="Linked In"
                    height={"25"}
                    width={"25"}
                  />
                </Link>
              </div>
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
          <div className="flex w-full justify-center">
            <div className="leading-loose pl-0 ">
              <h2 className="font-[700] text-[16px]  mb-2 md:mb-5">
                Useful Links
              </h2>
              <Link href={"/about-us"}>
                <p>About Us</p>
              </Link>
              <p>Properties</p>
              <p>Privacy Policy</p>
              <p>Terms of Use</p>
              <Link href={"/contact-page"}> 
                <p>Contact</p>
              </Link>
              <p>FAQs</p>
            </div>
            {/* <div className="leading-loose  ">
              <h2 className="font-[700] text-[16px] mb-2 md:mb-4">
                Popular States
              </h2>
              <p>Properties in Lagos</p>
              <p>Properties in Delta</p>
              <p>Properties in Kano</p>
              <p>Properties in Abuja</p>
              <p>Properties in Imo</p>
              <p>Properties in Ogun</p>
              <p>Properties in Oyo</p>
            </div>
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0 ">
              <h2 className="font-[700]  text-[16px] mb-2 md:mb-4">
                Popular Cities
              </h2>
              <p>Lekki</p>
              <p>Ikeja</p>
              <p>Ikoyi</p>
              <p>Ibadan</p>
              <p>Port Harcourt</p>
              <p>Kano</p>
              <p>Asaba</p>
            </div>
            <div className="leading-loose mt-0 md:mt-2 xl:mt-0 ">
              <h2 className="font-[700] text-[16px]  mb-2 md:mb-4">
                Popular Lands for sale
              </h2>
              <p>Lands in Lagos</p>
              <p>Lands in Asaba</p>
              <p>Lands in Kano</p>
              <p>Lands in Abuja</p>
              <p>Lands in Imo</p>
              <p>Lands in Ogun</p>
              <p>Lands in Oyo</p>
            </div> */}
          </div>
        </div>
        <div className="mt-10 m-auto lg:max-w-full max-w-[338px] md:text-sm lg:text-center">
          &copy; 2024 Homz.ng. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
