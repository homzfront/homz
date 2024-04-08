"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import CustomizeModal from "../../components/CustomizedModal";

const Preview = ({ backBtn, PollDetails }) => {
  // console.log(PollDetails);
  const [option, setOption] = useState("");
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };
  const openModal = () => {
    setSaveModalIsOpen(true);
  };
  const handleSaved = () => {
    setSuccessModalIsOpen(true);
    setSaveModalIsOpen(false);
  };

  const closeModal = () => {
    setSaveModalIsOpen(false);
    setSuccessModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setEndDate(null);
    setPollTitle("");
    setStartDate(null);
    setPollQuestion("");
    setPollDescription("");
    setOption(null);
    setSuccessModalIsOpen(false);
  };
  return (
    <div className="px-3">
      <div className="hidden md:flex flex-col gap-6  pb-2">
        {/* <Link href="/second_release/Poll"> */}
        <button
          className="flex items-center gap-2"
          onClick={() => backBtn(false)}
        >
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
        {/* </Link> */}
        <p className=" md:text-[20px] text-[700]">Poll Preview</p>
      </div>
      <div className="inline-flex items-center md:hidden space-x-20 md:space-x-0  mb-9 md:mb-0 w-full">
        <button
          // href="/second_release/Poll"
          className="bg-[#EEF5FF] rounded-[8px] p-[4px]"
          onClick={() => backBtn(false)}
        >
          <Image
            src={"/static/images/Button.svg"}
            alt=""
            height={22}
            width={22}
          />
        </button>
        <p className=" md:text-[20px] text-[700]">Poll Preview</p>
      </div>

      <div className=" w-[335px] md:w-full  py-[24px] px-[32px] gap-[32px] md:px-[40px] flex flex-col md:gap-[48px] rounded-[12px] bg-[#060505]">
        <div className="">
          <p className=" text-[23px] pb-1 text-[700] text-[#E6E6E6]">
            {PollDetails && PollDetails[0].title}
          </p>
          <p className="text-[#D5D5D5] leading-[24px] w-[282px] md:w-[631px] md:pr-8 inline-block  text-[14px]">
            We’re sending out this poll to get every tenant involved in the
            selection of the color to be used in painting the estate.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <p className="text-[14px] text-[400] leading-[21px] order-2 md:order-1 text-[#A9A9A9] md:mt-2 md:w-[576px] w-[271px]">
            {PollDetails && !PollDetails[0].anonymous_Voter && (
              <span>
                ** This is not an anonymous poll, your information will be
                shared with the estate manager.
              </span>
            )}
          </p>
          <div className="md:w-[327px] w-[271px] rounded-[4px] h-[53px] md:h-[55px] py-[8px] md:px-[40px] px-[12px] flex justify-between order-1 md:order-2 bg-[#FFFFFF]">
            <div className="">
              <p className="text-[400] leading-[17px] text-left text-[11px] text-[#559CFF]">
                Poll created
              </p>
              <p className="text-[500] leading-[21]] text-left text-[14px] ">
                {PollDetails && PollDetails[0].start_date}
              </p>
            </div>
            <hr
              style={{
                width: "1.5px",
                height: "100%",
                borderWidth: "0",
                background: "rgba(128, 128, 128, 1)", // Adjust the opacity here (0.5 for 50% opacity)
              }}
            />
            <div className="">
              <p className="text-[400] leading-[17px] text-left text-[11px] text-[#E6736A]">
                Poll ends
              </p>
              <p className="text-[500] leading-[21px] text-left text-[14px] ">
                {PollDetails && PollDetails[0].end_date}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 md:px-7 md:mt-8 px-2 ">
        <div className="">
          <p className="hidden md:block">
            {PollDetails && PollDetails[0].title}
            <span className="text-red-600"> *</span>
          </p>

          <div className="flex gap-5 mt-5 pb-3">
            <div className="">
              <div className="md:hidden flex flex-col">
                <div className="flex gap-4 pb-2">
                  <p className="mr-7">Question</p>

                  <Toggle
                    icons={false}
                    className="custom-classname"
                    checked={PollDetails && PollDetails[0].multiple_Options}
                    // onChange={handleTofuChange}
                  />
                  <p className="text-[#4E4E4E] text-[14px]">
                    Allow multiple answers
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full md:w-[525px]  h-[45px] text-BlackHomz adminCellBorders p-[12px] rounded-[4px]"
                    value={PollDetails && PollDetails[0].poll_question}
                    id="pollQuestion"
                    name="pollQuestion"
                    placeholder="Type poll question"
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>
              </div>
              <div className=" w-[323px] flex flex-col   md:w-[525px]  gap-[14px] mt-3">
                {PollDetails && Object.values(PollDetails[0].options).map((option, index) => (
                 option !== ""
                 &&
                  <input
                    key={index}
                    type="text"
                    id={`option${index + 1}Question`}
                    name={`option${index + 1}Question`}
                    className="w-full  flex  md:w-[493px] h-[45px] proBorders rounded-[4px] px-2"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                  />
                 
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`w-full float-end
                    md:w-[120px] h-[48px] ${
                      //   isSaveButtonDisabled()
                      //     ? " bg-GrayHomz2 text-BlackHomz opacity-40"
                      "bg-BlueHomz text-white"
                    } rounded-[4px] md:mt-14 text-center my-7 ml-2 md:ml-0`}
        onClick={openModal}
        //   disabled={isSaveButtonDisabled()}
      >
        Publish Poll
      </button>
      <CustomizeModal isOpen={saveModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Publish Poll?
            </p>

            <p className=" text-[14px] text-[#4E4E4E] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Proceed with publishing poll?
            </p>
          </div>
          <div className="flex  md:flex-col gap-2">
            <button
              className="bg-BlueHomz2 w-[137.5px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
              onClick={handleSaved}
            >
              Yes
            </button>
            <button
              className="border-BlueHomz w-[137.5px]  text-blue-600 rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
              onClick={() => {
                setSaveModalIsOpen(false);
              }}
            >
              No, go back
            </button>
          </div>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <div className="mb-2">
              <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center mb-1">
                Poll Published Successfully
              </p>

              <p className=" text-[14px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center text-[#4E4E4E]">
                Tenants can now view and respond to your poll
              </p>
            </div>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
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

export default Preview;
