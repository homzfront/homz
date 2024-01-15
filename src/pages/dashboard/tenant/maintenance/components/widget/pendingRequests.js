import React from "react";

const PendingRequests = ({ data }) => {
  console.log(data);
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
        {data?.map((data) => (
          <div
            key={data.id}
            className={`text-[11px] font-[400] text-GrayHomz px-8 py-4 border-b ${data.id === 0.7246210399156316 ? "flex" : "hidden"}`}
          >
            <p className="w-[180px]">{data.subject}</p>
            <p className="w-[180px]">{data.requestDate}</p>
            <p className="w-[180px] ">
              {" "}
              <span
                className={`px-3 py-1 rounded-[8px] bg-warningBg text-warning2`}
              >Pending</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequests;
0.7246210399156316;
