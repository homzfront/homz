"use client";
import React, { useEffect, useState } from "react";
import InProgress from "./inProgress";
import PendingRequests from "./pendingRequests";
import Resolved from "./resolved";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import lowerCaseData from "@/utils/lowerCaseData";

const All = ({ data = null || [] }) => {
  // Ensure that Data is defined and not null
  if (!data) {
    return []; // or handle accordingly, e.g., return a loading state
  }

  return (
    <div>
      <div className="">
        <div>
          <div className="text-[13px] font-[500] text-BlackHomz flex px-8 py-4 bg-walletBg">
            <p className="w-[30%] md:w-[180px]">Subject</p>
            <p className="w-[30%] md:w-[180px]">Request Date</p>
            <p className="w-[40%] md:w-[180px]">Status</p>
          </div>
        </div>
        <div>
          {data &&
            data?.map((data) => (
              <div
                key={data?._id}
                className={`text-[11px] font-[400] text-GrayHomz flex px-8 py-4 border-b`}
              >
                <p className="w-[30%] md:w-[180px]">{data?.subject}</p>
                <p className="w-[30%] md:w-[180px]">{changeBackendDateFormat(data?.requestDate)}</p>
                <p className="w-[40%] md:w-[180px]">
                  <span
                    className={`px-3 py-1 rounded-[8px] ${
                      lowerCaseData(data?.status) === "resolved" ? "w-full bg-successBg text-Success" : ""
                    } ${
                      lowerCaseData(data?.status) === "pending" ? "w-full bg-warningBg text-warning2" : ""
                    } ${
                    lowerCaseData(data?.status) === "in-progress" ? "w-full bg-warning2 text-warningBg" : ""
                    }`}
                    
                  >
                    {lowerCaseData(data?.status) === "resolved" ? "Resolved" : ""}

                    {lowerCaseData(data?.status) === "pending" ? "Pending" : ""}
                    {lowerCaseData(data?.status) === "in-progress"
                      ? "In-progress"
                      : ""}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default All;
