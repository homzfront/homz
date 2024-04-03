"use client";
import React, { useState } from "react";
import PollQuestion from "./components/question";
import Responses from "./components/responses";
import Link from "next/link";
import Image from "next/image";
import { Votes } from "./components/pollVoteData";


const PollQuestionResponse = () => {
  const [questions, setQuestion] = useState(true);
  const [responses, setResponses] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);

  const totalVotes = Votes.reduce((accumulator, currentPoll) => {
    return accumulator + currentPoll.votes.length;
  }, 0);

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
    <div className="pt-5 md:pt-0 pl-4">
      <div className="hidden md:flex flex-col gap-6  pb-2">
        <Link href="/second_release/Tenants/TenantPoll">
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
      </div>
      <div className="inline-flex items-center md:hidden space-x-20 md:space-x-0   md:mb-0 w-full">
        <Link
          href="/second_release/Tenants/TenantPoll"
          className="bg-[#EEF5FF] rounded-[8px] p-[4px]"
        >
          <Image
            src={"/static/images/Button.svg"}
            alt=""
            height={22}
            width={22}
          />
        </Link>
        <p className=" md:text-[20px] text-[700] my-5">Update Poll</p>
      </div>
      <nav className="flex justify-between my-5 pl-1  md:pr-0 ">
        <div className="flex gap-3">
          <button
            className={`adminBord items-center md:w-[119px] h-[37px] text-[14px] font-[500] flex ${
              questions ? "bg-[#006AFF] text-white"
                  : "text-[#4E4E4E] bg-[#EEF5FF] md:bg-inherit"
            } px-[12px] py-[8px] rounded-[4px] cursor-pointer gap-[8px]`}
            onClick={handleQuestions}
          >
            Questions
          </button>

          <button
            className={`items-center text-[12px] px-2 md:text-[14px] font-[500] flex rounded-[4px] text-[#4E4E4E] md:px-[12px] py-[8px] cursor-pointer gap-[8px] ${
              responses   ? "bg-[#006AFF] text-white"
                  : "text-[#4E4E4E] bg-[#EEF5FF] md:bg-inherit"
            }`}
            onClick={handleResponses}
          >
            Responses
            <span
              className={`${
                responses ? "bg-white text-[#4E4E4E]" : "bg-[#006AFF] text-white"
              } w-[27px] h-[21px] text-center py-[1.5px] rounded-[16px]`}
            >
              {totalVotes}
            </span>
          </button>
        </div>
        <Link
          href="/second_release/Poll/UpdatePoll"
          className="updateBorder border-blue-600 flex gap-1 items-center py-[8px] px-[12px] rounded-[4px]"
          onClick={handleUpdate}
        >
          <Image
            src={"/static/images/edit-2.svg"}
            alt=""
            height={16}
            width={16}
          />
          <span className="hidden md:block text-blue-600">Update</span>
        </Link>
      </nav>

      {questions ? <PollQuestion /> : <Responses Votes={Votes} />}
    </div>
  );
};

export default PollQuestionResponse;
