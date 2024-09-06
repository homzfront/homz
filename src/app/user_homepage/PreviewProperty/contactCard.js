import React, { useState } from "react";
import formatNumber from "@/utils/formatNumber";
import Image from "next/image";
import whatsApp from "@/utils/whatsAppMessenger";

const ContactCard = ({ contactData, setOpenPropertyReq,slug }) => {
  // console.log(contactData);
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className="py-[32px] mt-5 px-[16px] flex flex-col gap-[12px] rounded-[8px] text-white bg-[#202020]">
      <p className="text-[13px] leading-[19.5px] font-[500]">
        Interested in this property?
      </p>
      <div className="flex gap-[12px] sm:flex-row flex-col">
        <div className="bg-white sm:w-[280px] h-[44px] flex items-center justify-between p-[12px] rounded-[8px]">
          <p className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px]">
            {showNumber
              ? contactData?.contacts?.phoneNumber
              : formatNumber(contactData?.contacts?.phoneNumber)}
          </p>
          <button
            className="text-white bg-[#006AFF] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]"
            onClick={() => setShowNumber(!showNumber)}
          >
            Call Agent
          </button>
        </div>
        <div className="bg-white sm:w-[280px] h-[44px] flex items-center justify-between p-[12px] rounded-[8px]">
          <p className="text-[#039855] text-[13px] flex gap-2 font-[400] leading-[19.5px]">
            <Image
              src="/static/images/whatsapp.svg"
              alt=""
              width={16}
              height={16}
              className="h-[16px] w-[16px]"
            />
            <span>Whatsapp</span>
          </p>
          <button
            onClick={() => whatsApp( contactData?.contacts?.whatsapp, slug)}
            className="text-white bg-[#039855] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]"
            title={ contactData?.contacts?.whatsapp}

          >
            Send Message
          </button>
        </div>
        <button
          className="text-white sm:w-[154px] h-[44px] bg-[#006AFF] py-[8px] px-[12px] rounded-[8px] flex items-center text-[11px] justify-center gap-1 leading-[16.5px] font-[400]"
          onClick={() => setOpenPropertyReq(true)}
        >
          <Image
            src="/static/images/call.svg"
            alt=""
            width={16}
            height={16}
            className="h-[16px] w-[16px]"
          />
          <span>Request Callback</span>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
