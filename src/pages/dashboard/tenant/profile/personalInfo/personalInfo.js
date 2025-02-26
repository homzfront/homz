"use client";
import React, { useEffect, useState } from "react";
import Input from "../../components/input";
import UpdateButton from "../components/updateButton";
import { toast } from "react-toastify";
import { tenantInformationKYC, updatePersonalInformation } from "@/api/tenantSevice";
import { useForm } from "react-hook-form";
import PersonalInfoma from "./components/personalInfoma";
import SpouseNextKin from "./components/spouseNextKin";
import OccupantDetails from "./components/occupantDetails";
import Guarantors from "./components/guarantors";
import TenantVerification from "./components/tenantVerification";
import { formatDateIII } from "@/utils/formatDateIII";
import formatDateII from "@/utils/formatDateII";
import useTenantActiveKYC from "@/store/tenantKYC/useTenantActiveKYC";

const PersonalInfo = ({ data }) => {
  const { step, setStep } = useTenantActiveKYC()
  const [formData, setFormData] = React.useState(null);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    if (data) {
      const cleanedFormData = Object.fromEntries(
        Object.entries({
          fullName: data?.fullName,
          apartmentAddress: data?.houseAddress,
          phoneNumber: data?.phoneNumber,
          gender: data?.personalDetails?.gender,
          maritalStatus: data?.personalDetails?.maritalStatus,
          officeAddress: data?.addressDetails?.officeAddress,
          permanentContactAddress: data?.addressDetails?.permanentContactAddress,
          nationality: data?.personalDetails?.nationality,
          stateOfOrigin: data?.personalDetails?.stateOfOrigin,
          rentPurpose: data?.accommodation?.rentPurpose,
          religion: data?.personalDetails?.religion,
          accommodationType: data?.accommodation?.accommodationType,
          moveInDate: data?.moveInDetails?.moveInDate ? formatDateII(data?.moveInDetails?.moveInDate) : null,
          email: data?.user?.email,
          spouseOccupation: data?.spouseDetails?.spouseOccupation,
          spouseOfficeAddress: data?.spouseDetails?.spouseOfficeAddress,
          numberOfCars: data?.occupantDetails?.numberOfCars,
        }).filter(([_, value]) => value != null && value !== "")
      );

      // Map occupantDetails properly
      const occupants = data?.occupantDetails?.map((occupant, index) => ({
        [`occupantName${index}`]: occupant.occupantName,
        [`occupantAge${index}`]: occupant.occupantAge,
        [`occupantOccupation${index}`]: occupant.occupantOccupation,
        is_deleted: occupant.is_deleted,
        _id: occupant._id,
        index: index, // Include the index
      })) || [];

      cleanedFormData.occupantDetails = occupants; // Add occupants array to formData

      setFormData(cleanedFormData);
      setLoading(false);
    }
  }, [data]);

  const updateDone = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
  
    try {
      const formDataToSubmit = new FormData();
  
      // Extract and clean occupant details
      const occupantDetails = formData.occupantDetails.map((occupant) => {
        const cleaned = {};
  
        Object.entries(occupant).forEach(([key, value]) => {
          // Remove "index", "_id", and "is_deleted"
          if (key === "index" || key === "_id" || key === "is_deleted") return;
  
          // Remove trailing digits from keys like "occupantName0" → "occupantName"
          const newKey = key.replace(/\d+$/, "");
          cleaned[newKey] = value;
        });
  
        return cleaned;
      });
  
      // console.log("Cleaned Occupant Details:", occupantDetails);
  
      // Append occupantDetails separately to avoid duplication
      if (occupantDetails.length > 0) {
        formDataToSubmit.append("occupantDetails", JSON.stringify(occupantDetails));
      }
  
      // Append other form fields, but **skip** occupantDetails to avoid duplication
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "occupantDetails" && value !== undefined && value !== null && value !== "") {
          formDataToSubmit.append(key, value);
        }
      });
  
      // console.log("Final Form Data:", Object.fromEntries(formDataToSubmit.entries()));
  
      const { success, error } = await tenantInformationKYC(formDataToSubmit);
  
      if (success) {
        setLoading(false);
        setShowDialogue(false);
        toast.success("Personal information updated");
        if (step < 4) setStep(step + 1);
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
                <p className={`${step === index ? "text-BlueHomz" : "text-GrayHomz"} text-[12px] lg:text-[14px] font-normal flex flex-col gap-2`}>{stepTitle} <span>{step === index && <div className="p-0.5 bg-BlueHomz"></div>}</span></p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {step === 0 && (
            <PersonalInfoma loading={loading} setStep={setStep} handleUpdate={updateDone} setShowDialogue={setShowDialogue} showDialogue={showDialogue} setSuccess={setSuccess} success={success} updateDone={updateDone} data={data} register={register} setFormData={setFormData} formData={formData} />
          )}
          {step === 1 && (
            <SpouseNextKin loading={loading} setStep={setStep} handleUpdate={updateDone} setShowDialogue={setShowDialogue} showDialogue={showDialogue} setSuccess={setSuccess} success={success} updateDone={updateDone} register={register} setFormData={setFormData} formData={formData} />
          )}
          {step === 2 && (
            <OccupantDetails loading={loading} setStep={setStep} handleUpdate={updateDone} setShowDialogue={setShowDialogue} showDialogue={showDialogue} setSuccess={setSuccess} success={success} updateDone={updateDone} register={register} setFormData={setFormData} formData={formData} />
          )}
          {step === 3 && (
            <Guarantors loading={loading} setStep={setStep} handleUpdate={updateDone} data={data} setShowDialogue={setShowDialogue} showDialogue={showDialogue} setSuccess={setSuccess} success={success} updateDone={updateDone} register={register} setFormData={setFormData} formData={formData} />
          )}
          {step === 4 && (
            <TenantVerification setShowDialogue={setShowDialogue} showDialogue={showDialogue} register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
