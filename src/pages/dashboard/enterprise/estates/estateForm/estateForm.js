import React from "react";
import Widget from "./widget";
import Image from "next/image";
import WidgetMobile from "./widgetMobile";
import MobileBackButton from "@/components/icons/mobileBackButton";

const EstateForm = ({ returnToStartRegistration, fetchData }) => {
  return (
    <div>
      <div
        className="px-8 pt-8 hidden md:flex items-center cursor-pointer"
        onClick={returnToStartRegistration}
      >
        <div>
          <Image
            src={"/static/dashboard/enterprisemanager/dashboard/arrow-left.png"}
            alt=""
            height={16}
            width={16}
          />
        </div>
        <div className="text-GrayHomz2 text-[14px] font-[400]">Go Back</div>
      </div>
      <div
        onClick={returnToStartRegistration}
        className='m-8 w-[28px] h-[28px] bg-walletBg rounded-[8px] md:hidden flex justify-center items-center'>
        <MobileBackButton />
      </div>
      <div className="hidden md:block">
        <Widget returnToStartRegistration={returnToStartRegistration} fetchData={fetchData} />
      </div>
      <div className="md:hidden">
        <WidgetMobile returnToStartRegistration={returnToStartRegistration} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default EstateForm;
