"use client";
import React, { useState } from "react";
import InputVisible from "./components/inputVisible";
import UpdateButton from "../components/updateButton";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const updateDone = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!isValidPassword(newPassword)) {
      setPasswordError("New password should be at least 8 characters");
      return;
    }

    if (newPassword === password) {
      setPasswordError(
        "New password must be different from the current password"
      );
      return;
    }

    if (newPassword !== reEnterPassword) {
      setPasswordError("Passwords don't match");
      return;
    }

    try {
      // Make a PATCH request to change the password
      const response = await api.patch("/auth/change/password", {
        currentPassword: password,
        confirmPassword: newPassword,
        newPassword: reEnterPassword,
      });

      if (response.data.statuscode === 200 || 201) {
        console.log(response.data.data);
        console.log("password successfully updated", response.data);
        setDoneUpdate(!doneUpdate);
        setPassword('')
        setNewPassword('')
        setReEnterPassword('')
        setLoading(false);
      } else {
        setPasswordError(response.data.message);
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      setPasswordError(
        "Error changing password",
        error.response?.data?.message
      );
      setLoading(false);
      console.error("Error changing password:", error);
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
      <UpdateButton
        updateDone={updateDone}
        doneUpdate={doneUpdate}
        setDoneUpdate={setDoneUpdate}
        loading={loading}
      />
    </div>
  );
};

export default ChangePassword;
