"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import { toast } from "react-toastify";
import { updatePassword } from "@/api/enterpriseManagerService";
import LoadingFormII from "@/components/mainmenu/loadingFormII";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleReEnterPasswordVisibility = () => {
    setShowRePassword(!showRePassword)
  }
  const toggleNewPasswordVisibility = () => {
    setshowNewPassword(!showNewPassword);
  };

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
      setSaveModalIsOpen(false);
      return;
    }

    if (newPassword === password) {
      setPasswordError(
        "New password must be different from the current password"
      );
      setLoading(false);
      setSaveModalIsOpen(false);
      return;
    }

    if (newPassword !== reEnterPassword) {
      setPasswordError("The entered passwords do not match. Please make sure your passwords match.");
      setLoading(false);
      setSaveModalIsOpen(false);
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
        setPasswordError("");
        setSuccessModalIsOpen(true);
        setSaveModalIsOpen(false);
      } else {
        console.error("Update failed", error);
        setPasswordError(error);
        toast.error(error);
        setLoading(false);
        setSaveModalIsOpen(false);
      }
    } catch (error) {
      // console.error("Update error", error);
      //
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        setPasswordError("Error message:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setPasswordError("Unexpected status code:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
        setPasswordError(
          "Error changing password",
          error.response?.data?.message
        );
      }
      setSaveModalIsOpen(false);
    }
  };

  const handleUpdate = () => {
    setSaveModalIsOpen(true);
  };

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  return (
    <div>
      <div className=" flex flex-wrap gap-7 pt-8 md:pt-0 md:px-4">
        <div
          className=" flex flex-col md:w-full md:gap-[28px] gap-[24px]"
        >
          <div className=" space-y-1">
            <label for="currentPwd" className="">
              Current Password
            </label>
            <br />
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  border w-[335px]">
              <input
                disabled={!update || loading}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null);
                }}
                value={password}
                className="w-[100%] h-[100%] rounded-[4px]  px-2"
                placeholder="********"
              />
              <p
                id="togglePassword"
                onClick={togglePasswordVisibility}
                className="absolute right-[10px]"
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
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  border w-[335px]">
              <input
                disabled={!update || loading}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(null);
                }}
                value={newPassword}
                type={showNewPassword ? "text" : "password"}
                className="w-[100%] h-[100%] rounded-[4px] px-2"
                placeholder="********"
              />
              <p
                onClick={toggleNewPasswordVisibility}
                className="absolute right-[10px]"
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
          </div>
          <div className=" space-y-1">
            <label for="confirmNewPwd">Re-enter Password</label>
            <br />
            <div className=" relative flex items-center h-[43px] md:h-[45px] md:w-[473px]  rounded-[4px]  border w-[335px]">
              <input
                disabled={!update || loading}
                type={showRePassword ? "text" : "password"}
                onChange={(e) => {
                  setReEnterPassword(e.target.value);
                  setPasswordError(null);
                }}
                value={reEnterPassword}
                className="w-[100%] h-[100%] rounded-[4px] px-2"
                placeholder="********"
              />
              <p
                onClick={toggleReEnterPasswordVisibility}
                className="absolute right-[10px]"
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
            {passwordError && (
              <div className="text-error italic text-[11px]">{passwordError}</div>
            )}
          </div>
          <div className="flex  md:justify-end justify-center mt-16 md:mt-12 ">
            <div className="flex flex-col ">
              {update ? (
                <button
                  className="flex  border justify-center  md:w-[120px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  onClick={() => setSaveModalIsOpen(true)}
                >
                  Save Update
                </button>
              ) : (
                <p
                  className="flex  border justify-center  md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz
                 rounded-[4px]"
                  onClick={() => setUpdate(true)}
                >
                  Update
                </p>
              )}
            </div>
          </div>
        </div>
        <CustomizedModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
          <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
            <p className=" text-[16px] leading-[19.5px] md:text-[20px] font-[700] md:leading-[24px] text-center">
              Save Updates?
            </p>
            <p className=" hidden md:block leading-[19.5px] text-[16px] font-[400] md:leading-[24px] text-center">
              Proceed with saving changes?
            </p>
            <div className={`flex flex-wrap md:flex-col gap-[16px] ${loading ? "pointer-events-none" : ""}`}>
              <button
                className={`bg-BlueHomz2 w-[137.5px] text-white rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center
                  ${loading ? "pointer-events-none w-full flex justify-center" : ""} 
                  `}
                onClick={updateDone}
              >
                {loading ? <LoadingFormII /> : "Yes"}
              </button>
              <button
                className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[42px] md:h-[48px] text-center"
                onClick={() => {
                  setSaveModalIsOpen(false);
                }}
              >
                No, go back
              </button>
            </div>
          </div>
        </CustomizedModal>
        <CustomizedModal
          isOpen={successModalIsOpen}
          onRequestClose={closeSuccessModal}
        >
          <div className="bg-white border flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
            <div className="flex flex-col gap-6 items-center justify-center">
              <Image
                src="/static/images/success_icon.svg"
                height={48}
                width={46}
                alt=""
              />
              <div className="flex  flex-col">
                <p className="text-[14px] md:text-[20px] cursor-pointer font-[700] leading-[17.64px] md:leading-[25.2px] text-center mb-1">
                  Update Saved
                </p>
              </div>
            </div>

            <button
              className="bg-BlueHomz2 text-white rounded-[4px] border h-[48px] p-[12px]"
              onClick={() => {
                closeSuccessModal();
                setUpdate(false);
              }}
            >
              Close
            </button>
          </div>
        </CustomizedModal>
      </div>
    </div>
  );
};

export default ChangePassword;
