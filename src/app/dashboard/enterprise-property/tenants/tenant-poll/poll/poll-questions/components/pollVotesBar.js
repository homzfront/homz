"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomizeModal from "@/components/mainmenu/CustomizedModal";

const PollVotesBar = ({ PollVotes }) => {
  const [poll, setPollVotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [voterDetails, setVotersDetails] = useState([]);

  const openDetailsMobileModal = (data) => {
    setDetailsModalIsOpen(true);
    setVotersDetails(data);
  };
  const closeDetailsMobileModal = () => {
    setDetailsModalIsOpen(false);
  };

  const openModal = (data) => {
    setPollVotes(data);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {PollVotes.map((pollVotes, index) => (
        <div
          className="flex flex-col md:flex-row gap-[12px] md:items-center relative md:pb-2"
          key={index}
        >
          <div className="flex flex-col gap-2 md:pb-2">
            <label htmlFor={pollVotes.poll_title}>{pollVotes.poll_title}</label>
            <progress
              id="option1"
              value={pollVotes.votes.length * 10}
              max="100"
              className="w-[335px] md:w-[493px] rounded-[12px] text-BlueHomz"
            />
          </div>
          <div className="flex w-[335px] justify-between items-center md:justify-normal md:w-full pb-5 md:pb-0 pr-1 md:pr-0">
            <div className="flex flex-row  md:flex-col md:pb-3 md:pr-14">
              <p className="text-[#4E4E4E] text-[14px] leading-[21px] text-[500] pl-1  w-[150px]">
                {pollVotes.votes.length} <span>Votes</span>
              </p>

              <div className="relative flex flex-col md:items-center md:justify-center  md:h-[40px] w-full">
                {pollVotes.votes.slice(0, 4).map((vote, index) => (
                  <Image
                    key={index}
                    height={34}
                    width={34}
                    src={vote.image_url}
                    alt=""
                    className="absolute left-0 resImages"
                    style={{
                      borderRadius: "200px",
                      zIndex: pollVotes.votes.length + index,
                      marginLeft: `${index * 18}px`,
                      opacity: 1 + index * 0.1, // Adjust the opacity of each image
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              className="text-[14px] text-[500] leading-[16.5px] text-[#006AFF] ml-4 md:ml-0 pt-2 "
              onClick={(e) => openModal(pollVotes)}
            >
              View Poll
            </button>
          </div>
        </div>
      ))}

      <CustomizeModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col w-[350px] h-[490px] md:w-[816px] md:h-[581px]  bg-white rounded-[12px] p-[28px] space-y-7">
          <div className=" flex items-center justify-between">
            <div className=" flex gap-[24px]">
              <div className="flex gap-3 items-center">
                <p className="text-[#202020] text-[20px] leading-[30px] font-[700] ">
                  {poll.poll_title}
                </p>
                <span className="bg-whiteblue text-[18px] text-BlueHomz font-[400] text px-[10px] py-[2px] h-[25px] flex justify-center items-center rounded-[16px]">
                  {poll.votes && poll.votes.length} votes
                </span>
              </div>
            </div>
            <div>
              <button onClick={closeModal} className="cursor-pointer md:mb-2">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <div className="mt-4 h-[591px] overflow-y-auto">
            <table className="border w-full rounded-t-lg px-2 md:px-0">
              <thead className="bg-whiteblue h-[48px] text-[13px] font-semibold text-black rounded-t-lg">
                <tr>
                  <th className="w-[142.5px] md:w-[224.08px] py-[14px] px-[16px] h-[48px] md:py-[14px]  md:px-[18px] text-left">
                    Tenant
                  </th>

                  <th className="hidden md:table-cell w-[120.71px] h-[48px] py-[14px] text-left">
                    Apartment No
                  </th>
                  <th className="hidden md:table-cell w-[109.71px] h-[48px] py-[14px] px-[16px] text-left">
                    Vote Date
                  </th>

                  <th className="table-cell w-[142.5px]  h-[48px] py-[14px] px-[16px] md:px-[8px] text-left md:w-[40px]">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {poll.votes &&
                  poll.votes.map((vote, index) => (
                    <tr key={index} className="border-b py-0 px-[8px] h-[64px]">
                      <td className=" w-[142.5px]  py-[14px] px-[16px] h-[48px] md:py-[12px] md:px-[18px] text-left text-[12px] text-[#101828]-500">
                        <div className="flex gap-[12px] items-center">
                          <Image
                            src={vote.image_url}
                            alt=""
                            width={32}
                            height={32}
                            className="hidden md:block rounded-[100%]"
                          />
                          <span className="pb-1 hidden md:block text-[#101828]">
                            {vote.voter_name}
                          </span>
                          <span
                            className="pb-1 md:hidden underline underline-offset-4 text-[#101828]"
                            onClick={() => openDetailsMobileModal(vote)}
                          >
                            {vote.voter_name}
                          </span>
                        </div>
                      </td>

                      <td className="hidden md:table-cell w-[101.83px] h-[64px] text-xs text-[#D5D5D5]-500 py-0 px-[12px] text-left text-[12px]">
                        {vote.apartment_no}
                      </td>
                      <td className="hidden md:table-cell w-[101.83px] h-[64px]  text-[#D5D5D5]-700 py-[12px] px-[8px] text-left text-[12px]">
                        {vote.vote_date}
                      </td>
                      <td className="table-cell w-[142.5px]  h-[48px] py-[14px] px-[16px] md:px-[8px] text-left text-[12px] text-[500]">
                        {vote.time_of_vote}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={detailsModalIsOpen}
        onRequestClose={closeDetailsMobileModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[360px]  py-[24px] px-[16px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Tenant Information
            </p>
            <div>
              <button
                onClick={closeDetailsMobileModal}
                className="cursor-pointer"
              >
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="w-[313px] px-[13px] py-[16px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] ">
                Tenant’s Name
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {voterDetails.voter_name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                Apartment Number
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {voterDetails.apartment_no}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] w-[71px]">
                Vote Date
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {voterDetails.vote_date}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] w-[71px]">
                Vote Time
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {voterDetails.time_of_vote}
              </p>
            </div>
          </div>
        </div>
      </CustomizeModal>
    </div>
  );
};

export default PollVotesBar;
