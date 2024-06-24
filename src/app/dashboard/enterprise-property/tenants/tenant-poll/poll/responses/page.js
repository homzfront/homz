"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import PollVotesBar from './components/pollVotesBar';
import {Votes} from './components/pollVoteData';

const images = [
  "/static/images/OwnerImagesOne.png",
  "/static/images/OwnerImagesThree.png",
  "/static/images/OwnerImagesTwo.png",
  "/static/images/papaDrinking.png",
];
const Responses = () => {
  const [option, setOption] = useState("");

  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [questions, setQuestion] = useState(true);




  return (
    <div className="pt-5 md:pt-0 px-3">
      <div className="response pt-8">
        <p className="hidden md:block leading-[24px] text-[400]">
          What color of paint should be used on the main gate?{" "}
          <span className="text-red-600">*</span>
        </p>
        <PollVotesBar PollVotes={Votes}/>
      </div>
    </div>
  );
};

export default Responses;
