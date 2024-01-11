import React from "react";

const InviteLink = ({openLink}) => {
  return (
    <div className="p-8 mt-4 flex flex-col gap-3">
      <p className="text-[20px] font-[500] text-BlueHomz">
        Have an Invite Link?
      </p>
      <p className="mt-2 text-[18px] font-[400] text-GrayHomz">
        Paste in your invite link to join estate
      </p>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter invite link"
          className="placeholder:text-GrayHomz2 w-[524px] h-[45px] border pl-4 rounded-[4px]"
        />
        <button onClick={openLink} className="bg-BlueHomz text-white h-[48px] w-[108px] rounded-[4px]">  
        Join Estate
        </button>
      </div>
    </div>
  );
};

export default InviteLink;
