import BashedEye from "@/components/icons/BashedEye";
import Eye from "@/components/icons/Eye";
import React, { useState } from "react";

const InputVisible = ({
  password,
  setPassword,
  label,
  placeholder,
  setError,
  autoComplete,
  username = "", // Optional prop for username
}) => {
  const [visible, setVisible] = useState(false);

  const Visible = () => {
    setVisible(!visible);
  };

  return (
    <form> {/* Enclose the input fields in a form for accessibility */}
      <div className="relative flex flex-col gap-2 items-start">
        {/* Username field (optionally hidden) */}
        <input
          type="text"
          name="username" // Ensure a name attribute for password managers
          autoComplete="username"
          value={username}
          hidden // Hide visually but still accessible to screen readers
        />

        <label className="text-center text-[14px] font-[500] text-BlackHomz">
          {label}
        </label>
        <input
          className="border w-full rounded-[4px] h-[47px] px-2 placeholder:text-[14px]"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <div className="absolute top-11 left-[90%] md:left-[465px]" onClick={Visible}>
          {visible ? (
            <Eye className="w-4 h-4" />
          ) : (
            <BashedEye className="w-4 h-4" />
          )}
        </div>
      </div>
    </form>
  );
};

export default InputVisible;
