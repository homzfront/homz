import React, { useState } from "react";
import Image from "next/image";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import formatNumber from "@/utils/formatNumber";

const OwnersCard = ({ propertyData }) => {
  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });
  const [showNumber, setShowNumber] = useState(false);
  //   console.log(propertyData)
  const handleCopyClick = async (text, identifier) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
      setTimeout(
        () =>
          setCopiedState((prevState) => ({
            ...prevState,
            [identifier]: false,
          })),
        2000
      );
    } catch (error) {
      // console.error("Unable to copy to clipboard:", error);
    }
  };
  const viewFile = (url) => {
    if (url) {
      window.open(url);
    }
  };
  return (
    <div
      className=" flex flex-col gap-[15px] sm:gap-[24px] md:h-fit border rounded-[12px] sm:p-[20px] py-[20px] px-[13px] w-[100%]"
      id="contactOwner"
    >
      <p cclassName="text-[16px] leading-[24px] font-[700] ">
        Contact Infomation
      </p>

      <div className="flex justify-between items-center h-[25px]">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] font-[400] w-[116px]">
          Phone Number
        </p>
        <div className="  flex items-center gap-5 sm:gap-6 w-[180px]">
          <p className="text-[#006AFF] sm:text-[13px] leading-[16.5px] text-[12px] font-[400] sm:leading-[19.5px]">
            {showNumber
              ? propertyData?.contacts?.phoneNumber
              : formatNumber(propertyData?.contacts?.phoneNumber)}
          </p>
          <button
            className="text-white bg-[#006AFF] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]"
            onClick={() => setShowNumber(!showNumber)}
          >
            {showNumber ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center h-">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
          Business Address
        </p>
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] text-left w-[180px]">
          OB 327, Sunny Place Plaza, Agege, Lagos
        </p>
      </div>
      <div className="flex justify-between items-center h-[25px]">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
          Website
        </p>
        <p className="text-[#006AFF] font-[400] sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] text-left w-[180px]">
          www.websiteaddress.com
        </p>
      </div>
      <div className="flex justify-between items-center h-[25px]">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
          Social links
        </p>
        <p className="flex items-center gap-3 text-left w-[180px]">
          <span>
            {" "}
            <Image
              src={"/static/images/whatsapp.svg"}
              alt=""
              height={22}
              width={22}
              className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]"
            />
          </span>
          <Image
            src={"/static/images/facebook.svg"}
            alt=""
            height={22}
            width={22}
            className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]"
          />
          <Image
            src={"/static/images/x.svg"}
            alt=""
            height={22}
            width={22}
            className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]"
          />
          <Image
            src={"/static/images/instagram.svg"}
            alt=""
            height={22}
            width={22}
            className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px]"
          />
        </p>
      </div>
      <div className="flex justify-between gap-3 h-fit flex-col">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
          Other links
        </p>
        <p className="flex flex-wrap  justify-between">
          {otherLinks.map((links, index) => (
            <p
              className="text-[#006AFF]  font-[400] sm:text-[13px] leading-[16.5px] text-[11px] sm:leading-[19.5px] flex gap-1 items-center sm:gap-2"
              key={index}
            >
              <Image
                src={"/static/images/link.svg"}
                alt=""
                height={13}
                width={13}
                  className="sm:w-[13px] sm:h-[13px] w-[11px] h-[11px]"
              />
              <span>{links}</span>
            </p>
          ))}
        </p>
      </div>
    </div>
  );
};

export default OwnersCard;
const otherLinks = [
  "www.sociallink.com",
  "www.sociallink.com",
  "www.sociallink.com",
  "www.sociallink.com",
];
