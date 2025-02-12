"use client"
import React from "react";
import { useForm } from "react-hook-form";
import PersonalInfo from "./personalInfo";
import SpouseNextKin from "./spouseNextKin";
import Dropdown from "./dropDown";
import OccupantDetails from "./occupantDetails";
import Guarantors from "./guarantors";
import TenantVerification from "./tenantVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  "Personal Information",
  "Spouse/Kin Information",
  "Occupant Details",
  "Guarantors",
  "Tenant Verification",
];

export default function MultiStepForm() {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="py-4">
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
      <div className="px-8 border-b border-[#E6E6E6] w-full">
        <h2 className="font-bold text-[20px] text-BlackHomz my-1">
          KYC
        </h2>
        <p className="font-normal text-[16px] text-GrayHomz mb-5">
          Help us get to know you better by filling out all information
        </p>
      </div>
      <div className="px-8">
        <div className="relative h-auto flex justify-center">
          <div className="z-0 absolute w-full pr-[40px] md:pr-[90px] pl-[40px] md:pl-[88px] lg:pl-[104px] py-[27px]">
            <div className="border-[1px]"></div>
          </div>
          <div className="z-1 relative flex mt-5 gap-4 justify-between items-center px-8 w-full">
            {steps.map((stepTitle, index) => (
              <div key={index} className="flex flex-col items-center gap-2 justify-center">
                <div
                  className={`flex flex-col items-center p-2 justify-center ${step === index ? "bg-white rounded-full w-4 h-4 shadow-md" : "h-4 w-4"}`}
                  onClick={() => {
                    setStep(index)
                  }}
                >
                  <div
                    className={`rounded-full w-2 h-2 cursor-pointer bg-blue-500 p-1 text-[14px] font-[500] text-center`}
                  ></div>
                </div>
                <p className="hidden md:block text-[12px] lg:text-[14px] font-normal text-GrayHomz">{stepTitle}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
          {step === 0 && (
            <PersonalInfo register={register} setFormData={setFormData} formData={formData} setStep={setStep} />
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
        </form>
      </div>
    </div>
  );
}
