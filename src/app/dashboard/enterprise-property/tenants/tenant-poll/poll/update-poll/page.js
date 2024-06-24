"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import Loading from "../components/loading";
import ToggleButton from "@/pages/dashboard/enterprise/components/toggle";

const UpdatePoll = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [multipleOptions, setMultipleOptions] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [option1Question, setOption1Question] = useState("");
  const [option2Question, setOption2Question] = useState("");
  const [option3Question, setOption3Question] = useState("");
  const [option4Question, setOption4Question] = useState("");
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewPoll, setPreviewPoll] = useState(false);
  const [pollDetail, setPollDetail] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  //  console.log(data)

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);
    // Clean up function
    return () => clearTimeout(timeout);
  }, []);

  const openModal = () => {
    setSaveModalIsOpen(true);
  };
  const handlePreview = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };

  const handleSaved = () => {
    setSuccessModalIsOpen(true);
    setSaveModalIsOpen(false);
  };

  const closeSuccessModal = () => {
    // setEndDate(null);
    // setPollTitle("");
    // setStartDate(null);
    // setPollQuestion("");
    // setPollDescription("");
    setSuccessModalIsOpen(false);
  };

  const handleChange = () => {
    setIsToggled(!isToggled);
  };
  // const isSaveButtonDisabled = () => {
  //   return (
  //     !pollTitle || !pollDescription || !startDate || !endDate || !pollQuestion
  //   );
  // };
  return (
    <div className="pt-11 md:pt-4 px-8 mb-10">
      <div className="hidden md:flex flex-col gap-6  pb-1">
        <Link href="/dashboard/enterprise-property/tenants/tenant-poll/poll/poll-questions">
          <button className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-w_idth="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className=" text-gray-400 text-[14px]">Go Back</span>
          </button>
        </Link>
        <p className=" md:text-[20px] font-[700]">Update Poll</p>
      </div>
      <div className="flex items-center md:hidden space-x-20  mb-9 md:mb-0">
        <Link
          href="/dashboard/enterprise-property/Poll/PollQuestions"
          className="bg-[#EEF5FF] rounded-[8px] p-[4px]"
        >
          <Image
            src={"/static/images/Button.svg"}
            alt=""
            height={22}
            width={22}
          />
        </Link>
        <p className=" md:text-[20px] font-[700]">Update Poll</p>
      </div>
      <div className="w-full mt-2 py-[24px] px-[32px] rounded-[12px] bg-[#F6F6F6] md:px-6 space-y-1">
        <div className="flex flex-col pb-[12px]">
          <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
            Poll Title/Name <span className="text-red-600">*</span>
          </p>

          <div className="mt-1">
            <input
              type="text"
              className=" w-full h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
              value={pollTitle}
              id="Poll_Title"
              name="Poll_Title"
              placeholder="Give this poll a title/name"
              onChange={(e) => setPollTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col  md:pb-[12px]">
          <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
            Poll Description <span className="text-red-600">*</span>
          </p>

          <div className="mt-1">
            <input
              type="text"
              className=" w-full h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
              value={pollDescription}
              id="Poll_Description"
              name="Poll_Description"
              placeholder="Give a brief description of this poll"
              onChange={(e) => setPollDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex flex-col pt-2 md:pb-[24px] w-full">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              Start Date <span className="text-red-600">*</span>
            </p>

            <div className="mt-1">
              <input
                type="date"
                className=" w-full md:w-[100%] h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
                value={startDate || ""}
                id="Start_Date"
                name="Start_Date"
                placeholder="9th January, 2024"
                onChange={(e) => {
                  const selectedStartDate = e.target.value;
                  if (selectedStartDate > endDate) {
                    setErrorMsg("End date cannot be less than start date");
                    setStartDate(null);
                  } else {
                    setStartDate(selectedStartDate);
                    setErrorMsg("");
                  }
                }}
              />
              <span className="text-red-600 text-[11px]">{errorMsg}</span>
            </div>
          </div>
          <div className="flex flex-col md:pt-2 pb-[24px] w-full">
            <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
              End Date <span className="text-red-600">*</span>
            </p>

            <div className="mt-1">
              <input
                type="date"
                className="w-full md:w-[100%] h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
                value={endDate || ""}
                id="End_Date"
                name="End_Date"
                placeholder="16th January, 2024"
                onChange={(e) => {
                  const selectedEndDate = e.target.value;
                  if (selectedEndDate >= startDate) {
                    setEndDate(selectedEndDate);
                    setErrorMsg2("");
                  } else {
                    setErrorMsg2("End date cannot be less than start date");
                    setEndDate(null);
                  }
                }}
              />
              <span className="text-red-600 text-[11px]">{errorMsg2}</span>
            </div>
          </div>
        </div>
        <div className="mt-1">
          <div className="flex gap-2 pb-2">
          <ToggleButton isOpen={anonymous} onToggle={() => setAnonymous(!anonymous)} />
            <p className="text-[#4E4E4E] text-[14px]">Anonymous voting</p>
          </div>

          <p className="w-[271px] text-[13px] text-GrayHomz2 text-[400] leading-[19.5px] md:w-[522px]">
            If toggled on, identities of responders will not be displayed to
            you. Voters will also be notified of this setting.
          </p>
        </div>
      </div>
      <div className="flex gap-1 md:px-7 mt-2 px-2">
        <div className="w-full">
          <div className="md:hidden flex flex-col mt-2">
            <div className="flex gap-4 pb-2">
              <p className="mr-7">
                Question
                <span className="text-red-600">*</span>
              </p>
              <ToggleButton isOpen={multipleOptions} onToggle={() => setMultipleOptions(!multipleOptions)} />
              <p className="text-[#4E4E4E] text-[14px]">
                Allow multiple answers
              </p>
            </div>
          </div>
          <p className="hidden md:block mt-2">
            Question
            <span className="text-red-600 ">*</span>
          </p>
          <div className="flex mt-2 gap-5 h-[380px] w-full">
            <div className="w-[50%] flex flex-col gap-2">
              <input
                type="text"
                className="w-full md:w-[100%]  h-[45px] text-BlackHomz border p-[12px] rounded-[4px]"
                value={pollQuestion}
                id="pollQuestion"
                name="pollQuestion"
                placeholder="Type poll question"
                onChange={(e) => setPollQuestion(e.target.value)}
              />
              <div className=" w-[323px] flex items-center  md:w-[100%] h-[45px] gap-[2px] mt-3">
                <div className="w-full  flex items-center h-[45px] border rounded-[4px]">
                  <input
                    type="text"
                    id="option1Qestion"
                    name="option1Qestion"
                    value={option1Question}
                    className="w-[100%] h-[42px]  px-2"
                    placeholder="Option 1"
                    // value={option === "option1" ? option : ""}
                    onChange={(e) => setOption1Question(e.target.value)}
                  />
                </div>
                {/* <span className="text-red-600 text-[20px] pb-[24px]">*</span> */}
              </div>
              <div className="w-full flex items-center md:w-[100%] h-[45px] gap-[2px] mt-3">
                <div className="w-full  flex items-center h-[45px] border rounded-[4px]">
                  <input
                    type="text"
                    id="option2Qestion"
                    name="option2Qestion"
                    value={option2Question}
                    className=" w-full md:w-[100%] h-[42px]  px-2"
                    placeholder="Option 2"
                    // value={option === "option2" ? option : ""}
                    onChange={(e) => setOption2Question(e.target.value)}
                  />
                </div>
                {/* <span className="text-red-600 text-[20px] pb-[24px]">*</span> */}
              </div>
              <div className="w-full flex items-center md:w-[100%] h-[45px] gap-[14px] mt-3">
                <div className="w-full  flex items-center h-[45px] border rounded-[4px] px-2">
                  <input
                    type="text"
                    id="option3Question"
                    name="option3Question"
                    className=" w-full md:w-[97%] h-[42px] "
                    value={option3Question}
                    placeholder="Option 3"
                    // value={option === "option2" ? option : ""}
                    onChange={(e) => setOption3Question(e.target.value)}
                  />
                  <button
                    className="cursor-pointer"
                    onClick={() => handleClearInputField("option3Question")}
                  >
                    <Image
                      src="/static/images/close-square.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
              <div className="w-full flex items-center md:w-[100%] h-[45px] gap-[14px] mt-3">
                <div className="w-full  flex items-center  h-[45px] border rounded-[4px] px-2">
                  <input
                    type="text"
                    id="option4Qestion"
                    name="option4Qestion"
                    className=" w-full md:w-[97%] h-[42px] "
                    value={option4Question}
                    placeholder="Option 4"
                    // value={option === "option2" ? option : ""}
                    onChange={(e) => setOption4Question(e.target.value)}
                  />
                  <button
                    className="cursor-pointer"
                    onClick={() => handleClearInputField("option4Qestion")}
                  >
                    <Image
                      src="/static/images/close-square.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-[50%] h-[240px] p-[24px] gap-[28px] rounded-[8px] bg-[#F6F6F6]">
              <div className="flex gap-2 pb-2">
                <ToggleButton isOpen={multipleOptions} onToggle={() => setMultipleOptions(!multipleOptions)} />
                <p className="text-[#4E4E4E] text-[14px]">
                  Allow multiple answers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-6 flex w-full flex-col md:flex-row justify-center gap-[24px] px-2 md:px-0 md:justify-end md:items-center md:gap-8">
        <>
          {/* {loading ? (
            <Loading />
          ) : ( */}
          <Link
            href="/dashboard/enterprise-property/tenants/tenant-poll/poll/preview"
            className="flex justify-center order-2 md:order-1"
          >
            <p className="flex gap-1">
              <Image
                src="/static/images/eye.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className="">Preview</span>
            </p>
          </Link>
          {/* )} */}
        </>

        <button
          className={`w-full
                    md:w-[120px] h-[48px] ${"bg-BlueHomz text-white"} rounded-[4px] md:mr-[1rem] text-center  relative order-1 md:order-2`}
          onClick={openModal}
        >
          Publish Poll
        </button>
      </div>
      <CustomizeModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Publish Poll?
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Proceed with publishing poll?
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] border  md:w-[400px] h-[48px] p-[12px]"
            onClick={handleSaved}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] border  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              setSaveModalIsOpen(false);
            }}
          >
            No, go back
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white border w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Poll Published Successfully
            </p>

            <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Tenants can now view and respond to your poll
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] border  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            Close
          </button>
        </div>
      </CustomizeModal>
    </div>
  );
};

export default UpdatePoll;
