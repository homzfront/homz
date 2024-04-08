"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const PollQuestion = () => {
  const [option, setOption] = useState("");

  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [questions, setQuestion] = useState(true);
  const [responses, setResponses] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);

  const handleQuestions = () => {
    setQuestion(true);
    setResponses(false);
  };
  const handleResponses = () => {
    setQuestion(false);
    setResponses(true);
  };

  const handleUpdate = () => {
    setUpdateClicked(true);
  };
  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };
 
 
  return (
    <div className="">

      <div className=" w-full md:w-full  py-[24px] px-[28px] gap-[32px] md:px-[40px] flex flex-col md:gap-[48px] rounded-[12px] bg-[#060505]">
        <div className="">
          <p className=" text-[23px] pb-1 text-[700] text-[#E6E6E6]">
            New Estate Paint Color
          </p>
          <p className="text-[#D5D5D5] leading-[24px] w-[282px] md:w-[631px] md:pr-8 inline-block  text-[14px]">
            We’re sending out this poll to get every tenant involved in the
            selection of the color to be used in painting the estate.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <p className="text-[14px] text-[400] leading-[21px] order-2 md:order-1 text-[#A9A9A9] md:mt-2 md:w-[576px] w-[271px]">
            ** This is not an anonymous poll, your information will be shared
            with the estate manager.
          </p>
          <div className="md:w-[357px] w-[271px] rounded-[4px] h-[53px] md:h-[55px] py-[8px] md:px-[40px] px-[12px] flex justify-between order-1 md:order-2 bg-[#FFFFFF]">
            <div className="">
              <p className="text-[400] leading-[17px] text-left text-[11px] text-[#559CFF]">
                Poll created
              </p>
              <p className="text-[500] leading-[21]] text-left text-[14px] ">
                9th January, 2024
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
                16th January, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1 md:px-8 md:mt-8 px-2 mb-7 ">
        <div className="">
          <p className="hidden md:block">
            What color of paint should be used on the main gate?{" "}
            <span className="text-red-600">*</span>
          </p>
          <p className="text-[#A9A9A9] text-[13px] text-[400] leading-[20px] hidden md:block">
            You can select one or more options
          </p>
          <div className="flex gap-5 mt-5 pb-3">
            <div className="">
              <div className="md:hidden flex flex-col">
                <div className="flex gap-4 pb-2">
                  <p className="mr-7">Question</p>

                  <Toggle
                    icons={false}
                    className="custom-classname"
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
                    value={pollQuestion}
                    id="pollQuestion"
                    name="pollQuestion"
                    placeholder="Type poll question"
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                </div>
              </div>
              <div className=" w-[323px] flex items-center  md:w-[525px] h-[45px] gap-[14px] mt-3">
            
                <div className="w-full  flex items-center md:w-[493px] h-[45px] proBorders rounded-[4px] px-2">
                  <input
                    type="text"
                    id="option1Qestion"
                    name="option1Qestion"
                    className="w-[95%] h-[42px] border-0"
                    placeholder="Option 1"
                    value={option === "option1" ? option : ""}
                    // onChange={() => {}}
                  />
                </div>
              </div>
              <div className="w-full flex items-center md:w-[525px] h-[45px] gap-[14px] mt-3">
              
                <div className=" w-full flex items-center md:w-[493px] h-[45px] proBorders rounded-[4px] px-2">
                  <input
                    type="text"
                    id="option1Qestion"
                    name="option1Qestion"
                    className=" w-full md:w-[490px] h-[42px] border-0"
                    placeholder="Option 2"
                    value={option === "option2" ? option : ""}
                    // onChange={() => {}}
                  />
                </div>
              </div>
              <div className="w-full flex items-center md:w-[525px] h-[45px] gap-[14px] mt-3">
          
                <div className="w-full flex items-center md:w-[493px] h-[45px] proBorders rounded-[4px] px-2">
                  <input
                    type="text"
                    id="Option3Question"
                    name="Option3Question"
                    className=" w-full md:w-[490px] h-[42px] border-0"
                    placeholder="option 3"
                    value={option === "Option3" ? option : ""}
                    // onChange={() => {}}
                  />
                </div>
              </div>
              <div className="w-full flex items-center md:w-[525px] h-[45px] gap-[14px] mt-3">
           
                <div className="w-full flex items-center md:w-[493px] h-[45px] proBorders rounded-[4px] px-2">
                  <input
                    type="text"
                    id="Option4Question"
                    name="Option4Question"
                    className=" w-full md:w-[490px] h-[42px] border-0"
                    placeholder="option 4"
                    value={option === "Option4" ? option : ""}
                    // onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollQuestion;
