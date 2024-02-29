import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({data}) => {

  return (
    <div className="border rounded-[12px] p-6 sm:w-[30%] flex flex-col gap-8">
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
          <h3 className="text-GrayHomz font-[500] text-[13px]">
            Total Properties
          </h3>
          <h1 className="text-BlackHomz font-[700] text-[36px]">
            {data?.totalEstates ? `${data?.totalEstates}` : "0"}
          </h1>
        </div>
        <div>
          <Link href={"/dashboard/enterprise-property/estates"}>
            <Image
              alt=""
              height={40}
              width={40}
              src={
                "/static/dashboard/enterprisemanager/dashboard/add-square-blue.png"
              }
            />
          </Link>
          <h3 className="text-[11px] font-[400] text-BlackHomz">
            Add New Property
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
