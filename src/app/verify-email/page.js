"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  
  useEffect(() => {
    const storedEmail = Cookies.get("email");
    setEmail(storedEmail);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      // Make a POST request to verify the OTP
      const response = await axios.post("http://localhost:5000/api/auth/verification", {
        email: email, // Replace with the actual email
        pincode: otp.join(""),
      });
   
        console.log("OTP verification successful", response.data);
        setVerificationSuccess(true);
        setError(false);
        setError2('')

    } catch (error) {
      // Handle errors
      console.error("OTP verification error", error);
      setError2(error.response.data.error);
      setError(true);
    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with error:", error.response.data);
        
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
        setError2("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        
      }
    }
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();
    router.push('/select-plan');
  };

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      setError(false); // Reset error when a valid digit is entered
    } else if (value === "" && index >= 0) {
      // If backspace is pressed and the box is not the first one
      const newOTP = [...otp];
      newOTP[index] = "";
      setOTP(newOTP);
      setError(false); // Reset error when backspace is pressed
    } else {
      setError(true); // Set error when an invalid character is entered
    }
  };

  const isOTPComplete = otp.every((digit) => /^\d$/.test(digit));

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
      <div className="flex m-auto  max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <div className="flex flex-col justify-around items-center">
            <div className="max-w-[472px] pt-8 flex flex-col gap-[50px]">
              <Link href={"/"}>
                <Image
                  src={"/Homz_colorless.png"}
                  className="ml-3"
                  height={27}
                  alt="img"
                  width={131}
                />
              </Link>
              <div>
                <p className="text-[20px] ml-2 mt-6 text-white text-start font-[500]">
                  All-In-One Account Portal To Find, Manage And Monitor Your
                  Property Effortlessly.
                </p>
              </div>
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
            </div>
          </div>
          <div className="font-[600] pt-[140px] text-GrayHomz3 text-center  text-[14px]">
            &copy; 2022 Homz.ng. All rights reserved
          </div>
        </div>
        <div className="w-[794px] px-6 flex flex-col justify-around items-center">
          <div className="h-[85%]  py-4">
            {!verificationSuccess ? (
              <div className="flex flex-col gap-6 m-auto  max-w-[360px]">
                <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                  Check Your Email
                </h1>
                <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                  We sent an OTP to
                  <span className="text-BlackHomz font-[500]">
                    <> </> {email}
                  </span>
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 w-360">
                    <div className="flex gap-2 h-[72px]">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className={`border rounded-md text-[41px] font-[700] text-GrayHomz w-[80px] p-2 text-center ${
                            error ? "border-red-500" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-[-10px] text-[14px] font-[400] text-GrayHomz2">
                      Enter OTP sent to <> </> {email}
                    </p>
                    {error2 && (
                      <span className="text-red-500">{error2}</span>
                    )}
                    {isOTPComplete ? (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-4 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                      >
                        Verify Email
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="mt-4 bg-GrayHomz6 text-GrayHomz5 font-[700] text-[16px] w-full rounded-[4px] h-[47px] opacity-50 "
                      >
                        Verify Email
                      </button>
                    )}
                  </div>
                  <p className="text-center font-[400] text-[14px]">
                    Didn't receive the email?
                    <Link
                      className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                      href={""}
                    >
                      Click to resend
                    </Link>
                  </p>
                  <div className="flex justify-center gap-1">
                    <Image
                      src={"/arrow-left.png"}
                      className=""
                      height={17}
                      width={16}
                      alt="img"
                    />
                    <Link
                      href={"/register"}
                      className="text-center text-[14px] font-[700]"
                    >
                      Go back to sign Up
                    </Link>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col max-w-[360px] mt-2 items-center">
                <h1 className="text-[36px] font-[700] text-BlackHomz">
                  Email Verified
                </h1>
                <p className="mt-4 text-[16px] font-[400] text-GrayHomz">
                  Your email has successfully been verified. Click below to continue with your account setup.
                </p>
                <button
                  onClick={handleEmailVerification}
                  className="mt-4 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                >
                  Continue
                </button>
                <div className="mt-4 flex justify-center gap-1">
                  <Image
                    src={"/arrow-left.png"}
                    className=""
                    height={17}
                    width={16}
                    alt="img"
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

export default VerifyEmail;
