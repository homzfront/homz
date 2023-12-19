import Image from "next/image";
import Link from "next/link";
import React from "react";

const ToggleReturn = ({first, second, third, href1, href2, href3}) => {
  return (
    <div className="w-[475px] flex gap-2 items-center">
      <Image
        src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
        alt=""
        height={16}
        width={16}
      />
      <Link href={href1} className="text-[14px] font-[400] text-GrayHomz2">
        {first}
      </Link>
      <Link href={href2} className="text-[16px] font-[400] text-GrayHomz">
        {second}<> </>/
      </Link>
      <div className="text-[20px] font-[500] text-GrayHomz">
        {third}
      </div>
    </div>
  );
};

export default ToggleReturn;
