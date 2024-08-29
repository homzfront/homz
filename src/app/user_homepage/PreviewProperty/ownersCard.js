import React, { useState } from "react";
import Image from "next/image";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import formatNumber from "@/utils/formatNumber";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Link from "next/link";
import whatsApp from "@/utils/whatsAppMessenger";


const OwnersCard = ({ propertyData }) => {
  // const [copiedState, setCopiedState] = useState({
  //   phoneNumber: false,
  //   email: false,
  //   whatsAppNumber: false,
  // });
  const [showNumber, setShowNumber] = useState(false);
  let marketerId = 222222;
    console.log(propertyData?.user?._id)

  

  return (
    <div
      className=" flex flex-col gap-4 md:h-fit border rounded-[12px] p-[20px] w-[100%] mt-4 sm:mt-0"
      id="contactOwner"
    >
      <p cclassName="text-[16px] leading-[24px] font-[500] text-[#202020]">
        Marketer
      </p>
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
              {capitalizeFirstLetter(
                propertyData?.lisitingPropertyId?.businessInfo?.businessName
              )}
            </span>
            {propertyData?.lisitingPropertyId?.businessInfo?.isVerified ===
              "verified" && (
              <Image
                src="/static/images/green_verify.svg"
                alt=""
                width={20}
                height={20}
              />
            )}
          </p>
          <Link
            href={`/marketer-business-page/${propertyData?.user?._id}?user=users`}
            className="breakwords flex items-center gap-2 font-[400] text-[#006AFF] leading-[19.5px] text-[11.5px] cursor-pointer"
          >
            <span>View more properties from this marketer</span>
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
            onClick={() => whatsApp(propertyData?.contacts?.phoneNumber || propertyData?.contacts?.whatsApp, propertyData?.slug)}
            className="text-white bg-[#039855] py-[4px] px-[12px] rounded-[8px]  text-[11px] leading-[16.5px] font-[400]"
          >
            Send Message
          </button>
        </div>

        {/* {propertyData?.contacts?.whatsapp
                          ? `${propertyData?.contacts?.whatsapp}`
                          : ""} */}
      </div>
    </div>
  );
};

export default OwnersCard;
