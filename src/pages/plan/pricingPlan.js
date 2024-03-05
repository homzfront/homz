import React from "react";
import Widget from "./widget";
import Link from "next/link";
import Image from "next/image";

const PricingPlan = () => {
  return (
    <div className="w-full px-8 py-4 m-auto">
      <Link href={"/plan/enterprise-plan"}>
        <Image src={"/Link (1).png"} alt="img" height={25} width={85} />
      </Link>
      <div className="flex flex-col justify-center items-center">
      <div className="max-w-[897px] m-auto mb-10 flex flex-col items-center gap-3">
            <h2 className="  text-BlueHomz text-[18px]  text-center font-[500]">
              Pricing
            </h2>
            <h1 className="text-[23px] sm:text-[36px] text-center font-[700]">
              Simple, transparent pricing
            </h1>
            <p className="text-[18px] sm:text-[20px] text-center text-GrayHomz font-[500]">
              We believe our enterprise plans should be accessible to all
              property managers.
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
