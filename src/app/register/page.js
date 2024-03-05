"use client";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import Loading from "@/components/mainmenu/loading";
import SliderAuth from "@/components/auth/slider";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      setPasswordError("Please fill in all fields.");
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
        toast.success("user created, verify your email.");
        // alert("Done!");
        // Handle the response as needed
        console.log("Registration successful", response.data);
        // setPasswordError('');
        // localStorage.setItem("email", formData.email);
        router.push(`/verify-email`);
        if (typeof window !== 'undefined') {
          localStorage.setItem("email", formData.email);
        }
        // Cookies.set("jwt", response.data)
        console.log(response.data);

        // Reset the form data after submitting
        setFormData({ email: "", password: "" });
        setLoading(false);
      } else {
        // Handle unexpected status codes
        const errorw = response.data.message;
        console.log("Unexpected status code:", errorw);
        setPasswordError(errorw);
        setLoading(false);
      }
    } catch (error) {
      // Handle errors
      console.error("Registration error", error.response.data);
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
        {loading && <Loading />}
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz"> 
        <SliderAuth/>
      </div>
        <div className="sm:w-[794px] w-full flex flex-col justify-around items-center">
          <div className="h-[85%] px-6 w-[320px] sm:w-full py-4">
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
                      className="border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
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
                      className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${
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
                      {passwordError}
                    </span>
                  )}
                </div>
                <button
                  className="bg-BlueHomz mt-3 text-white font-[700] text-[16px] w-full sm:w-[360px] rounded-[4px] h-[47px] hover:bg-white hover:text-BlueHomz hover:border hover:border-BlueHomz"
                  type="Submit"
                >
                  Get Started
                </button>
                <div className="">
                  <button className="border flex justify-center items-center gap-3 font-[700] text-[16px] text-BlueHomz w-full sm:w-[360px] border-BlueHomz hover:border-BlackHomz  rounded-[8px] h-[47px] hover:text-BlackHomz">
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
