"use client";
import React, { useEffect, useState } from "react";
import InProgress from "./inProgress";
import PendingRequests from "./pendingRequests";
import Resolved from "./resolved";

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
            <p className="w-[180px]">Subject</p>
            <p className="w-[180px]">Request Date</p>
            <p className="w-[180px]">Status</p>
          </div>
        </div>
        <div>
          {data.map((data) => (
            <div
              key={data.id}
              className={`text-[11px] font-[400] text-GrayHomz flex px-8 py-4 border-b`}
            >
              <p className="w-[180px]">{data.subject}</p>
              <p className="w-[180px]">{data.requestDate}</p>
              <p className="w-[180px]">
                <span
                  className={`px-3 py-1 rounded-[8px] ${
                    data.id > 0.8 ? "bg-successBg text-Success " : ""
                  } ${
                    data.id === 0.7246210399156316 ? "bg-warningBg text-warning2 " : ""
                  } ${
                    data.id === 0.003339754343843593 ? "bg-warning2 text-warningBg" : ""
                  }`}
                >
                  {`${data.id > 0.8 ? "Resolved" : ""}`}
                  {`${data.id === 0.7246210399156316 ? "Pending" : ""}`}
                  {`${data.id === 0.003339754343843593 ? "In-progress" : ""}`}
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
