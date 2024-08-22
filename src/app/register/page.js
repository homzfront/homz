"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import "dotenv/config";
import SliderAuth from "@/components/auth/slider";
import useBodyScroll from "@/utils/useBodyScroll";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import ReCaptcha from "@/components/auth/reCaptcha";
import axios from "axios";
import { useFormFields, useMailChimpForm } from 'use-mailchimp-form';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreedToTerms: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const url = "https://us22.api.mailchimp.com/3.0/lists/ae061dd532/members/";  // Replace with your actual Mailchimp subscribe URL
  const {
    loading: mailchimpLoading,
    error: mailchimpError,
    success: mailchimpSuccess,
    message: mailchimpMessage,
    handleSubmit: handleMailchimpSubmit
  } = useMailChimpForm(url);

  const { fields, handleFieldChange } = useFormFields({
    EMAIL: "",
  });

  const showCapta = () => {
    setShowCaptcha(true)
  }

  const handleCaptchaChange = () => {
    setVerified(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      setPasswordError("Please complete the CAPTCHA");
      setLoading(false);
      return;
    }

    if (!formData.password || !formData.email) {
      setPasswordError("Please fill in all fields and agree to terms.");
      return;
    }
    if (!formData.agreedToTerms) {
      setPasswordError("Agree to terms.")
      return;
    }
    // Check if the password meets the length requirement
    if (formData.password.length < 8) {
      // Handle password error
      setPasswordError("Passowrd must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      // Make a POST request to the registration endpoint
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.statuscode === 201) {
        // const mailchimpData = {
        //   'email_address': formData.email,
        //   'status': 'subscribed'
        // };

        // // Use axios instead of fetch
        // const mailchimpResponse = await axios.post(`https://us22.api.mailchimp.com/3.0/lists/ae061dd532/members/`,
        //   mailchimpData,
        //   {
        //     headers: {
        //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MAILCHIMP}`,
        //       'Content-Type': 'application/json'
        //     }
        //   }
        // );

        // If the form is valid, submit the email to Mailchimp
        handleMailchimpSubmit(fields);

        // Handle Mailchimp response
        if (mailchimpError) {
          alert(mailchimpMessage);
        } else if (mailchimpSuccess) {
          alert('You have successfully subscribed!');
        }

        const data = response?.data?.data?.token
        localStorage.setItem('jwt', data)
        router.push(`/verify-email`);
        if (typeof window !== 'undefined') {
          localStorage.setItem("email", formData.email);
        }
        setTimeout(() => {
          // Reset the form data after submitting
          setFormData({ email: "", password: "", agreedToTerms: false });
          // Set loading to false after 5 seconds
          setLoading(false);
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        // Handle unexpected status codes
        const errorw = response.data.message;
        setPasswordError(errorw);
        setLoading(false);
      }
    } catch (error) {
      setPasswordError(error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Reset password error when the user types
  };


  const Visible = () => {
    setVisible(!visible);
  };

  useBodyScroll([loading])


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

      <div className="flex m-auto max-w-[100%] sm:max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <SliderAuth />
        </div>
        <div className="sm:w-[794px] w-full flex flex-col justify-around items-center">
          <div className="h-[85%] px-6 w-[320px] sm:w-full py-4">
            <div className="flex flex-col gap-6 m-auto  max-w-[380px]">
              <h1 className="text-start  text-[36px] font-[700] text-BlackHomz">
                Create Account
              </h1>
              <p className="mt-[-10px] text-[16px] font-[400] text-GrayHomz">
                Your All-In-One property portal in just one click!
              </p>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className={`flex flex-col gap-4 ${loading ? "pointer-events-none" : ""}`}>
                  <div className="flex flex-col gap-2 items-start">
                    <label className="text-center text-[14px] font-[500] text-BlackHomz">
                      Email <span className="text-error">*</span>
                    </label>
                    <input
                      className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${passwordError && passwordError !== "Agree to terms." && passwordError !== "Please complete the CAPTCHA" ? "border-red-500" : ""
                        }`}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        setPasswordError("");
                        handleInputChange("email", e.target.value);
                        handleFieldChange(e);
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
                      className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${passwordError && passwordError !== "Agree to terms." && passwordError !== "Please complete the CAPTCHA" ? "border-red-500" : ""
                        }`}
                      type={visible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) => {
                        setPasswordError("");
                        handleInputChange("password", e.target.value);
                      }}
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    <div className="absolute top-11 right-8" onClick={Visible}>
                      {visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <BashedEye className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className={`mr-2 cursor-pointer ${passwordError == "Agree to terms." ? "border-red-500" : ""
                        }`}
                      checked={formData.agreedToTerms}
                      onChange={() => {
                        setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms });
                        setPasswordError("");
                      }}
                    />
                    <p
                      className="cursor-pointer text-center text-GrayHomz font-[400] text-[11px]">
                      <span onClick={() => {
                        setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms });
                        setPasswordError("");
                      }}>
                        I agree to the
                      </span>
                      <Link href={"/terms-and-conditions"} className={` text-BlackHomz font-[700]`}>Terms and Conditions</Link> <span onClick={() => {
                        setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms });
                        setPasswordError("");
                      }}>and</span> <Link href={"/privacy-policy"} className={` text-BlackHomz font-[700]`}>Privacy Policy</Link> <span onClick={() => {
                        setFormData({ ...formData, agreedToTerms: !formData.agreedToTerms });
                        setPasswordError("");
                      }}>of HOMZ.</span>
                    </p>
                  </div>
                  {passwordError && (
                    <span className="mt-[-10px] font[400] text-[13px] text-red-500">
                      {passwordError}
                    </span>
                  )}
                </div>
                <ReCaptcha onChange={handleCaptchaChange} />
                {
                  !verified ?
                    <div className="relative inline-block">
                      <button
                        type="Submit"
                        onMouseEnter={() => setShowCaptcha(true)}
                        onMouseLeave={() => setShowCaptcha(false)}
                        className={`bg-BlueHomz mt-3 text-white font-[700] items-center flex justify-center text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px]`}
                      >
                        Get Started
                      </button>
                      {showCaptcha && (
                        <span className="absolute bg-GrayHomz2 bg-transparent text-[12px] text-white text-center rounded w-[140px]  py-2 top-[-25px]">
                          Complete Captcha
                        </span>
                      )}
                    </div>
                    :
                    <button
                      className={`bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz ${loading || mailchimpLoading ? "pointer-events-none w-full flex justify-center" : ""}`}
                      type="Submit"
                    >
                      {loading || mailchimpLoading ? <LoadingFormII /> : "Get Started"}
                    </button>
                }
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
