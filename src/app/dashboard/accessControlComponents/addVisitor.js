import React, { useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import { useForm } from "react-hook-form";
import SuccessModal from "../components/SuccessModal";

const AddVisitor = ({ modalIsOpen, closeModal }) => {
  const properties = ["a", "b", "c", "d"];

  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const cancel = () => {
    reset();
    closeModal(false);
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    reset();
    closeModal(false);
    setSuccessModalIsOpen(true);
    // openMiniModal();
  };
  return (
    <>
      <CustomizedModal isOpen={modalIsOpen}>
        <div className="bg-white border flex flex-col py-6 px-4 pl-8 rounded-[12px] gap-6 w-[95%] max-w-[900px] mx-auto max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-BlueHomz text-lg font-medium">
                Register Visitor
              </p>
              <p className="text-[#A9A9A9] text-sm leading-5 mt-1">
                Enter information about visitor(s)
              </p>
            </div>
            <button onClick={cancel} className="cursor-pointer md:hidden block">
              <Image
                src="/static/images/close-square.svg"
                height={24}
                width={24}
                alt="Close"
              />
            </button>
          </div>

          <form
            className="flex flex-col gap-4 sm:gap-4 "
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Visitor Information */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 ">
              <div className="bg-[#F6F6F6] p-4 rounded-lg flex-1 flex flex-col gap-4 w-full md:w-[400px]">
                <p className="text-base font-medium">Visitor Information</p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="visitorName" className="text-xs font-normal">
                    Visitor’s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("visitorName", {
                      required: "This field is required",
                    })}
                    placeholder="Full Name"
                    className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                  />
                  {errors.visitorName && (
                    <span className="text-red-500 text-xs">
                      {errors.visitorName.message}
                      {/* {"Visitor's name is required"} */}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Purpose_of_visit"
                    className="text-xs font-normal"
                  >
                    Purpose of visit <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("purposeOfVisit", {
                      required: "This field is required",
                    })}
                    placeholder="Social visit / Delivery / Business meeting..."
                    className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                  />
                  {errors.purposeOfVisit && (
                    <span className="text-red-500 text-xs">
                      {errors.purposeOfVisit.message}
                      {/* Purpose of visit is required. */}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 sm:flex-row flex-col">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="Visitor_PhoneNumber"
                      className="text-xs font-normal"
                    >
                      Visitor’s Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("visitorPhoneNumber", {
                        required: "This field is required",
                        pattern: {
                          value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                          message: "Invalid Phone number",
                        },
                      })}
                      placeholder="0000 000 0000"
                      className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                    />
                    {errors.visitorPhoneNumber && (
                      <span className="text-red-500 text-xs">
                        {errors.visitorPhoneNumber.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      htmlFor="numberOfPersons"
                      className="text-xs font-normal"
                    >
                      Number of Persons <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      {...register("numberOfPersons", {
                        required: "This field is required",
                        pattern: {
                          value: /^[1-9]\d*$/,
                          message: "Please enter a positive number",
                        },
                      })}
                      placeholder="e.g 2"
                      className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                    />
                    {errors.numberOfPersons && (
                      <span className="text-red-500 text-xs">
                        {errors.numberOfPersons.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tenant Information */}
              <div className="bg-[#F6F6F6] p-4 rounded-lg flex-1 flex flex-col gap-4 w-full md:w-[400px]">
                <p className="text-base font-medium">Tenant Information</p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tenantName" className="text-xs font-normal">
                    Tenant’s Name
                  </label>
                  <input
                    {...register("tenantName")}
                    placeholder="e.g Victor Kunle"
                    className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="property" className="text-xs font-normal">
                    Property
                  </label>
                  <select
                    name="property"
                    id="property"
                    className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                    {...register("property")}

                  >
                    <option value="" disabled selected>
                      Select Tenant’s Property
                    </option>
                    {properties.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="ApartmentNumber"
                    className="text-xs font-normal"
                  >
                    Apartment Number
                  </label>
                  <input
                  {...register("ApartmentNumber")}
                    placeholder="[Auto filled]"
                    className="text-sm h-[44px] p-3 rounded border border-[#E6E6E6] bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex sm:justify-end gap-[12px] sm:flex-row flex-col sm:pr-6">
              <button
                className=" text-[#4E4E4E] text-sm font-medium px-4 py-2 rounded order-2 sm:order-1"
                onClick={cancel}
              >
                Close
              </button>
              <button
                className={`${
                  isValid
                    ? "bg-[#006AFF] text-[#FFFFFF]"
                    : "bg-[#E6E6E6] text-[#D5D5D5]"
                } text-sm font-medium px-4 py-2 rounded order-1 sm:order-2`}
                type="submit"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      </CustomizedModal>
      <SuccessModal
        isOpen={successModalIsOpen}
        title="Visitor’s record added successfully"
        handleEvent={() => {
          setSuccessModalIsOpen(false);
        }}
      />
    </>
  );
};

export default AddVisitor;
