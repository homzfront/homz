import Image from "next/image";
import Link from "next/link";
import React from "react";
import StartConversation from "./startConversation/startConversation";

const Notify = () => {
  const Data = [];
  return (
    <div className="w-full px-8 py-4">
      <Link href={"/dashboard/property-owner/dashboard"} className="flex gap-1 text-[14px] font-[400] text-GrayHomz2">
        <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          alt=""
          height={16}
          width={16}
        />
        Go back to dashboard
      </Link>
      {Data.length < 1 ? <div>
        <StartConversation/>
      </div> : <div></div>}
    </div>
  );
};

export default Notify;
