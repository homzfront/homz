"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePersonalInformation } from "@/api/propertyService";

const PersonalInfo = ({ data }) => {
  console.log(data);
  const [fullName, setFullName] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setFullName(data?.fullName || "");
      setHouseAddress(data?.houseAddress || "");
      setPhoneNo(parseInt(data?.phoneNumber) || 0);
      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        fullName,
        houseAddress,
        phoneNumber: parseInt(phoneNo),
      };
      const { success, upDateddata, error } = await updatePersonalInformation(
        updatedData
      );

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        setDoneUpdate(true);
        setShowDialogue(false);
        toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      toast.error("Update failed");
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
        <Input
          label={"Email"}
          placeholder={"Victor@gmail.com"}
          readOnly
          value={data?.user?.email}
          type={"text"}
        />
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
        showDialogue={showDialogue}
        setShowDialogue={setShowDialogue}
      />
    </div>
  );
};

export default PersonalInfo;
