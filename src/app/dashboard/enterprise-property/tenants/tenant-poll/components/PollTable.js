"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Link from "next/link";

const PollTable = ({ openedData, closed_Data }) => {
  const [currentData, setData] = useState(openedData || []);
  const [closedData, setClosedData] = useState(closed_Data || []);
  const [ongoing, setOngoing] = useState(true);
  const [closed, setClosed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pollInfo, setPollInfo] = useState([]);

  const openModal = (data) => {
    setModalIsOpen(true);
    setPollInfo(data);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOngoing = () => {
    setData(openedData);
    setOngoing(true);
    setClosed(false);
  };
  const handleClosedVotes = () => {
    setData(closedData);
    setOngoing(false);
    setClosed(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-[2rem] mt-3">
        <div className="flex flex-col justify-between gap-[28px]">
          <div className="hidden md:flex gap-2 items-center justify-between">
            <p className="font-[500] text-[20px] hidden md:block">
              Tenant Poll
            </p>
            <div>
              <Link
                href="/dashboard/enterprise-property/tenants/tenant-poll/poll"
                className="adminBord items-center py-[8px] text-[14px] font-[500] flex bg-[#006AFF] text-white px-[10px] p-1 rounded cursor-pointer gap-2 mt-2"
              >
                <span>
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    height={12}
                    width={16}
                  />
                </span>
                Create New Poll
              </Link>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className={`adminBord items-center w-[119px] h-[37px] text-[14px] font-[500] flex ${ongoing
                ? "bg-[#006AFF] text-white"
                : "text-[#4E4E4E] bg-[#EEF5FF] md:bg-inherit"
                } px-[12px] py-[8px] rounded-[4px] cursor-pointer gap-[8px]`}
              onClick={handleOngoing}
            >
              Ongoing
              <span
                className={`w-[27px] h-[21px] text-center  rounded-[16px] ${ongoing
                  ? " text-[#4E4E4E] bg-[#EEF5FF]"
                  : "text-white bg-[#006AFF] md:bg-[#EEF5FF] md:text-[#4E4E4E]"
                  }`}
              >
                {openedData.length}
              </span>
            </button>
            {/* </div>
          <div className="flex items-center gap-2"> */}

            <button
              className={`items-center text-[14px] font-[500] flex rounded-[4px]  px-[12px] py-[8px] cursor-pointer gap-[8px] ${closed
                ? "bg-[#006AFF] text-white"
                : "text-[#4E4E4E] bg-[#EEF5FF] md:bg-inherit"
                }`}
              onClick={handleClosedVotes}
            >
              Closed
            </button>
          </div>
        </div>

        <main className="">
          <table className="border w-full">
            <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px]">
              <tr>
                <th className="w-[152px] md:w-[221.6px] h-[48px] px-[12px] md:px-[16px] py-[14px] text-left">
                  Poll Title
                </th>

                <th className="hidden md:table-cell w-[221.6px] h-[48px] px-[16px] py-[14px]">
                  Date Created
                </th>

                <th className="hidden md:table-cell w-[221.6px] h-[48px] px-[16px] py-[14px]">
                  End Date
                </th>

                <th className="w-[91.5px] md:w-[221.6px] h-[48px] px-0 md:px-[16px] py-[14px]">
                  Responses
                </th>

                <th className="w-[91.5px] md:w-[221.6px] h-[48px] px-[12px] md:px-[16px] py-[14px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((data, index) => (
                <tr key={index} className="pl-3">
                  <td
                    className=" w-[152px] pl-2 text-GrayHomz4 font-[500] text-[11px]  md:w-[221.6px] md:py-[12px] md:px-[16px] h-[64px]"
                  // onClick={() => handleRowClick(data)}
                  >
                    <span className="hidden md:block text-[12px]">
                      {data.Poll_Title}
                    </span>
                    <button
                      className="md:hidden text-[12px] underline underline-offset-4"
                      onClick={() => openModal(data)}
                    >
                      {data.Poll_Title}
                    </button>
                  </td>
                  <td
                    className="hidden md:table-cell text-GrayHomz4 font-[500] text-[11px]  md:w-[221.6px] py-[12px] px-[16px] h-[64px]"
                  // onClick={() => handleRowClick(data)}
                  >
                    {data.DateCreated}
                  </td>
                  <td
                    className="hidden md:table-cell text-GrayHomz4 font-[500] text-[11px]  md:w-[221.6px] py-[12px] px-[16px] h-[64px]"
                  // onClick={() => handleRowClick(data)}
                  >
                    {data.EndDate}
                  </td>

                  <td
                    className="w-[91.5px] text-GrayHomz4 font-[500] text-[11px]  md:w-[221.6px] py-[12px] px-[16px] h-[64px]"
                  // onClick={() => handleRowClick(data)}
                  >
                    {data.Responses}
                  </td>
                  <td
                    className="w-[91.5px] text-GrayHomz4 font-[500] text-[11px]  md:w-[221.6px] py-[12px] px-[16px] h-[64px]"

                  // onClick={() => handleRowClick(data)}
                  >
                    <Link
                      href="/dashboard/enterprise-property/tenants/tenant-poll/poll/poll-questions"
                      className=" py-[8px]  rounded-[4px] text-[#006AFF] text-[14px] leading-[21px] cursor-pointer"
                    >
                      {data.Action}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <CustomizedModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="w-[345px] bg-white adminCellBorders flex flex-col py-[32px] px-[14px] rounded-[12px] gap-[14px]">
          <div className=" flex items-center justify-between">
            <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Poll Information
            </p>

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

          <div className="w-[313px] px-[13px] py-[16px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] w-[71px]">
                Poll Title
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {pollInfo.Poll_Title}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                Date Created
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {pollInfo.DateCreated}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] w-[71px]">
                End Date
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {pollInfo.EndDate}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500] w-[71px]">
                Responses
              </p>
              <p className="text-[14px] leading-[21px] font-[500] text-left w-[118px]">
                {pollInfo.Responses}
              </p>
            </div>
          </div>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default PollTable;
