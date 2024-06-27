import React from "react";

const TipsFrame = () => {
  return (
    <div className="my-4 bg-[#EEF5FF] py-[16px] px-[24px] gap-[12px] border border-BlueHomz rounded-[8px]">
      <p className="text-BlueHomz2 mb-2">Safety Tips</p>

      <ol className="list-decimal pl-4 text-[#202020]  font-[400] sm:text-[16px] text-[14px]">
        <li>
          Do not pay deposits or fees before viewing the property and confirming
          its legitimacy
        </li>
        <li>
          The Agent does not represent Homz.ng and Homz.ng is not liable for any
          monetary transaction between you and the Agent.
        </li>
        <li>
          When making payments, use secure and traceable methods like bank
          transfers or escrow services rather than cash payments.
        </li>
        <li>
          Schedule viewings during daylight hours to get a clear view of the
          property and neighborhood.
        </li>
      </ol>
    </div>
  );
};

export default TipsFrame;
