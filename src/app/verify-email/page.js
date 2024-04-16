"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "/src/utils/api";
import SliderAuth from "/src/components/auth/slider";

const VerifyEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState("");
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
      const response = await api.post(
        "/auth/verification",
        {
          email: email, // Replace with the actual email
          pincode: otp.join(""),
        }
      );

      console.log("OTP verification successful", response.data);
      setVerificationSuccess(true);
      setError(false);
      setError2("");
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

  const ResendOtp = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to verify the OTP
      const response = await api.post(
        "/auth/requestnewopt",
        {
          email: email, // Replace with the actual email
          pincode: otp.join(""),
        }
      );
      toast.success('OTP SENT')
    } catch (error){
      toast.error(error.response?.data?.message)
    }
  };
  const handleEmailVerification = (e) => {
    e.preventDefault();
    router.push("/select-plan");
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
      <div className="flex m-auto  max-w-[1440px] h-[1024px]">
      <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz"> 
        <SliderAuth/>
      </div>
        <div className="w-[794px]  flex flex-col justify-around items-center">
          <div className="h-[85%] px-6 w-[320px] sm:w-full  py-4">
            {!verificationSuccess ? (
              <div className="flex flex-col gap-6 m-auto max-w-[320px]  sm:max-w-[360px]">
                <h1 className="text-start text-[30px]  sm:text-[36px] font-[700] text-BlackHomz">
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
                    <div className="flex w-[320px] sm:w-full gap-2 h-[72px]">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className={`border rounded-md text-[41px] font-[700] text-GrayHomz w-[60px] sm:w-[80px] p-2 text-center ${
                            error ? "border-red-500" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-[-10px] text-[14px] font-[400] text-GrayHomz2">
                      Enter OTP sent to <> </> {email}
                    </p>
                    {error2 && <span className="text-red-500">{error2}</span>}
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
                    <button onClick={ResendOtp}>
                      <Link
                        className="text-center font-[700] text-[14px] text-BlueHomz  ml-1"
                        href={""}
                      >
                        Click to resend
                      </Link>
                    </button>
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
              <div className="flex flex-col m-auto max-w-[360px] mt-2 items-center">
                <h1 className="text-[36px] font-[700] text-BlackHomz">
                  Email Verified
                </h1>
                <p className="mt-4 text-[16px] font-[400] text-GrayHomz">
                  Your email has successfully been verified. Click below to
                  continue with your account setup.
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
