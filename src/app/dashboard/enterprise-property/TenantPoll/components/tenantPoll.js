import Image from "next/image";
import React from "react";

const TenantPoll = () => {
  return (
    <div className="flex flex-col space-y-7 pt-8">
      <>
        <div className="">
          <p className="mb-2 text-[20px]">Tenant Poll</p>
          <p className="text-[#4E4E4E] leading-[27px] mb-3">
            Actively participate in shaping your estate
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
            <Image
              src="/static/images/Tenant_Poll.svg"
              alt=""
              height={100}
              width={100}
              className="rounded-[8px]"
            />
            <p className="text-[#4E4E4E] leading-[27px] mb-3">
              All active polls will be visible here for you to participate in
            </p>
          </div>
        </div>
      </>
    </div>
  );
};

export default TenantPoll;
