"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Maintenance = () => {
  const Data = [
    {
      id: 1,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "In-progress",
    },
    {
      id: 2,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "Pending",
    },
    {
      id: 3,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
    {
      id: 4,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
    {
      id: 5,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "In-progress",
    },
    {
      id: 6,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "Pending",
    },
    {
      id: 7,
      RequestDate: "4th January, 2024",
      Subject: "Cracked Window",
      Status: "Resolved",
    },
  ];

  const [data, setData] = useState(Data || []);
  return (
    <div className="rounded-[12px] border w-[616px] h-[315px] overflow-auto scrollbar-container ">
      <div className="flex justify-between items-center px-6 p-5">
        <div className=" flex gap-4 items-center">
          <p className="font-[500] text-[14px]">Maintenance Request</p>
          <div className="bg-inputBg py-1 px-2 flex items-center justify-center">
            <p className="text-[14px] font-[500] text-GrayHomz">
              {3}
            </p>
          </div>
        </div>

        <p className="text-[13px] font-[400] text-BlueHomz">
          Request for maintenance
        </p>
      </div>
      <div className="h-[228px]">
        <table className="w-full  h-full">
          <thead className="">
            <tr className="bg-inputBg h-[30px] text-[13px] font-[500] text-BlackHomz">
              <th className="text-left pl-6">Subject</th>
              <th className="text-left ">Request Date</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {Data.splice(0, 3).map((data) => (
              <tr key={data.id} className=" border-t-[1px] items-center">
                <td className="pr-2  pl-6 text-GrayHomz font-[500] text-[11px]">
                  <span className="py-[15px]">{data.Subject}</span>
                </td>
                <td className="text-GrayHomz py-[15px] pr-2 font-[500] text-[11px]">
                  {data.RequestDate}
                </td>
                <td
                  className={`text-GrayHomz py-[15px] pr-6 font-[500]  text-[11px] `}
                >
                  <span
                    className={`p-[6px] rounded-lg text-center ${
                      data.Status === "Pending"
                        ? "bg-warningBg text-warning2 px-[18px]"
                        : ""
                    } ${
                      data.Status === "Resolved"
                        ? "bg-successBg text-Success px-4"
                        : ""
                    } ${
                      data.Status === "In-progress"
                        ? "bg-warning2  text-warningBg px-[10px]"
                        : ""
                    }`}
                  >
                    {data.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maintenance;
