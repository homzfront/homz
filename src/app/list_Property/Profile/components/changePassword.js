"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  currentPwd: yup.string(),
  newPwd: yup
    .string()
    //   .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    .notOneOf(
      [yup.ref("currentPwd"), null],
      "New password must be different from the previous password"
    ),
  confirmNewPwd: yup
    .string()
    .oneOf([yup.ref("newPwd"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ChangePassword = ({PasswordInfo, handleUpdate}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [update, setUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(validationSchema),
  });
  const Submit = (data) => {
    // console.log("Data : ", data);
    handleUpdate(data)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleReEnterPasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };
  return (
    <div>
      <div className=" flex flex-wrap gap-7 pt-8 md:pt-0 md:px-4">
        <form
          className=" flex flex-col md:w-full md:gap-[28px] gap-[24px]"
          onSubmit={handleSubmit(Submit)}
        >
          <div className=" space-y-1">
            <label for="currentPwd" className="">
              Current ChangePassword
            </label>
            <br />
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  adminCellBorders w-[335px]">
              <input
                type={showPassword ? "text" : "password"}
                id="currentPwd"
                {...register("currentPwd")}
                className="w-[100%] h-[100%] rounded-[4px]  px-2"
                name="currentPwd"
                placeholder="********"
              />
              <p
                id="togglePassword"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Image
                    src="/static/images/eye.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                ) : (
                  <Image
                    src="/static/images/eye-slash.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                )}
              </p>
            </div>
          </div>

          <div className=" space-y-1">
            <label for="newPwd">Enter New Password</label>
            <br />
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  adminCellBorders w-[335px]">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPwd"
                {...register("newPwd", {
                  minLength: {
                    value: 8,
                    message: "Minimum length should be 8.",
                  },
                })}
                className="w-[100%] h-[100%] rounded-[4px] px-2"
                name="newPwd"
                placeholder="********"
              />
              <p
                id="togglePassword"
                onClick={toggleNewPasswordVisibility}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <Image
                    src="/static/images/eye.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                ) : (
                  <Image
                    src="/static/images/eye-slash.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                )}
              </p>
            </div>
            {errors.newPwd && (
              <p className="errorMsg md:w-[473px] w-[335px]">
                {errors.newPwd?.message}
              </p>
            )}
          </div>
          <div className=" space-y-1">
            <label for="confirmNewPwd">Re-enter Password</label>
            <br />
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  adminCellBorders w-[335px]">
              <input
                type={showRePassword ? "text" : "password"}
                id="confirmNewPwd"
                {...register("confirmNewPwd")}
                className="w-[100%] h-[100%] rounded-[4px] px-2"
                name="confirmNewPwd"
                placeholder="********"
              />
              <p
                id="togglePassword"
                onClick={toggleReEnterPasswordVisibility}
                aria-label={showRePassword ? "Hide password" : "Show password"}
              >
                {showRePassword ? (
                  <Image
                    src="/static/images/eye.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                ) : (
                  <Image
                    src="/static/images/eye-slash.svg"
                    width={16}
                    height={16}
                    alt="Eye icon"
                  />
                )}
              </p>
            </div>
            {errors.confirmNewPwd && (
              <p className="errorMsg md:w-[473px] w-[335px]">
                {errors.confirmNewPwd?.message}
              </p>
            )}
          </div>
          <div className="flex  md:justify-end justify-center mt-16 md:mt-12 ">
            <button
              className="hidden md:flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
              type="submit"
            >
              Update
            </button>
            <div className="md:hidden flex flex-col ">
              {update ? (
                <button
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  type="submit"
                >
                  Save Update
                </button>
              ) : (
                <p
                  className="flex  adminBorders justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  onClick={() => setUpdate(true)}
                >
                  Update
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
