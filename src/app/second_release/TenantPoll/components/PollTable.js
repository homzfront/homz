import Image from "next/image";
import React, { useState } from "react";

const PollTable = ({ Data }) => {
  const [currentData, setData] = useState(Data || []);
  const [ongoing, setOngoing] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleOngoing = () => {
    setOngoing(true);
    setSubmitted(false);
  };
  const handleSubmitted = () => {
    setOngoing(false);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-[2rem]">
        <div className="flex flex-col justify-between gap-[28px]">
          <div className="flex gap-2 items-center ">
            <p className="font-[500] text-[20px]">Tenant Poll</p>
            <span className="bg-whiteblue w-[30px] h-[30px] flex justify-center items-center rounded-[8px]">
              <span className="text-BlueHomz text-[18px] font-[400]">
                {currentData.length}
              </span>
            </span>
          </div>

          <div className="flex gap-3">
            <button className={`adminBord items-center w-[119px] h-[37px] text-[14px] font-[500] flex ${ongoing && 'bg-[#006AFF] text-white'} text-[#4E4E4E] px-[12px] py-[8px] rounded-[4px] cursor-pointer gap-[8px]`}
            onClick={handleOngoing}>
              Ongoing
              <span className={`w-[27px] h-[21px] py-[2px] px-[10px] rounded-[16px] ${ongoing && ' bg-white '} text-[#4E4E4E] bg-[#EEF5FF]`}>
                {currentData.length}
              </span>
            </button>
         

            <button className={`items-center text-[14px] font-[500] flex rounded-[4px] text-[#4E4E4E] px-[12px] py-[8px] cursor-pointer gap-[8px] ${submitted && 'bg-[#006AFF] text-white'}`} onClick={handleSubmitted}>
              Submitted Vote(s)
              <span className={`${submitted && 'bg-white text-[#4E4E4E]'} bg-[#EEF5FF] w-[27px] h-[21px] py-[2px] px-[10px] rounded-[16px]`}>
                {currentData.length}
              </span>
            </button>
          </div>
        </div>

        <main className="">
          <table className="border w-full">
            <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px]">
              <tr>
                <th className="w-[277px] h-[48px] px-[16px] py-[14px]">
                  Poll Title
                </th>

                <th className="w-[123.11px] h-[48px] px-[8px] py-[14px]">
                  Date Created
                </th>

                <th className="w-[100.89px] h-[48px] px-[16px] py-[14px]">
                  End Date
                </th>
                <th className="w-[100.89px] h-[48px] px-[16px] py-[14px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {currentData.map((data, index) => (
                <tr key={index} className="pl-3">
                  <td
                    className=" text-GrayHomz4 font-[500] text-[11px]  md:w-[277px] py-[12px] px-[16px] h-[64px]"
                    // onClick={() => handleRowClick(data)}
                  >
                    <span className="text-[12px]">{data.Poll_Title}</span>
                  </td>
                  <td
                    className={`text-GrayHomz font-[500] text-[12px] break-words  md:w-[277px] py-[12px] px-[16px] h-[64px]`}
                    // onClick={() => handleRowClick(data)}
                  >
                    {data.DateCreated}
                  </td>
                  <td
                    className={`text-GrayHomz font-[500] text-[12px]  md:w-[277px] py-[12px] pl-[16px] pr-[12px] h-[64px]`}
                    // onClick={() => handleRowClick(data)}
                  >
                    {data.EndDate}
                  </td>
                  <td
                    className={`text-GrayHomz font-[500] text-[12px]  md:w-[277px] py-[12px] pl-[16px] pr-[12px] h-[64px]`}
                    // onClick={() => handleRowClick(data)}
                  >
                    <button className="w-[56px] h-[37px] py-[8px] px-[12px] rounded-[4px] adminBorders text-[#006AFF] text-[14px] leading-[21px] cursor-pointer">
                      {data.Action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default PollTable;
