"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import { toast } from "react-toastify";
import { updateBussinessInformation } from "@/api/enterpriseManagerService";

const BusinessInfo = ({ data }) => {
  console.log(data);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhoneNo, setBusinessPhoneNo] = useState("");
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      setBusinessName(data?.businessName || "");
      setBusinessAddress(data?.businessAddress || "");
      setBusinessPhoneNo(parseInt(data?.phoneNumber) || 0);
      setLoading(false);
    }
  }, [data]);

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    try {
      const updatedData = {
        businessName,
        businessAddress,
        businessPhoneNumber: parseInt(businessPhoneNo),
      };
      const { success, upDateddata, error } = await updateBussinessInformation(
        updatedData
      );

      if (success) {
        console.log("Form successfully updated", upDateddata);
        setLoading(false);
        setShowDialogue(false);
        setDoneUpdate(true);
        // toast.success("Update successful");
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
      <div className="w-[498px] flex gap-4 flex-col">
        <Input
          label={"Business Name"}
          placeholder={"Victostates"}
          type={"text"}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <Input
          label={"Business Address"}
          placeholder={"Business Address"}
          type={"text"}
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
        />
        <Input
          label={"Email"}
          value={data?.user?.email}
          readOnly
          placeholder={"Victor@gmail.com"}
          type={"text"}
        />
        <Input
          label={"Phone Number"}
          placeholder={"0000 - 000 - 0000"}
          type={"text"}
          value={businessPhoneNo}
          onChange={(e) => setBusinessPhoneNo(e.target.value)}
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

export default BusinessInfo;
