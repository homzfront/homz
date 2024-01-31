import Image from "next/image";
import React from "react";

const Accept = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-[340px] w-[580px] border rounded-[12px] flex flex-col items-center p-10 justify-between">
        <Image src={"/Icon.png"} alt="" height={28} width={131} />

        <div className="w-[517px] text-BlackHomz mt-2">
            <p className="text-[23px] font-[700] text-center">User Role Invite</p>
            <p className="mt-1 text-[18px] font-[400] text-center">Company’s Name has invited you to their dashboard as a viewer/editor.</p>
        </div>

        <div className="flex gap-4">
            <button className="h-[48px] w-[160px] rounded-[4px] text-[16px] font-[700] text-white bg-Success hover:bg-successBg">
            Accept Invite
            </button>
            <button className="h-[48px] w-[160px] rounded-[4px] text-[16px] font-[500] text-error border border-error hover:bg-successBg hover:text-white hover:border-none ">
            Decline
            </button>
        </div>
      </div>
    </div>
  );
};

export default Accept;
