import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import lowerCaseData from "@/utils/lowerCaseData";
import React from "react";

const PendingRequests = ({ data }) => {
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
              lowerCaseData(data?.status) === "pending" && (
                <div
                  key={data?._id}
                  className={`text-[11px] font-[400] text-GrayHomz flex px-8 py-4 border-b`}
                >
                  <p className="w-[180px]">{data?.subject}</p>
                  <p className="w-[180px]">{changeBackendDateFormat(data?.requestDate)}</p>
                  <p className="w-[180px] ">
                    <span
                      className={`px-3 py-1 rounded-[8px] bg-warningBg text-warning2`}
                    >
                      Pending
                    </span>
                  </p>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default PendingRequests;
0.7246210399156316;
