import Image from "next/image";
import React from "react";

const SentInvite = () => {
  return (
    <div className="absolute top-0 z-20 h-full w-full inset-0 px-8 py-10">
      <div className="w-[800px] h-[140px] bg-BlueHomz p-8 flex items-start gap-4 rounded-[12px]">
        <Image
          src={"/static/dashboard/tenant/estateInfo/Frame022.png"}
          alt=""
          height={52}
          width={52}
        />
        <div className="flex flex-col gap-2">
          <p className="text-[20px] font-[500] text-white">Request Sent</p>

          <p className="text-[16px] font-[500] text-white">
            Kindly check back, your request to join Name of Estate has been sent
            to the estate manager. You’ll receive a notification with the status
            of your request shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentInvite;
