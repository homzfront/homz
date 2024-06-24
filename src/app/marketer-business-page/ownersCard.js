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
      className=" flex flex-col gap-[24px] md:h-fit border rounded-[12px] p-[20px] w-[100%]"
      id="contactOwner"
    >
      <p cclassName="text-[16px] leading-[24px] font-[500] text-[#4E4E4E]">
        Contact Infomation
      </p>

      <div className="flex justify-between items-center h-[25px]">
        <p className="text-[13px] leading-[19.5px] font-[400] w-[116px]">
          Phone Number
        </p>
        <div className="  flex items-center gap-6 w-[180px]">
          <p className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px]">
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
        <p className="text-[13px] leading-[19.5px] font-[400] w-[116px]">
          Business Address
        </p>
        <p className="text-[13px] leading-[19.5px] font-[400] text-left w-[180px]">
          OB 327, Sunny Place Plaza, Agege, Lagos
        </p>
      </div>
      <div className="flex justify-between items-center h-[25px]">
        <p className="text-[13px] leading-[19.5px] font-[400] w-[116px]">
          Website
        </p>
        <p className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] text-left w-[180px]">
          www.websiteaddress.com
        </p>
      </div>
      <div className="flex justify-between items-center h-[25px]">
        <p className="text-[13px] leading-[19.5px] font-[400] w-[116px]">
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
            />
          </span>
          <Image
                src={"/static/images/facebook.svg"}
                alt=""
                height={22}
              width={22}
              />
            <Image
                src={"/static/images/x.svg"}
                alt=""
                height={22}
              width={22}
              />
            <Image
                src={"/static/images/instagram.svg"}
                alt=""
                height={22}
              width={22}
              />
        </p>
      </div>
      <div className="flex justify-between gap-3 h-fit flex-col">
        <p className="text-[13px] leading-[19.5px] font-[400] w-[116px]">
          Other links
        </p>
        <p className="flex flex-wrap justify-between">
          {otherLinks.map((links, index) => (
            <span
              className="text-[#006AFF] text-[13px] font-[400] leading-[19.5px] flex gap-2"
              key={index}
            >
              <Image
                src={"/static/images/link.svg"}
                alt=""
                height={13}
                width={13}
              />
              <span>{links}</span>
            </span>
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
