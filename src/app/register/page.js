"use client";
import BashedEye from "../components/icons/BashedEye";
import Eye from "../components/icons/Eye";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password meets the length requirement
    if (formData.password.length < 8) {
      setPasswordError(true);
      return; // Stop the submission if the password is too short
    }

    // Continue with your registration logic
    // fetch('/api/register', {
    //   method: "POST",
    //   body: JSON.stringify({email: formData.email, password: formData.password}),
    //   headers: {'Content-Type' : 'application/json'}
    // })

    // Reset the form data after submitting
    setFormData({ email: "", password: "" });
    setPasswordError(false);
    router.push('/verify-email')

  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setPasswordError(false); // Reset password error when the user types
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

  const Visible = () => {
    setVisible(!visible);
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
            <div className="flex flex-col gap-6 m-auto  max-w-[360px]">
              <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                Create Account
              </h1>
              <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                Your All-In-One property portal in just one click!
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email*
                    </label>
                    <input
                      className="border w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="relative flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Password*
                    </label>
                    <input
                      className={`border w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${
                        passwordError ? "border-red-500" : ""
                      }`}
                      type={visible ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Create a password"
                    />
                    <div className="absolute top-11 right-4" onClick={Visible}>
                      {visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <BashedEye className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  {passwordError && (
                    <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                      Must be at least 8 characters
                    </span>
                  )}
                </div>
                <button
                  className="bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                  type="Submit"
                >
                  Get Started
                </button>
                <div className="">
                  <button className="border flex justify-center items-center gap-3 font-[700] text-[16px] text-BlueHomz w-[360px] border-BlueHomz hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
                    <Image
                      className=""
                      src={"/Social icon.png"}
                      alt="google"
                      height={"20"}
                      width={"20"}
                    />
                    Sign Up with google
                  </button>
                </div>
                <h3 className="text-center font-[400] text-[11px]">
                  By registering you accept our terms of use and privacy and
                  agree that we and our selected partners may contact you with
                  relevant offers and services.
                </h3>
                <p className="text-center font-[400] text-[14px]">
                  Already have an account?
                  <Link
                    className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
