"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import PollVotesBar from "./pollVotesBar";

const Responses = ({Votes}) => {
  const [questions, setQuestion] = useState(true);
  const [responses, setResponses] = useState(false);
  

  const handleQuestions = () => {
    setQuestion(true);
    setResponses(false);
  };
  const handleResponses = () => {
    setQuestion(false);
    setResponses(true);
  };

  return (
    <div className="pt-5 md:pt-0 ">
      <div className="response pt-8">
        <p className=" w-[330px]  leading-[24px] text-[400]">
          What color of paint should be used on the main gate?{" "}
          <span className="text-red-600">*</span>
        </p>
        <div className="mt-4">
          <div className="flex gap-[8px]">
            <PollVotesBar PollVotes={Votes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Responses;
