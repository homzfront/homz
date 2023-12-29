import React from "react";
import Widget from "./widget";
import Link from "next/link";
import Image from "next/image";

const PricingPlan = () => {
  return (
    <div className="w-[1410px] px-8 py-4">
      <Link
        href={"/dashboard/enterprise-property/profile"}
        className="flex gap-1 pl-12"
      >
        <Image
          src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
          height={16}
          width={16}
          alt=""
        />
        <p className="text-[11px] font-[400]">Go Back</p>
      </Link>
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[897px] flex flex-col items-center gap-3">
          <h2 className="  text-BlueHomz text-[18px]  text-center font-[500]">
            Pricing
          </h2>
          <h1 className="text-[23px] sm:text-[36px] text-center font-[700]">
            Simple, transparent pricing
          </h1>
          <p className="text-[18px] sm:text-[20px] text-center text-GrayHomz font-[500]">
            We believe our enterprise plans should be accessible to all property
            managers.
          </p>
        </div>
      </div>
      <div>
        <Widget />
      </div>
    </div>
  );
};

export default PricingPlan;
