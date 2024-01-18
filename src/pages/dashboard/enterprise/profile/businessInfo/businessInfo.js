"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";

const BusinessInfo = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhoneNo, setBusinessPhoneNo] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false); 

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const response = await api.patch("/enterprisePlan/bussinessInformation", {
        businessName,
        businessAddress,
        businessPhoneNumber: parseInt(businessPhoneNo),
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setDoneUpdate(!doneUpdate);
        setLoading(false);
        setBusinessName('')
        setBusinessAddress('')
        setBusinessPhoneNo('')
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
      <div className="w-[498px] flex gap-4 flex-col">
        <Input
          label={"Business Name"}
          placeholder={"Victostates"}
          type={"text"}
          value={businessName}
          onChange={(e)=>setBusinessName(e.target.value)}
        />
        <Input
          label={"Business Address"}
          placeholder={"Business Address"}
          type={"text"}
          value={businessAddress}
          onChange={(e)=>setBusinessAddress(e.target.value)}
        />
        <Input label={"Email"} placeholder={"Victor@gmail.com"} type={"text"} />
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
          value={businessPhoneNo}
          onChange={(e)=>setBusinessPhoneNo(e.target.value)}
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

export default BusinessInfo;
