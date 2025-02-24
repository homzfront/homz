"use client"
import React from "react";
import { useForm } from "react-hook-form";
import PersonalInfo from "./personalInfo";
import SpouseNextKin from "./spouseNextKin";
import OccupantDetails from "./occupantDetails";
import Guarantors from "./guarantors";
import TenantVerification from "./tenantVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { tenantInformationKYC } from "@/api/tenantSevice";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import OpenSavedModal from "./openSavedModal";
import SuccessModal from "@/app/dashboard/components/SuccessModal";
import { useRouter } from "next/navigation";
import { formatDateIII } from "@/utils/formatDateIII";
import useTenantActiveKYC from "@/store/tenantKYC/useTenantActiveKYC";
const steps = [
  "Personal Information",
  "Spouse/Kin Information",
  "Occupant Details",
  "Guarantors",
  "Tenant Verification",
];

export default function MultiStepForm() {
  const { setStep } = useTenantActiveKYC()
  const [step, MainStep] = React.useState(0);
  const [formData, setFormData] = React.useState(null);
  const [openSaveModal, setOpenSaveModal] = React.useState(false)
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  const router = useRouter()
  const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const requiredFields = [
        "fullName",
        "apartmentAddress",
        "phoneNumber",
        "sex",
        "maritalStatus",
        "officeAddress",
        "permanentContactAddress",
        "nationality",
        "stateOfOrigin",
        "rentPurpose",
        "religion",
        "accommodationType",
        "whenDoYouIntendToMoveIn",
        "spouseOccupation",
        "spouseOfficeAddress",
        "occupantnamei",
        "occupantagei",
        "occupantoccupationi",
        "noofcars",
        "firstGuarantorUpload",
        "firstGuarantorIdUpload",
        "secondGuarantorUpload",
        "secondGuarantorIdUpload",
      ];

      const isFormComplete = requiredFields.every(
        (field) => formData?.[field] !== undefined && formData?.[field] !== null && formData?.[field] !== ""
      );

      const formDataToSubmit = new FormData();
      const data = {
        fullName: formData?.fullName,
        phoneNumber: formData?.phoneNumber ? parseInt(formData?.phoneNumber) : null,
        gender: formData?.sex,
        maritalStatus: formData?.maritalStatus,
        officeAddress: formData?.officeAddress,
        apartmentAddress: formData?.apartmentAddress,
        permanentContactAddress: formData?.permanentContactAddress,
        nationality: formData?.nationality,
        stateOfOrigin: formData?.stateOfOrigin,
        rentPurpose: formData?.rentPurpose,
        religion: formData?.religion,
        accommodationType: formData?.accommodationType,
        moveInDate: formData?.moveInDate ? formatDateIII(formData?.moveInDate) : formData?.whenDoYouIntendToMoveIn,
        spouseOccupation: formData?.spouseOccupation,
        spouseOfficeAddress: formData?.spouseOfficeAddress,
        occupantName: formData?.OccupantNameI,
        occupantAge: formData?.OccupantAgeI,
        occupantOccupation: formData?.OccupantOccupationI,
        numberOfCars: formData?.NoOfCars,
        isOnBaordingFormComplete: isFormComplete,
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formDataToSubmit.append(key, value);
        }
      });

      if (formData?.firstGuarantorUpload) {
        formDataToSubmit.append("firstGuarantorForm", formData.firstGuarantorUpload);
      }
      if (formData?.firstGuarantorIdUpload) {
        formDataToSubmit.append("firstGuarantorIdCard", formData.firstGuarantorIdUpload);
      }
      if (formData?.secondGuarantorUpload) {
        formDataToSubmit.append("secondGuarantorForm", formData.secondGuarantorUpload);
      }
      if (formData?.secondGuarantorIdUpload) {
        formDataToSubmit.append("secondGuarantorIdCard", formData.secondGuarantorIdUpload);
      }

      const { success, error } = await tenantInformationKYC(
        formDataToSubmit
      );

      if (success) {
        setLoading(false);
        setOpenSaveModal(false);
        
      if (step !== 3) {
        setOpenSuccessModal(true)
      }

      if (step === 3) {
        router.push("/dashboard/tenant/profile?tab=personalInfo")
        setStep(step + 1)
        return
      }

      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update");
    }
  };

  return (
    <div className="py-4">
      {
        openSaveModal &&
        <CustomizedModal isOpen={openSaveModal} onRequestClose={() => setOpenSaveModal}>
          <OpenSavedModal
            header={"Save and Continue Later?"}
            body={"You can complete your profile on your dashboard at any time, but please note that your account will remain incomplete until all the required details are submitted."}
            button={"Yes, Save & Continue Later"}
            buttonTwo={"No, Go Back to Complete Form"}
            returnHome={onSubmit}
            loading={loading}
            returnHomeTwo={() => setOpenSaveModal(false)}
          />
        </CustomizedModal>
      }
      {
        openSuccessModal && <SuccessModal
          isOpen={openSuccessModal}
          title={"Done!"}
          handleEvent={() => {
            router.push("/dashboard/tenant/profile?tab=personalInfo")
            setStep(step + 1)
          }}
          successText={"Thank you for providing your details. Please proceed to the dashboard to continue."}
          optionalText={"Proceed to dashboard"}
        />
      }
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
              <div key={index} className={`flex flex-col items-center gap-2 justify-center ${index === 4 && "pointer-events-none"}`}>
                <div
                  className={`flex flex-col items-center p-2 justify-center ${step === index ? "bg-white rounded-full w-4 h-4 shadow-md" : "h-4 w-4"}`}
                  onClick={() => {
                    MainStep(index)
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
        <div>
          {step === 0 && (
            <PersonalInfo register={register} setOpenSaveModal={setOpenSaveModal} onSubmit={onSubmit} setFormData={setFormData} formData={formData} setStep={MainStep} />
          )}
          {step === 1 && (
            <SpouseNextKin register={register} setOpenSaveModal={setOpenSaveModal} onSubmit={onSubmit} setFormData={setFormData} formData={formData} setStep={MainStep} />
          )}
          {step === 2 && (
            <OccupantDetails register={register} setOpenSaveModal={setOpenSaveModal} onSubmit={onSubmit} setFormData={setFormData} formData={formData} setStep={MainStep} />
          )}
          {step === 3 && (
            <Guarantors loading={loading} register={register} setOpenSaveModal={setOpenSaveModal} onSubmit={onSubmit} setFormData={setFormData} formData={formData} setStep={MainStep} />
          )}
          {step === 5 && (
            <TenantVerification loading={loading} setOpenSuccessModal={setOpenSuccessModal} register={register} setOpenSaveModal={setOpenSaveModal} onSubmit={onSubmit} setFormData={setFormData} formData={formData} setStep={MainStep} />
          )}
        </div>
      </div>
    </div>
  );
}
