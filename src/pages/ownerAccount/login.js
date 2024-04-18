"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import LoadingForm from "@/components/mainmenu/loadingForm";
import api from "@/utils/api";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
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
    if (!emailRegex.test(email)) {
      // Invalid email format
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || !email) {
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
        email: email,
        password: password,
      });

      if (response.data.statuscode === 201) {
        toast.success("Login successful");
        const  data = response.data.data.token;
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
    <div>
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
      <div className="w-full flex justify-center mb-3">
        <label className="text-[36px] font-[700]">Log in</label>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 items-start">
            <label className="text-center text-[14px] font-[500] text-BlackHomz">
              Email*
            </label>
            <input
              className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setLoginError("")
              }}
              placeholder="Enter your email"
              autoComplete="email"
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
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
