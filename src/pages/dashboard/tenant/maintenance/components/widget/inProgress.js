import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import lowerCaseData from "@/utils/lowerCaseData";
import React from "react";

const InProgress = ({ data }) => {
  
  return (
    <div>
      <div>
        <div className="text-[13px] font-[500] text-BlackHomz flex px-8 py-4 bg-walletBg">
          <p className="w-[180px]">Subject</p>
          <p className="w-[180px]">Request Date</p>
          <p className="w-[180px]">Status</p>
        </div>
      </div>
      <div className="">
        {data &&
          data?.map(
            (data) =>
              lowerCaseData(data?.status) === "in-progress" && (
                <div
                  key={data?._id}
                  className={`text-[11px] font-[400] text-GrayHomz flex px-8 py-4 border-b`}
                >
                  <p className="w-[180px]">{data?.subject}</p>
                  <p className="w-[180px]">{changeBackendDateFormat(data?.requestDate)}</p>
                  <p className="w-[180px] ">
                    <span
                      className={`px-3 py-1 rounded-[8px] bg-warning2 text-warningBg`}
                    >
                      In-progress
                    </span>
                  </p>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default InProgress;
