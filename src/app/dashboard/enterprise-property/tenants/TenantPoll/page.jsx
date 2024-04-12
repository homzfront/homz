import React from "react";
import TenantPoll from "./components/tenantPoll";
import PollTable from "./components/PollTable";
import { PollData } from "./components/pollData";

const Poll = () => {
  return (
    <div className="pt-10 md:pt-0 pl-4 md:pl-0 md:px-8">
      <div className="md:hidden mb-7">
        <p className="mb-2 text-[16px]">Tenant Poll</p>
        <p className="hidden md:block text-[#A9A9A9] leading-[17.64px] mb-3 w-[267px] text-[14px]">
          Poll Management feature designed exclusively for property managers.
        </p>
      </div>

      {PollData.length === 0 ? (
        <TenantPoll data={PollData} />
      ) : (
        <PollTable openedData={PollData} />
      )}
    </div>
  );
};

export default Poll;
