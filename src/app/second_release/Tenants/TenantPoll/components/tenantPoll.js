import Image from "next/image";
import React from "react";
import Link from 'next/link';
const TenantPoll = () => {
  return (
    <div className="flex flex-col space-y-7 pt-8">
      <>
        <div className="hidden md:block pl-2">
          <p className="mb-2 text-[20px]">Tenant Poll</p>
          <p className="text-[#4E4E4E] leading-[27px] mb-3">
            Poll Management feature designed exclusively for property managers.
          </p>
        </div>
        <div className="flex flex-col   w-[376px] md:w-full">
          <div className="flex flex-col md:items-center md:justify-center md:h-[412px] space-y-6">
            <Image
              src="/static/images/Tenant_Poll.svg"
              alt=""
              height={100}
              width={100}
              className="rounded-[8px] mx-auto"
            />
            <p className="text-[23px] md:text-[36px] text-[700] leading-[28.98px] md:leading-[45px] text-[#006AFF] mx-auto">
              Get Started
            </p>
            <p className="text-[#4E4E4E] leading-[27px] mb-3 w-[338px] md:w-full text-center">
            Easily create, customize, and manage polls to gather valuable insights from your tenants.
            </p>
            <Link href="/second_release/Poll" className="w-[338px] md:w-[122px] h-[48px] md:p-[12px] text-center rounded-[4px] text-white bg-[#006AFF]">Create Poll</Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default TenantPoll;
