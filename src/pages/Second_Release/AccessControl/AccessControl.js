"use client";
import React, { useState } from "react";
import {VisitorData} from "./VisitorData";
import VistorTable from "./visitorsTable";
import Image from "next/image";
import CustomizedModal from "./component/CustomizedModal";
import { useForm } from "react-hook-form";

const AccessControl = () => {
  const [data, setData] = useState(VisitorData || {});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [miniModalIsOpen, setMiniModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [accessCode, setAccessCode] = useState(null);
  const [regBtnAppear, setRegBtnAppear] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    setRegBtnAppear(true);

  };
  const openMiniModal = () => {
    setMiniModalIsOpen(true);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    console.log(data);
    setAccessCode(() => generateAccessCode(20));
    reset();
    setModalIsOpen(false);
    openMiniModal();
  };

  const copyToClipboard = () => {
    // Copy the access code to the clipboard
    navigator.clipboard
      .writeText(accessCode)
      .then(() => {
        // console.log("Access code copied to clipboard:", accessCode);
        setMiniModalIsOpen(false);
        setSuccessModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Failed to copy access code to clipboard:", error);
      });
  };
  function generateAccessCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let registrationNumber = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      registrationNumber += characters.charAt(randomIndex);
    }
    return registrationNumber;
  }
  const closeModal = () => {
    setModalIsOpen(false);
    setRegBtnAppear(false);
  };
  const closeMiniModal = () => {
    setMiniModalIsOpen(false);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  // console.log(VisitorData)
  return (
    <div className="flex flex-col space-y-7 pt-8">
      {data.length > 0 ? (
        <VistorTable Data={VisitorData} openModal={openModal}/>
      ) : (
        <>
          <div className="">
            <p className="mb-2 text-[20px]">Access Control</p>
            <p className="text-[#4E4E4E] leading-[27px] mb-3">
              Generate access codes for your visitors to gain entry into the
              estate
            </p>
            <button
              className={`${
                !regBtnAppear && "hidden"
              } flex items-center justify-center text-[14px] font-[500] bg-[#006AFF] text-white px-4 py-2 rounded cursor-pointer space-x-2`}
            >
              Register Visitor
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
              <Image
                src="/static/images/GetStartedKey.svg"
                alt=""
                height={100}
                width={100}
                className="rounded-[8px]"
              />

              <h1 className="text-[#006AFF] text-[36px] font-[700] leading-[45px] text-left">
                Get Started
              </h1>
              <button
                className="flex items-center justify-center text-[14px] font-[500] bg-[#006AFF] text-white px-4 py-2 rounded cursor-pointer space-x-2"
                onClick={openModal}
              >
                <span>Get Access Code</span>
              </button>
              
            </div>
          </div>
        </>
      )}
      <CustomizedModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="flex flex-col w-[550px]  bg-white rounded-[12px] p-[28px] space-y-7">
                  <div className=" flex items-center justify-between">
                    <div className=" pt-2">
                      <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2">
                        Register Visitor
                      </p>
                      <p className="text-[13px] leading-[19.5px] text-[#4E4E4E]">
                        Enter information about your visitor(s){" "}
                      </p>
                    </div>
                    <div>
                      <button onClick={closeModal} className="cursor-pointer">
                        <Image
                          src="/static/images/close-square.svg"
                          height={24}
                          width={24}
                          alt=''
                        />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="name"> Visitor's Name</label>
                      <br />
                      <input
                        {...register("visitorName", {
                          required: true,
                        })}
                        placeholder="Visitor's name"
                        className="visitor"
                      />
                      {errors.visitorName && (
                        <p className="errorMsg">Visitor's name is required</p>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="purposeOfVisit">Purpose of Visit</label>
                      <br />
                      <input
                        {...register("purposeOfVisit", {
                          required: true,
                        })}
                        className="visitor"
                        placeholder="Social visit / Delivery / Business meeting..."
                      />
                      {errors.purposeOfVisit && (
                        <p className="errorMsg">
                          Purpose of visit is required.
                        </p>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="visitorPhoneNumber">
                        Visitor's Phone Number
                      </label>
                      <br />
                      <input
                        {...register("visitorPhoneNumber", {
                            required: "This field is required",
                          pattern: {
                            value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                            message: "Invalid Phone number",
                          },
                        })}
                        className="visitor"
                        placeholder="Enter  visitor’s phone number"
                      />
                      {errors.visitorPhoneNumber && (
                        <span className="text-red-500 text-xs">
                          {errors.visitorPhoneNumber.message}
                        </span>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="numberOfPersons">Number of Persons</label>
                      <br />
                      <input
                        type="number"
                        {...register("numberOfPersons", {
                            required: "This field is required",
                          pattern: {
                            value: /^[1-9]\d*$/,
                            message: "Please enter a positive number",
                          },
                        })}
                        className="visitor"
                        placeholder="Enter the total number of expected persons"
                      />

                      {errors.numberOfPersons && (
                        <span className="text-red-500 text-xs">
                          {errors.numberOfPersons.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="bg-BlueHomz2 text-white rounded-[4px] visitor mt-3"
                    >
                      Generate Access Code
                    </button>
                  </form>
                </div>
              </CustomizedModal>
              <CustomizedModal
                isOpen={miniModalIsOpen}
                onRequestClose={closeMiniModal}
              >
                <div className="flex flex-col w-[591px] h-[274px] py-[36px] px-[28px] gap-[26px] bg-white rounded-[12px]">
                  <div>
                    <p className="mb-2 text-[20px]">Access Code</p>
                    <p className="text-[#4E4E4E] leading-[27px] text-[14px]">
                      Copy and send the access code to your visitor
                    </p>
                  </div>
                  <form
                    onSubmit={() => {
                      setMiniModalIsOpen(!miniModalIsOpen);
                      copyToClipboard();
                    }}
                  >
                    <div className="w-[524px] h-[45px] bg-[#EEF5FF] p-2 flex mb-2">
                      <input
                        type="text"
                        value={accessCode}
                        readOnly
                        id="accessCodeField"
                        className="w-[470px] h-[30px] text-[14px] bg-[#EEF5FF] pt-[5px]"
                      />
                      <Image
                        src="/static/images/copy.svg"
                        height={16}
                        width={16}
                        onClick={copyToClipboard}
                        className="cursor-pointer"
                        alt=''
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-BlueHomz2 text-white rounded-[4px] adminCellBorders mt-3 w-[524px] h-[44px] p-[12px] "
                    >
                      Copy Code
                    </button>
                  </form>
                </div>
              </CustomizedModal>
              <CustomizedModal
                isOpen={successModalIsOpen}
                onRequestClose={closeSuccessModal}
              >
                <div className="bg-white adminCellBorders flex flex-col w-[464px] h-[233px] p-[32px] rounded-[12px] gap-[18px]">
                  <div className="flex flex-col gap-6 items-center justify-center">
                    <Image
                      src="/static/images/success_icon.svg"
                      height={48}
                      width={46}
                      alt=''
                     
                    />
                    <p className="text-[20px] font-[700] leading-[25px] text-center">
                      Access code copied successfully
                    </p>
                  </div>

                  <button
                    className="bg-BlueHomz2 text-white rounded-[4px] adminCellBorders  w-[400px] h-[48px] p-[12px]"
                    onClick={() => {
                      setRegBtnAppear(false);
                      closeSuccessModal();
                    
                    }}
                  >
                    Close
                  </button>
                </div>
              </CustomizedModal>
    </div>
  );
};

export default AccessControl;
