import React, { useEffect, useState } from "react";
import Image from "next/image";
import EmptyAvatar from "@/components/icons/emptyAvatar";
import formatNumber from "@/utils/formatNumber";

const OwnersCard = ({ data }) => {
  const [copiedState, setCopiedState] = useState({
    phoneNumber: false,
    email: false,
    whatsAppNumber: false,
  });
  const [showNumber, setShowNumber] = useState(false);
  // console.log(propertyData);
  // const handleCopyClick = async (text, identifier) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setCopiedState((prevState) => ({ ...prevState, [identifier]: true }));
  //     setTimeout(
  //       () =>
  //         setCopiedState((prevState) => ({
  //           ...prevState,
  //           [identifier]: false,
  //         })),
  //       2000
  //     );
  //   } catch (error) {
  //     // console.error("Unable to copy to clipboard:", error);
  //   }
  // };
  console.log(data);

  const viewLinks = (url) => {
    if (url && typeof url === "string" && url.trim() !== "") {
      if (!url.startsWith("https://") && !url.startsWith("https://www.")) {
        url = `https://www.${url}`;
      }

      try {
        window.open(url, "_blank", "noopener,noreferrer");
        // console.log(url);
      } catch (error) {
        console.error("Failed to open the link:", error);
      }
    } else {
      console.warn("Invalid URL:", url);
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
            {showNumber ? data?.phoneNumber : formatNumber(data?.phoneNumber)}
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
          {data?.businessInfo?.businessAddress}
        </p>
      </div>
      <div className="flex justify-between items-center h-[25px]">
        <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
          Website
        </p>
        <p className="text-[#006AFF] font-[400] sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] text-left w-[180px]">
          {data?.websiteUrl}
        </p>
      </div>
      {(data?.socialMediaLinks?.whatsappLink ||
        data?.socialMediaLinks?.facebookLink ||
        data?.socialMediaLinks?.twitterLink ||
        data?.socialMediaLinks?.instagramLink) && (
        <div className="flex justify-between items-center h-[25px]">
          <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
            Social links
          </p>
          <p className="flex items-center gap-3 text-left w-[180px]">
            {data?.socialMediaLinks?.whatsappLink && (
              <span>
                {" "}
                <Image
                  src={"/static/images/whatsapp.svg"}
                  alt=""
                  height={22}
                  width={22}
                  className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] cursor-pointer"
                  onClick={() =>
                    viewLinks(data?.socialMediaLinks?.whatsappLink)
                  }
                />
              </span>
            )}
            {data?.socialMediaLinks?.facebookLink && (
              <Image
                src={"/static/images/facebook.svg"}
                alt=""
                height={20}
                width={22}
                className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] cursor-pointer"
                onClick={() => viewLinks(data?.socialMediaLinks?.facebookLink)}
              />
            )}
            {data?.socialMediaLinks?.twitterLink && (
              <Image
                src={"/static/images/x.svg"}
                alt=""
                height={20}
                width={22}
                className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] cursor-pointer"
                onClick={() => viewLinks(data?.socialMediaLinks?.twitterLink)}
              />
            )}
            {data?.socialMediaLinks?.instagramLink && (
              <Image
                src={"/static/images/instagram.svg"}
                alt=""
                height={20}
                width={22}
                className="sm:w-[22px] sm:h-[22px] w-[18px] h-[18px] cursor-pointer"
                onClick={() => viewLinks(data?.socialMediaLinks?.instagramLink)}
              />
            )}
          </p>
        </div>
      )}
      {data?.socialMediaLinks?.otherLinks.length > 0 && (
        <div className="flex justify-between gap-3 h-fit flex-col">
          <p className="sm:text-[13px] leading-[16.5px] text-[12px] sm:leading-[19.5px] font-[400] w-[116px]">
            Other links
          </p>
          <p className="flex flex-wrap  justify-between">
            {data?.socialMediaLinks?.otherLinks.map((links, index) => (
              <button
                className="text-[#006AFF]  font-[400] sm:text-[13px] leading-[16.5px] text-[11px] sm:leading-[19.5px] flex gap-1 items-center sm:gap-2 cursor-pointer"
                key={index}
                onClick={() => viewLinks(links)}
              >
                <Image
                  src={"/static/images/link.svg"}
                  alt=""
                  height={13}
                  width={13}
                  className="sm:w-[13px] sm:h-[13px] w-[11px] h-[11px]"
                />
                <span>{links}</span>
              </button>
            ))}
          </p>
        </div>
      )}
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
