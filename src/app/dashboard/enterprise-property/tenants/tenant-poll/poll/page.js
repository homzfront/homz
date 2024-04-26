"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";
import Loading from "./components/loading";
import Preview from "./components/preview";
import ToggleButton from "@/pages/dashboard/enterprise/components/toggle";

const CreatePoll = () => {
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
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClearInputField = (id) => {
    const inputField = document.getElementById(id);

    if (id == "option3Question") {
      setOption3Question("");
    } else {
      setOption4Question("");
    }
  };

  const openModal = () => {
    setSaveModalIsOpen(true);
  };
  const handlePreview = () => {
    setPreviewPoll(true);
    setPollDetail([
      {
        title: pollTitle,
        pollDesc: pollDescription,
        start_date: startDate,
        end_date: endDate,
        poll_question: pollQuestion,
        options: {
          option1: option1Question,
          option2: option2Question,
          option3: option3Question,
          option4: option4Question,
        },
        anonymous_Voter: anonymous,
        multiple_Options: multipleOptions,
      },
    ]);
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
    setEndDate(null);
    setPollTitle("");
    setStartDate(null);
    setPollQuestion("");
    setPollDescription("");
    setAnonymous(false);
    setMultipleOptions(false);
    setOption1Question("");
    setOption2Question("");
    setOption3Question("");
    setOption4Question("");
    setSuccessModalIsOpen(false);
  };
  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };
  const handleChange = () => {
    setIsToggled(!isToggled);
  };
  const isSaveButtonDisabled = () => {
    return (
      !pollTitle ||
      !pollDescription ||
      !startDate ||
      !endDate ||
      !pollQuestion ||
      !option2Question ||
      !option1Question
    );
  };
  return (
    <div className="pt-9 md:pt-4 md:pb-10 pl-4 md:pl-0 w-full">
      {!previewPoll ? (
        <div className="w-full px-8">
          <div className="hidden md:flex flex-col gap-6  pb-1">
            <Link href="/dashboard/enterprise-property/tenants/tenant-poll">
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
            <p className=" md:text-[20px] font-[700]">Create A Poll</p>
          </div>
          <div className="flex items-center md:hidden space-x-20  mb-9 md:mb-0">
            <Link
              href="/dashboard/enterprise-property/tenants/tenant-poll/poll"
              className="bg-whiteblue rounded-[8px] p-[4px]"
            >
              <Image
                src={"/static/images/Button.svg"}
                alt=""
                height={22}
                width={22}
              />
            </Link>
            <p className=" md:text-[20px] font-[700] text-BlackHomz">Create A Poll</p>
          </div>
          <div className="w-[335px] md:w-full mt-2 py-[24px] px-[32px] rounded-[12px] bg-[#F6F6F6] md:px-6 space-y-1">
            <div className="flex flex-col pb-[12px]">
              <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
                Poll Title/Name <span className="text-red-600">*</span>
              </p>

              <div className="mt-1">
                <input
                  type="text"
                  className=" w-[100%] h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
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
                Poll Description
                {/* <span className="text-red-600">*</span> */}
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
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-[100%]">
              <div className="flex flex-col pt-2 md:pb-[24px] w-full">
                <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
                  Start Date
                  {/* <span className="text-red-600">*</span> */}
                </p>

                <div className="mt-1">
                  <input
                    type="date"
                    className=" w-full md:w-[100%]  h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
                    value={startDate || ""}
                    id="Start_Date"
                    name="Start_Date"
                    placeholder="9th January, 2024"
                    min={today}
                    onChange={(e) => {
                      const selectedStartDate = e.target.value;

                      if (endDate !== "" && selectedStartDate > endDate) {
                        setErrorMsg("End date cannot be less than start date");
                        setStartDate(null);
                      } else {
                        setStartDate(selectedStartDate);
                        setErrorMsg("");
                      }
                    }}
                  />
                  <span className="text-red-600 text-[11px] w-[200px]">
                    {errorMsg}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:pt-2 pb-[24px] w-full">
                <p className="text-[14px] text-[500] leading-[24px] text-[#202020]">
                  End Date
                  {/* <span className="text-red-600">*</span> */}
                </p>

                <div className="mt-1">
                  <input
                    type="date"
                    className="w-full md:w-[100%]  h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
                    value={endDate || ""}
                    id="End_Date"
                    name="End_Date"
                    placeholder="16th January, 2024"
                    min={today}
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
                  <span className="text-red-600 text-[11px] w-[200px]">
                    {errorMsg2}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex gap-2 pb-2">
                <ToggleButton isOpen={anonymous} onToggle={() => setAnonymous(!anonymous)} />
                <p className="text-[#4E4E4E] text-[14px]">Anonymous voting</p>
              </div>

              <p className="w-[271px] text-[13px] text-GrayHomz2 text-[400] leading-[19.5px] md:w-[50%]">
                If toggled on, identities of responders will not be displayed to
                you. Voters will also be notified of this setting.
              </p>
            </div>
          </div>
          <div className="flex gap-1 md:px-7 mt-2 px-2 w-full">
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
                {/* <span className="text-red-600 ">*</span> */}
              </p>
              <div className="flex mt-2 gap-5 h-[380px]" >
                <div className="w-[50%] flex flex-col gap-2">
                  <input
                    type="text"
                    className="w-full md:w-[100%]  h-[45px] text-BlackHomz border p-[12px] rounded-[4px] bg-transparent"
                    value={pollQuestion}
                    id="pollQuestion"
                    name="pollQuestion"
                    placeholder="Type poll question"
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                  <div className=" w-[323px] flex items-center  md:w-[100%] h-[45px] border rounded-[4px] gap-[2px] mt-3">
                    <div className="w-full  flex items-center h-[45px] proBorders rounded-[4px]">
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
                    {/* <span className="text-red-600 text-[20px] pb-[24px]">
                      *
                    </span> */}
                  </div>
                  <div className="w-full flex items-center md:w-[100%] h-[45px] border rounded-[4px] gap-[2px] mt-3">
                    <div className="w-full  flex items-center h-[45px] proBorders rounded-[4px]">
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
                    {/* <span className="text-red-600 text-[20px] pb-[24px]">
                      *
                    </span> */}
                  </div>
                  <div className="w-full flex items-center md:w-[100%] h-[45px] border rounded-[4px] gap-[14px] mt-3">
                    <div className="w-full  flex items-center h-[45px] proBorders rounded-[4px] px-2">
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
                  <div className="w-full flex items-center md:w-[100%] h-[45px] border rounded-[4px] gap-[14px] mt-3">
                    <div className="w-full  flex items-center h-[45px] proBorders rounded-[4px] px-2">
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
            {isSaveButtonDisabled() ? (
              <p className="flex gap-1 cursor-pointer justify-center order-2 md:order-1">
                <Image
                  src="/static/images/eye.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="opacity-40"
                />
                <span className="text-GrayHomz2">Preview</span>
              </p>
            ) : (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    // href="/dashboard/enterprise-property/Poll/Preview"
                    className="flex justify-center order-2 md:order-1"
                    onClick={handlePreview}
                  // disabled={isSaveButtonDisabled()}
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
                  </button>
                )}
              </>
            )}
            <button
              className={`w-full
                    md:w-[120px] h-[48px] ${isSaveButtonDisabled()
                  ? " bg-GrayHomz2 text-BlackHomz opacity-40"
                  : "bg-BlueHomz text-white"
                } rounded-[4px] md:mr-[1rem] text-center  relative order-1 md:order-2`}
              onClick={openModal}
              disabled={isSaveButtonDisabled()}
            >
              Publish Poll
            </button>
          </div>
        </div>
      ) : (
        <Preview backBtn={setPreviewPoll} PollDetails={pollDetail} />
      )}
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

export default CreatePoll;
