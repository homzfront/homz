"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import VisitorRecords from "./component/records";
import { VisitorData } from "./component/VisitorData.js";
import Link from "next/link";

const AccessRecords = ({ params }) => {
  const [data, setData] = useState(VisitorData || {});
  // console.log(params.search);

  return (
    <div className=" pt-9 flex flex-col space-y-7 px-2 md:px-0 md:pt-3">
      <div className="flex items-center md:items-start space-x-10 md:hidden pl-2">
      <Link href="/second_release/Tenants/ManageTenants" className="bg-[#EEF5FF] rounded-[8px] p-[4px] md:hidden">
              <Image
                src={"/static/images/Button.svg"}
                alt=""
                height={22}
                width={22}
              />
            </Link>
        <p className=" md:text-[20px] text-[700]">Visitor Access Request</p>
      </div>
      {data.length > 0 ? (
        <>
          <VisitorRecords Data={data} searchValue={params.search} />
        </>
      ) : (
        <>
          <div className="">
            <p className="mb-2 text-[20px]">Visitor Access Request</p>
            <p className="text-[#4E4E4E] leading-[27px] mb-3">
              Visitor records of all your tenants will be displayed here
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
              <Image
                src="/static/images/visitorRecordIcon.svg"
                alt=""
                height={100}
                width={100}
                className="rounded-[8px]"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccessRecords;
