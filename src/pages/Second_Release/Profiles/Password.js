"use client";
import Image from "next/image";
import React, { useState } from "react";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
      <div className="profiles flex flex-wrap gap-7 ">
        <div className=" space-y-1">
          <label for="currentPwd" className="">
            Current Password
          </label>
          <br />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} 
              id="currentPwd"
              className={`businessField`}
              name="currentPwd"
              placeholder="********"
            />
            <button
              id="togglePassword"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
            {showPassword
            ?
              <Image
                src="/static/images/eye.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
              :
              <Image
                src="/static/images/eye-slash.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
            }
            </button>
          </div>
        </div>

        <div className=" space-y-1">
          <label for="newPwd">Enter New Password</label>
          <br />
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'} 
              id="newPwd"
              className={`businessField`}
              name="newPwd"
              placeholder="********"
            />
            <button
              id="togglePassword"
              onClick={toggleNewPasswordVisibility}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
            {showNewPassword
            ?
              <Image
                src="/static/images/eye.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
              :
              <Image
                src="/static/images/eye-slash.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
            }
            </button>
          </div>
        </div>
        <div className=" space-y-1">
          <label for="re-enterPwd">Re-enter Password</label>
          <br />
          <div className="relative">
            <input
              type={showRePassword ? 'text' : 'password'} 
              id="re-EnterPwd"
              className={`businessField`}
              name="re-EnterPwd"
              placeholder="********"
            />
            <button
              id="togglePassword"
              onClick={toggleReEnterPasswordVisibility}
              aria-label={showRePassword ? "Hide password" : "Show password"}
            >
            {showRePassword
            ?
              <Image
                src="/static/images/eye.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
              :
              <Image
                src="/static/images/eye-slash.svg"
                width={16}
                height={16}
                alt="Eye icon"
              />
            }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
