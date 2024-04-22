"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useProfileStore from "@/store/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import Loading from "@/components/mainmenu/loading";
import useBodyScroll from "@/utils/useBodyScroll";
import SliderAuth from "@/components/auth/slider";
import determineUserDashboard from "@/utils/determineUserDashboard";
import Cookies from "js-cookie";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
// import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  useBodyScroll([loading])

  // const handleGoogleSignIn = () => {
  //   signIn('google');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Early return if already loading
    if (loading) return;
  
    setLoading(true); // Set loading state
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
  
    // Validate required fields
    if (!password || !email) {
      setLoginError("Please fill in all fields.");
      setLoading(false);
      return;
    }
  
    // Check password length
    if (password.length < 8) {
      setLoginError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
  
    try {
      // Login request
      const response = await api.post("/auth/login", {
        email,
        password,
      });
  
      if (response.status === 201) { // Handle expected successful login status code
        const data = response.data.data.token;
        // toast.success("Login Successful")
        localStorage.setItem('jwt', data)
        // Fetch user profile
        const profileResponse = await api.get("/user/profile");
  
        if (profileResponse.status === 200 || profileResponse.status === 201) { // Handle expected success status codes
          const profileData = profileResponse.data;
  
          // Navigation logic based on user roles and account status
          const navigateTo = determineUserDashboard(profileData); // Helper function for cleaner logic
          if (navigateTo) {
            router.push(navigateTo);
          } else {
            // Default navigation for unhandled roles or empty accounts
            router.push("/");
          }
  
          // Update user and profile state
          useProfileStore.setState({
            user: data,
            profile: profileData,
            isLoggedIn: true,
            loading: false,
          });
  
          
          // Set loading to false after 5 seconds
          setTimeout(() => {
            setEmail("");
            setPassword("");
            setLoading(false);
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          setLoginError(profileResponse.data.message); // Set specific error message
        }
      } else {
        setLoginError(response.data.message); // Set specific error message
      }
    } catch (error) {
      setLoginError(error.response?.data?.message); // Set specific error message (if available)
      setLoading(false);
    } 
  };
  

  const Visible = () => {
    setVisible(!visible);
  };


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
          <SliderAuth />
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
                <div className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}>
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email <span className="text-error">*</span>
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
                      Password <span className="text-error">*</span>
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
                  <Link
                    href={"/forgetpassword"}
                    className="font-[700] text-BlueHomz text-[13px]"
                  >
                    Forgot Password
                  </Link>
                </div>
                <button
                  className={`bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}
                  type="Submit"
                >
                  {loading ? <LoadingFormII /> : "Log In"}
                </button>
                {/* <div className="">
                  <button   className="border flex justify-center items-center gap-3 font-[700] text-[16px] text-BlueHomz w-full sm:w-[360px] border-BlueHomz hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
                    <Image
                      className=""
                      src={"/Social icon.png"}
                      alt="google"
                      height={"20"}
                      width={"20"}
                    />
                    Login In with google
                  </button>
                </div> */}
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
