import Image from "next/image";
import Link from "next/link";
import React from "react";

const ConfirmEstateListing = ({ header, body, button, returnHome }) => {
  return (
    <div className="absolute px-8 md:px-0 top-0 z-40 h-screen w-full  inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="md:max-w-[464px] m-auto bg-white md:h-[240px] rounded-md">
        <div className="md:w-[464px] flex flex-col justify-around p-8 items-center gap-3">
          <Image
            src={
              "/static/dashboard/enterprisemanager/dashboard/Featured-icon.png"
            }
            alt=""
            height={48}
            width={48}
          />
          <h1 className="text-BlackHomz font-[700] text-center text-[18px] md:text-[20px]">{header}</h1>
          <p className="text-[14px] md:text-[16px] font-[400] text-GrayHomz text-center">{body}</p>
          <Link href={"/dashboard/enterprise-property/estates"}
            onClick={returnHome}
            className="h-[48px] items-center flex justify-center rounded-md w-full bg-BlueHomz text-white text-[14px] md:text-[16px] font-[700]"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEstateListing;
