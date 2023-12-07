"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useProfileStore from "@/store/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setLoginError("Please fill in all fields.");
      return;
    }

  

    // Check if the password meets the length requirement
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await api.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.statuscode === 201) {
        toast.success("login successful");
        console.log(response.data.data);
        const { data } = response.data;
        Cookies.set("profile", data.email);

        
        // This line sets isLoggedIn to true
 
        useProfileStore.setState({
          user: data,
          isLoggedIn: true,
          loading: false,
        });
        router.push("/");
        setEmail("");
        setPassword("");
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        setLoginError(error);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoginError(error.response?.data?.message);
    }
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex m-auto max-w-full sm:max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
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
        <div className="sm:w-[794px] w-full px-6 flex flex-col justify-around items-center">
          <div className="h-[85%] px-6 W-[320px] sm:w-full py-4">
            <div className="flex flex-col gap-6 m-auto  max-w-[360px]">
              <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                Welcome Back
              </h1>
              <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                Welcome back, please enter your details.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email*
                    </label>
                    <input
                      className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="relative flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Password*
                    </label>
                    <input
                      className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  {loginError && (
                    <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                      {loginError}
                    </span>
                  )}
                  <Link
                    href={"/forgetpassword"}
                    className="font-[700] text-BlueHomz text-[13px]"
                  >
                    Forgot Password
                  </Link>
                </div>
                <button
                  className="bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                  type="Submit"
                >
                  Log In
                </button>
                <div className="">
                  <button onClick={handleGoogleSignIn}  className="border flex justify-center items-center gap-3 font-[700] text-[16px] text-BlueHomz w-full sm:w-[360px] border-BlueHomz hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
                    <Image
                      className=""
                      src={"/Social icon.png"}
                      alt="google"
                      height={"20"}
                      width={"20"}
                    />
                    Login In with google
                  </button>
                </div>
                <p className="text-center font-[400] text-[14px]">
                  Don’t have an account?
                  <Link
                    className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                    href={"/register"}
                  >
                    Create Account
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

export default Login;
