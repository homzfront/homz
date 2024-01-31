"use client";
import React, { useState } from "react";
import InputVisible from "./components/inputVisible";
import UpdateButton from "../components/updateButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword } from "@/api/tenantSevice";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const updateDone = async (e) => {
    e.preventDefault();

    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!isValidPassword(newPassword)) {
      setPasswordError("New password should be at least 8 characters");
      setLoading(false);
      setShowDialogue(false);
      return;
    }

    if (newPassword === password) {
      setPasswordError(
        "New password must be different from the current password"
      );
      setLoading(false);
      setShowDialogue(false);
      return;
    }

    if (newPassword !== reEnterPassword) {
      setPasswordError("Passwords don't match");
      setLoading(false);
      setShowDialogue(false);
      return;
    }

    try {
      const updatedData = {
        currentPassword: password,
        confirmPassword: newPassword,
        newPassword: reEnterPassword,
      };

      const { success, upDateddata, error } = await updatePassword(updatedData);

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setPassword("");
        setNewPassword("");
        setReEnterPassword("");
        setLoading(false);
        setDoneUpdate(true);
        setShowDialogue(false);
        setPasswordError("");
        toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        setPasswordError(response.data.message);
        toast.error(error);
        setLoading(false);
        setShowDialogue(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setPasswordError(
        "Error changing password",
        error.response?.data?.message
      );
      setLoading(false);
      toast.error("Update failed");
      setShowDialogue(false);
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
        {passwordError && (
          <div className="text-error italic text-[11px]">{passwordError}</div>
        )}
      </div>
      <UpdateButton
        updateDone={updateDone}
        doneUpdate={doneUpdate}
        setDoneUpdate={setDoneUpdate}
        loading={loading}
        showDialogue={showDialogue}
        setShowDialogue={setShowDialogue}
      />
    </div>
  );
};

export default ChangePassword;
