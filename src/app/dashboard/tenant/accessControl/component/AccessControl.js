"use client";
import React, { useState } from "react";
import { VisitorData } from "@/app/dashboard/accessControlComponents/VisitorData";
import VistorTable from "./visitorsTable";
import SuccessModal from "@/app/dashboard/components/SuccessModal";
import Image from "next/image";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import { useForm } from "react-hook-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import Loading from "@/components/mainmenu/loading";


import { useRouter } from "next/navigation";
import ThreeDotsLoader from "@/components/mainmenu/ThreeDotsLoader";
import { set } from "lodash";
// import tenantProfile from "@/store/tenantStore/tenantProfile";

const AccessControl = () => {
  const [isLoading, setLoader2] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [miniModalIsOpen, setMiniModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [accessCode, setAccessCode] = useState(null);
  const [regBtnAppear, setRegBtnAppear] = useState(false);
  const [mobileModalIsOpen, setMobileModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate]= useState("")

  const fetchData = async (page, date) => {
    // Construct the query based on pagination and filters
    let query = `/visitor/accesscontrol/tenant/get?page=${page}`;
    if (date) {
      // setEnabled(true);
      query += `&dateFiliter=${date}`;
      setPage(page || 1);
      // pageManagement(page || 1);
    }
    return await api.get(query);
  };
  const { isPending, refetch, data } =
    useQuery({
      queryKey: ["users", page, date],
      queryFn: async () => {
        return await fetchData(page, date);
      },
      placeholderData: keepPreviousData,
      select: (users) => {
        return users.data.data;
      },
      // enabled: enable,
    });

  const router = useRouter();
  const back = () => {
    router.back();
  };
  const openModal = () => {
    setModalIsOpen(true);
    setRegBtnAppear(true);
  };
  const openMiniModal = () => {
    setMiniModalIsOpen(true);
  };

  const openMobileModal = () => {
    setMobileModalIsOpen(true);
  };
  const closeMobileModal = () => {
    setMobileModalIsOpen(false);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {
    if (!data) return;

    setLoader2(true);

    const { visitorName, purposeOfVisit, visitorPhoneNumber, noOfPersons } =
      data;

    try {
      const response = await api.post("/visitor/accesscontrol/tenant/create", {
        visitorName,
        purposeOfVisit,
        visitorPhoneNumber,
        noOfPersons,
      });

      setAccessCode(response?.data?.data?.accessCode);
      reset();
      setModalIsOpen(false);
      openMiniModal();
      refetch();
    } catch (error) {
      console.error("Error creating access control:", error);
    } finally {
      setLoader2(false);
    }
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

  const closeModal = () => {
    setModalIsOpen(false);
    setRegBtnAppear(false);
    reset();
  };
  const closeMiniModal = () => {
    setMiniModalIsOpen(false);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
  };

  const handleReset=()=>{
    setDate("")
   }
  if (isPending) {
    return <Loading />;
  }

  // console.log(VisitorData)
  return (
    <div className="flex flex-col sm:space-y-7 space-y-2 p-6">
      <div className="flex items-center  md:hidden  justify-between">
        <button
          onClick={back}
          className="bg-[#EEF5FF] rounded-[8px] p-[4px] md:hidden"
        >
          <Image
            src={"/static/images/Button.svg"}
            alt=""
            height={22}
            width={22}
          />
        </button>{" "}
        <div className="flex gap-2 items-center ">
          <p className="font-[500]">Visitors</p>
          <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
            <span className="text-BlueHomz text-[18px] font-[400]">
              {VisitorData.length}
            </span>
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={openMobileModal}
            className="border border-[#006AFF] rounded-[4px] py-[8px] px-[12px] h-[40px] hover:border-blue-600"
          >
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
          <button
            className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[40px] py-[8px] px-[12px]"
            onClick={openModal}
          >
            <Image
              src="/static/images/add-visitor.svg"
              height={16}
              width={16}
              alt=""
            />
          </button>
        </div>
      </div>
      {VisitorData.length > 0 ? (
        <VistorTable data={data} openModal={openModal} date={date} setDate={setDate} refetch={handleReset} />
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
                className="flex items-center justify-center rounded-[4px] text-[14px] font-[500] bg-[#006AFF] text-white px-[12px] py-[8px] cursor-pointer space-x-2 h-[37px]"
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
                  alt=""
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="name"
                className="font-[500] text-[13px] leading-[19.5px]"
              >
                {"Visitor's Name "}
                <span className="text-red-500">*</span>
              </label>
              <>
                <input
                  {...register("visitorName", {
                    required: "This field is required",
                  })}
                  placeholder="Visitor's name"
                  className="border border-[#A9A9A9] p-[12px] rounded-[4px] h-[44px] w-full"
                />
                {errors.visitorName && (
                  <span className="text-red-500 text-xs">
                    {errors.visitorName.message}
                    {/* {"Visitor's name is required"} */}
                  </span>
                )}
              </>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="purposeOfVisit"
                className="font-[500] text-[13px] leading-[19.5px]"
              >
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <>
                <input
                  {...register("purposeOfVisit", {
                    required: "This field is required",
                  })}
                  className="border border-[#A9A9A9] p-[12px] rounded-[4px] h-[44px] w-full"
                  placeholder="Social visit / Delivery / Business meeting..."
                />
                {errors.purposeOfVisit && (
                  <span className="text-red-500 text-xs">
                    {errors.purposeOfVisit.message}
                    {/* Purpose of visit is required. */}
                  </span>
                )}
              </>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="visitorPhoneNumber"
                className="font-[500] text-[13px] leading-[19.5px]"
              >
                {" Visitor's Phone Number"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <>
                <input
                  {...register("visitorPhoneNumber", {
                    required: "This field is required",
                    pattern: {
                      value: /^((\+234)+|0)[7-9]{1}[0-9]{9}$/,
                      message: "Invalid Phone number",
                    },
                  })}
                  className="border border-[#A9A9A9] p-[12px] rounded-[4px] h-[44px] w-full"
                  placeholder="Enter  visitor’s phone number"
                />
                {errors.visitorPhoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.visitorPhoneNumber.message}
                  </span>
                )}
              </>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="noOfPersons"
                className="font-[500] text-[13px] leading-[19.5px]"
              >
                Number of Persons <span className="text-red-500">*</span>
              </label>
              <>
                <input
                  type="number"
                  {...register("noOfPersons", {
                    required: "This field is required",
                    pattern: {
                      value: /^[1-9]\d*$/,
                      message: "Please enter a positive number",
                    },
                  })}
                  className="border border-[#A9A9A9] p-[12px] rounded-[4px] h-[44px]  w-full"
                  placeholder="Enter the total number of expected persons"
                />

                {errors.noOfPersons && (
                  <span className="text-red-500 text-xs">
                    {errors.noOfPersons.message}
                  </span>
                )}
              </>
            </div>
            <button
              type="submit"
              className="bg-BlueHomz2 mt-2 text-white flex items-center p-[12px] justify-center rounded-[4px] h-[48px]  w-full"
            >
              {isLoading ? (
                <ThreeDotsLoader color="#ffffff" />
              ) : (
                <span>Generate Access Code</span>
              )}
            </button>
          </form>
        </div>
      </CustomizedModal>
      <CustomizedModal isOpen={miniModalIsOpen} onRequestClose={closeMiniModal}>
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
            <div className="w-[524px] h-[45px] bg-[#E6E6E6] p-2 flex mb-2">
              <input
                type="text"
                value={accessCode}
                readOnly
                id="accessCodeField"
                className="w-[470px] h-[30px] text-[14px] bg-[#E6E6E6] pt-[5px]"
              />
              <Image
                src="/static/images/copy.svg"
                height={16}
                width={16}
                onClick={copyToClipboard}
                className="cursor-pointer"
                alt=""
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
      <SuccessModal
        isOpen={successModalIsOpen}
        title="Access code copied successfully"
        handleEvent={() => {
          setRegBtnAppear(false);
          closeSuccessModal();
        }}
      />

      {/* modal for filtering with date on the mobile */}
      <CustomizedModal
        isOpen={mobileModalIsOpen}
        onRequestClose={closeMobileModal}
      >
        <div className="bg-white border flex flex-col w-[350px]  py-[24px] px-[16px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeMobileModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <input
            type="date"
            name="date"
            className="border border-[#A9A9A9] h-[37px] w-full rounded-[4px] py-[8px] px-[12px]"
          />

          <button className="border w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-3">
            <Image
              src={"/static/images/white_repeat.svg"}
              alt=""
              height={17}
              width={16}
            />

            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default AccessControl;
