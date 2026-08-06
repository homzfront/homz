"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/utils/api";
import SliderAuth from "@/components/auth/slider";
import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import Loading from "@/components/mainmenu/loading";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ password: "", repassword: "" });
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [succPass, setSuccPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const queryToken = searchParams.get("token");
    setToken(queryToken);
  }, [searchParams]);

  useEffect(() => {
    if (token === null) {
      return;
    }
    if (!token) {
      setPasswordError("Invalid or missing reset token.");
    }
  }, [token]);

  const isValidPassword = (password) => password.length >= 8;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setPasswordError("Invalid or missing reset token.");
      return;
    }
    if (!isValidPassword(formData.password)) {
      setPasswordError("Password should be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.repassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.patch(`/auth/resetPassword/${token}`, {
        newPassword: formData.password,
      });

      if (response?.data?.statuscode === 200 || response?.data?.statuscode === 201 || response?.data?.message) {
        toast.success("Password reset successful. Redirecting to login.");
        router.push("/login");
        return;
      } else {
        setPasswordError("Unable to reset password. Please try again.");
      }
    } catch (error) {
      setPasswordError(error?.response?.data?.message || "Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
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
      {loading && <Loading />}
      <div className="flex m-auto max-w-[1440px] h-[1024px]">
        <div className="w-[644px] hidden lg:flex flex-col py-8 justify-around bg-[url('/Background_image2.png')] bg-BlueHomz">
          <SliderAuth />
        </div>
        <div className="sm:w-[794px] w-full px-3 flex flex-col justify-around items-center">
          <div className="m-auto mt-16 sm:mt-32">
            <div className="h-[85%] px-6 w-[320px] sm:w-full py-4">
              <div className="flex flex-col max-w-[360px] mt-1">
                <h1 className="text-[30px] sm:text-[36px] text-start font-[700] text-BlackHomz">
                  Reset Password
                </h1>
                <p className="mt-1 text-[16px] text-start font-[400] text-GrayHomz">
                  Enter a new password using the reset link from your email.
                </p>
                {token ? (
                  !succPass ? (
                    <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
                      <div className="relative flex flex-col gap-2 items-start">
                        <label className="text-center text-[14px] font-[500] text-BlackHomz">
                          Password
                        </label>
                        <input
                          className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${passwordError ? "border-red-500" : ""}`}
                          type={visible ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          placeholder="Enter a new password"
                        />
                        <div className="absolute top-11 right-4 cursor-pointer" onClick={() => setVisible(!visible)}>
                          {visible ? <Eye className="w-4 h-4" /> : <BashedEye className="w-4 h-4" />}
                        </div>
                      </div>
                      <div className="relative flex flex-col gap-2 items-start">
                        <label className="text-center text-[14px] font-[500] text-BlackHomz">
                          Confirm Password
                        </label>
                        <input
                          className={`border w-full sm:w-[360px] rounded-[4px] h-[47px] px-2 placeholder:text-[14px] ${passwordError ? "border-red-500" : ""}`}
                          type={visibleTwo ? "text" : "password"}
                          value={formData.repassword}
                          onChange={(e) => handleInputChange("repassword", e.target.value)}
                          placeholder="Re-enter password"
                        />
                        <div className="absolute top-11 right-4 cursor-pointer" onClick={() => setVisibleTwo(!visibleTwo)}>
                          {visibleTwo ? <Eye className="w-4 h-4" /> : <BashedEye className="w-4 h-4" />}
                        </div>
                      </div>
                      {passwordError && (
                        <p className="mt-1 text-[14px] font-[400] text-red-500">
                          {passwordError}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="mt-7 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[47px] hover:bg-blue-700"
                      >
                        Reset Password
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center mt-6">
                      <h2 className="text-[24px] font-[700] text-BlackHomz">Password Reset</h2>
                      <p className="mt-2 text-[16px] text-center text-GrayHomz">
                        Your password has successfully been reset. You can now log in with the new password.
                      </p>
                      <Link
                        href="/login"
                        className="mt-5 bg-BlueHomz text-white font-[700] text-[16px] w-full rounded-[4px] h-[48px] text-center py-[10px] hover:bg-blue-700"
                      >
                        Log In
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="mt-6">
                    <p className="text-[14px] font-[400] text-red-500">Invalid or missing reset token.</p>
                    <Link
                      href="/forgetpassword"
                      className="mt-4 inline-block bg-BlueHomz text-white font-[700] text-[14px] px-4 py-3 rounded-[4px] hover:bg-blue-700"
                    >
                      Request a new reset link
                    </Link>
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-1">
                  <Image src="/arrow-left.png" className="" height={17} width={16} alt="img" />
                  <Link href="/login" className="text-center text-[14px] font-[700]">
                    Go back to Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
