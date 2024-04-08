import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <div className="border rounded-[12px] p-6 w-[100%] flex flex-col gap-8 md:w-[30%] ">
      <div className="flex justify-between">
        <h3 className="font-[500] text-[14px] text-BlueHomz">Properties</h3>
        <Link
          href={"/dashboard/enterprise-property/estates"}
          className="flex items-center"
        >
          <h3 className=" text-[11px] font-[400] text-BlackHomz">
            view all properties
          </h3>
          <span>
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
              }
              alt=""
              height={17}
              width={16}
            />
          </span>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="hidden text-GrayHomz font-[500] text-[13px] md:block">
            Total Properties
          </h3>
          <h1 className="text-BlackHomz font-[700] text-[36px]">5</h1>
          <h3 className="block text-GrayHomz text-[11px] font-[500] md:text-[13px] md:hidden">
            Total Properties
          </h3>
        </div>
        <div className="flex flex-col pt-2 gap-1 md:pt-0 md:block">
          <div className="ml-auto">
            {" "}
           
            <Image
              alt=""
              height={40}
              width={40}
              src="/static/dashboard/enterprisemanager/dashboard/add-square-blue.png"
            />
          </div>
          <h3 className="text-[11px] font-[400] text-BlackHomz pt-1">
            Add New Property
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
