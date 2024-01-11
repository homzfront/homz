"use client";
import React, { useState } from "react";
import InputVisible from "./components/inputVisible";
import UpdateButton from "../components/updateButton";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  return (
    <div>

    <div className="w-[498px] flex flex-col gap-4">
      <InputVisible
        password={password}
        setPassword={setPassword}
        label={"Current Password"}
        placeholder={"Enter your current password"}
      />
      <InputVisible
        password={newPassword}
        setPassword={setNewPassword}
        label={"New Password"}
        placeholder={"Enter New password"}
      />
      <div>
        <p className="mt-[-5px] text-GrayHomz2 text-[13px] font-[400]">
          Must be at least 8 characters <br />
          New password must be different from the previous password
        </p>
      </div>
      <InputVisible
        password={reEnterPassword}
        setPassword={setReEnterPassword}
        label={"Re-enter Password"}
        placeholder={"Re-enter  password"}
      />
    </div>
       <UpdateButton />
    </div>
  );
};

export default ChangePassword;
