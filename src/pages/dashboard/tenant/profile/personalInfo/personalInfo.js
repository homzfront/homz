"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import { toast } from "react-toastify";
import { updatePersonalInformation } from "@/api/tenantSevice";
import { useForm } from "react-hook-form";
import PersonalInfoma from "./components/personalInfoma";
import SpouseNextKin from "./components/spouseNextKin";
import OccupantDetails from "./components/occupantDetails";
import Guarantors from "./components/guarantors";
import TenantVerification from "./components/tenantVerification";

const PersonalInfo = ({ data }) => {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState(null);
  const { register, handleSubmit } = useForm();
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
        setLoading(false);
        setDoneUpdate(true);
        setShowDialogue(false);
        // toast.success("Update successful");
      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Update failed");
    }
  };
  const steps = [
    "Personal Information",
    "Spouse/Kin Information",
    "Occupant Details",
    "Guarantors",
    "Tenant Verification (KYC)",
  ];
  const onSubmit = (data) => console.log(data);

  return (
    <div className="">
      <div className="px-4">
        <div className="h-auto flex justify-center">
          <div className="z-1 flex flex-wrap my-4 gap-4 md:gap-0 md:justify-between items-start w-full">
            {steps.map((stepTitle, index) => (
              <div
                onClick={() => {
                  setStep(index)
                }}
                key={index} className={`cursor-pointer`}>
                <p className={`${step === index ? "text-BlueHomz" :  "text-GrayHomz"} text-[12px] lg:text-[14px] font-normal flex flex-col gap-2`}>{stepTitle} <span>{step === index && <div className="p-0.5 bg-BlueHomz"></div>}</span></p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          {step === 0 && (
            <PersonalInfoma register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
          {step === 1 && (
            <SpouseNextKin register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
          {step === 2 && (
            <OccupantDetails register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
          {step === 3 && (
            <Guarantors register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
          {step === 4 && (
            <TenantVerification register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
          <div className="flex justify-end mt-4">
            {/* {step === steps.length - 1 ? (
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Submit
          </button>
        ) : null} */}
          </div>
        </form>
      </div>

    </div>
  );
};

export default PersonalInfo;
