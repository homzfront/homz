"use client";
import React, { useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";

const PersonalInfo = () => {
  const [fullName, setFullName] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(fullName);
  console.log(houseAddress);
  console.log(phoneNo);

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.patch("/tenants/personalInformation", {
        fullName,
        houseAddress,
        phoneNumber: parseInt(phoneNo),
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setDoneUpdate(!doneUpdate);
        setLoading(false);
        setPhoneNo('')
        setHouseAddress('')
        setFullName('')
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      // setLoginError(error.response?.data?.message);
    }
  };
  return (
    <div className="mt-8">
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
        <Input
          label={"Full Name"}
          placeholder={"Victor Simon"}
          type={"text"}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label={"House Address"}
          placeholder={"House Address"}
          type={"text"}
          value={houseAddress}
          onChange={(e) => setHouseAddress(e.target.value)}
        />
        <Input label={"Email"} placeholder={"Victor@gmail.com"} type={"text"} />
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
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

export default PersonalInfo;
