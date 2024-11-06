"use client";
import SliderAuth from "@/components/auth/slider";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import LoadingForm from "@/components/mainmenu/loadingForm";
import api from "@/utils/api";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setShowLogin, data }) => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const Visible = () => {
    setVisible(!visible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      // Invalid email format
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || !data.email) {
      setLoginError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Check if the password meets the length requirement
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: password,
      });

      if (response.data.statuscode === 201) {
        toast.success("Login successful");
        const data = response.data.data.token;
        localStorage.setItem('jwt', data)
        setLoading(false);
        setShowLogin(false);
      } else {
        const error = response.data.message;
        setLoginError(error);
        setLoading(false);
      }
    } catch (error) {
      setLoginError(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex w-full h-[1024px]">
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
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <SliderAuth />
        </div>
        <div className="flex flex-col flex-1 mt-[100px] items-center">
          <div className="w-full flex flex-col gap-2 items-center justify-center mb-6">
            <label className="text-[24px] text-BlackHomz font-[700]">Log In As A Landlord</label>
            <h3 className="text-GrayHomz font-[400] text-[16px]">Enter your account password to proceed</h3>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-GrayHomz2">
                  Email<span className="text-GrayHomz2">*</span>
                </label>
                <input
                  className="border border-GrayHomz2 text-GrayHomz2 w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type="text"
                  disabled
                  value={data?.email}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <div className="relative flex flex-col gap-2 items-start">
                <label className="text-center text-[14px] font-[500] text-BlackHomz">
                  Password<span className="text-red-600">*</span>
                </label>
                <input
                  className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
                  type={visible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setLoginError("")
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
            </div>
            <button
              className={`bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz`}
              type="Submit"
            >
              {loading ? (
                <div className="w-full flex justify-center">
                  <LoadingForm />
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
