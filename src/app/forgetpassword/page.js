"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentMail] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const isValidEmail = (email) => {
    // Regular expression for a simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    // Perform the reset link sending logic here
    // For now, just update the sentEmail state
    setEmailError(false);
    setEmail('');
    setSentMail(true);
  };

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

  return (
    <div className="">
      <div className="flex m-auto max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <div className="flex flex-col px-8  justify-around items-center">
            <div className="max-w-[472px] pt-8 flex flex-col gap-[50px]">
              <Link href={"/"}>
                <Image
                  src={"/Homz_colorless.png"}
                  className="ml-2"
                  height={27}
                  width={131}
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
        <div className="w-[794px] flex flex-col justify-around items-center">
          <div className="h-[85%]  py-4">
            {!sentEmail ? (
              <div className="flex flex-col max-w-[360px] mt-1">
                <h1 className="text-[36px] text-start font-[700] text-BlackHomz">
                  Forgot Password?
                </h1>
                <p className="mt-1 text-[16px] text-start font-[400] text-GrayHomz">
                  Enter your email and we’ll send you a reset link.
                </p>
                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email*
                    </label>
                    <input
                          className={`border w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${
                            emailError ? 'border-red-500' : ''
                          }`}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false); // Reset the error when the user types
                      }}
                      placeholder="Enter your email"
                    />
                    {emailError && (
                      <p className="mt-1 text-[14px] font-[400] text-red-500">
                        Invalid email format
                      </p>
                    )}
                  </div>
                </form>
                <button
                  type="submit"
                  onClick={() => {
                    if (isValidEmail(email)) {
                      setEmailError(false);
                      setSentMail(true);
                    } else {
                      setEmailError(true);
                    }
                  }}
                  className="mt-7 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                >
                  Send Reset Link
                </button>
                <p className="mt-6 text-center font-[400] text-[14px]">
                  Don’t have an account?
                  <Link
                    className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                    href={"/register"}
                  >
                    Create Account
                  </Link>
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  <Image
                    src={"/arrow-left.png"}
                    className=""
                    height={17}
                    width={16}
                  />
                  <Link
                    href={"/login"}
                    className="text-center text-[14px] font-[700]"
                  >
                    Go back to Log In
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col max-w-[360px] mt-2 items-center">
                <h1 className="text-[36px] font-[700] text-BlackHomz">
                  Reset Password
                </h1>
                <p className="mt-1 text-[16px] font-[400] text-center text-GrayHomz">
                  We have sent a reset password to <br /> Samson@gmail.com
                </p>
                <Link
                  href={"/resetpassword"}
                  className="mt-5 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[48px] text-center py-[10px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                >
                  Continue
                </Link>
                <p className="mt-5 text-center font-[400] text-[14px]">
                  Didn't receive the email?
                  <Link
                    className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                    href={""}
                  >
                    Click to resend
                  </Link>
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  <Image
                    src={"/arrow-left.png"}
                    className=""
                    height={17}
                    width={16}
                  />
                  <Link
                    href={"/login"}
                    className="text-center text-[14px] font-[700]"
                  >
                    Go back to Log In
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
