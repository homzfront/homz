import React, { useState } from "react";
import Image from "next/image";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import formatNumber from "@/utils/formatNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Link from "next/link";

const OwnersCard = ({ propertyData }) => {
  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });
  const [showNumber, setShowNumber] = useState(false);

  const whatsApp = (number) => {
    if (number.startsWith("0")) {
      number = number.substring(1);
    }
    window.open(`https://wa.me/${number}`);
  };
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
      console.error("Unable to copy to clipboard:", error);
    }
  };
  const viewFile = (url) => {
    if (url) {
      window.open(url);
    }
  };
  return (
    <div
      className=" flex flex-col gap-4 md:h-fit border rounded-[12px] p-[20px] w-[100%]"
      id="contactOwner"
    >
      <p className="text-[13px] font-[500] text-[#202020]">Marketer</p>
      <div className="flex gap-2 items-center border-b pb-3">
        {propertyData?.lisitingPropertyId?.businessInfo?.businessLogo ? (
          <Image
            src={
              propertyData?.lisitingPropertyId?.businessInfo?.businessLogo?.url
            }
            alt=""
            height={40}
            width={40}
            layout="full" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[40px] rounded-full"
            quality={100}
            priority
          />
        ) : (
          <div className="h-[40px] w-[40px] flex justify-center items-center bg-avatarBg rounded-full">
            <EmptyAvatar />
          </div>
        )}
        <div className="">
          <p className="text-[18px] font-[500] text-GrayHomz flex items-center gap-[8px]">
            <span className="">
              {capitalizeFirstLetter(propertyData?.lisitingPropertyId?.businessInfo?.businessName)}
            </span>
            <Image
              src="/static/images/green_verify.svg"
              alt=""
              width={20}
              height={20}
            />
          </p>
          <Link href={`/marketer-business-page/${"234"}`} className="breakwords pl-2 flex items-center gap-2 font-[400] text-[#006AFF] leading-[19.5px] text-[11.5px] cursor-pointer">
            <span>View your page</span>
            <Image
              src="/static/images/send.svg"
              alt=""
              width={12}
              height={12}
              className="h-[12px] w-[12px]"
            />
          </Link>
        </div>
      </div>
      <p className="breakwords font-[400] text-[#4E4E4E] leading-[19.5px] text-[13px] ">
        Certified realtor with tons of amazing properties out in the market. All
        properties are premium...
      </p>
      <div className="flex gap-[12px] flex-col">
        <div className="bg-[#F6F6F6] h-[44px] w-[100%] flex items-center justify-between p-[12px] rounded-[8px]">
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
        <div className="bg-[#F6F6F6] h-[44px] w-[100%] flex items-center justify-between p-[12px] rounded-[8px]">
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
            onClick={() => whatsApp(propertyData?.contacts?.whatsApp || "")}
            className="text-white bg-[#039855] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]"
          >
            Send Message
          </button>
        </div>
        {/* <div>
          <p className="text-[13px] font-[400] text-BlackHomz">Phone Number</p>
          <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
            <p className="text-[14px] font-[500] text-BlueHomz">
              {propertyData?.contacts?.phoneNumber}
            </p>
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/copy.png"}
              width={16}
              height={17}
              alt=""
              onClick={() =>
                handleCopyClick(
                  `${propertyData?.contacts?.phoneNumber}`,
                  "phoneNumber"
                )
              }
              className="cursor-pointer"
            />
          </div>
          <div>
            {copiedState.phoneNumber && (
              <div className="italic text-[12px] text-Success">Copied</div>
            )}
          </div>
        </div>
        {propertyData?.contacts?.email && (
          <div>
            <p className="text-[13px] font-[400] text-BlackHomz">Email</p>
            <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
              <p className="text-[14px] font-[500] text-BlueHomz">
                {propertyData?.contacts?.email}
              </p>
              <Image
                src={
                  "/static/dashboard/enterprisemanager/propertyList/copy.png"
                }
                width={16}
                height={17}
                alt=""
                onClick={() =>
                  handleCopyClick(`${propertyData?.contacts?.email}`, "email")
                }
                className="cursor-pointer"
              />
            </div>
            <div>
              {copiedState.email && (
                <div className="italic text-[12px] text-Success">Copied</div>
              )}
            </div>
          </div>
        )}
        {propertyData?.contacts?.whatsapp && (
          <div>
            <p className="text-[13px] font-[400] text-BlackHomz">
              WhatsApp Link
            </p>
            <div className="mt-2 bg-whiteblue md:w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
              <p
                onClick={() => {
                  viewFile(propertyData?.contacts?.whatsapp);
                }}
                className="text-[14px] font-[500] text-BlueHomz underline cursor-pointer"
              >
                {propertyData?.contacts?.whatsapp
                  ? `${propertyData?.contacts?.whatsapp}`
                  : ""}
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default OwnersCard;
