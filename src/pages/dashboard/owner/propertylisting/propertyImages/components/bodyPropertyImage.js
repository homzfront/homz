"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const minidata = [
  {
    id: 1,
    text1: "Property Type",
    text2: "Bungalow",
  },
  {
    id: 2,
    text1: "Address",
    text2: "17, Alapere, Alagomeji Area, Yaba, Lagos",
  },
  {
    id: 3,
    text1: "Rooms",
    text2: "5",
  },
  {
    id: 4,
    text1: "Bathrooms",
    text2: "4",
  },
];

const BodyPropertyImage = ({showRatingPage}) => {
  const [miniData, setMiniData] = useState(minidata || []);
  const [copiedState, setCopiedState] = useState({
    copied: false,
    copiedII: false,
    copiedIII: false,
  });

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
      ); // Clear the copied state after 2 seconds
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };



  return (
    <div>
      <div className="flex justify-between">
        <p className="text-[23px] font-[700] text-GrayHomz">
          3-Bedroom Bungalow
        </p>
        <div className="flex gap-2 items-center">
          <Image
            src={"/static/dashboard/enterprisemanager/propertyList/love.png"}
            alt=""
            height={24}
            width={24}
          />
          <p>save</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <p className="text-[23px] font-[700] text-GrayHomz">
          4,000,000 <span className="text-[18px] font-[500]">per year</span>
        </p>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/propertyList/locationGray.png"
              }
              alt=""
              height={24}
              width={24}
            />
            <p className="text-[14px] font-[500] text-GrayHomz2">Yaba, Lagos</p>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/clock.png"}
              alt=""
              height={24}
              width={24}
            />
            <p className="text-[14px] font-[500] text-GrayHomz2">
              Posted 4 hours ago.
            </p>
          </div>
        </div>
        <div
          onClick={showRatingPage}
            className="flex gap-4 items-center border-b pb-6 cursor-pointer"
        >
          <div>
            {[...Array(5)].map((index) => {
              return (
                <span key={index} className="text-BlackHomz text-[20px]">
                  &#9733;
                </span>
              );
            })}
          </div>
          <p className="text-[14px] font-[500] text-BlackHomz mt-1">
            12 <span className="text-BlueHomz">(Ratings/Reviews)</span>
          </p>
        </div>
        <div className="border-b py-4">
          {miniData.map((data) => (
            <div key={data.id} className="flex flex-col my-2">
              <div className="flex">
                <p className="text-[14px] font-[400] text-GrayHomz w-[20%]">
                  {data.text1}
                </p>
                <p
                  className={`text-[14px] font-[500] w-[40%] ${
                    data.id === 1 ? "text-BlackHomz" : "text-GrayHomz"
                  }`}
                >
                  {data.text2}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[14px] font-[500] text-GrayHomz border-b pt-4 pb-6">
          This lovely home features 5 spacious rooms, providing ample space for
          your family's needs. With 4 well-appointed bathrooms, comfort and
          convenience are at the forefront. Enjoy the tranquility of this clean
          and well-maintained area, complemented by good road access and
          reliable lighting. Your ideal home awaits, offering a perfect blend of
          modern living in a peaceful and well-connected environment.
        </p>
        <div className="mt-3 flex flex-col gap-4 h-[180px]">
          <p className="text-[13px] font-[400] text-GrayHomz2">
            Property Owner
          </p>
          <div className="flex gap-2 items-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/propertyList/Avatar.png"
              }
              alt=""
              height={40}
              width={40}
            />
            <p className="text-[18px] font-[500] text-GrayHomz">Victor Simon</p>
          </div>
          <div className="flex gap-6"> 
            <div>
              <p className="text-[13px] font-[400] text-BlackHomz">
                Phone Number
              </p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                  0000 - 000 - 0000
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() => handleCopyClick("0000 - 000 - 0000", "copied")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                {copiedState.copied && (
                  <div className="italic text-[12px] text-Success">copied</div>
                )}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-[400] text-BlackHomz">
               Email
              </p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                Victor@gmail.com
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() => handleCopyClick("Victor@gmail.com", "copiedII")}
                  className="cursor-pointer"
                />
              </div>
              <div>
                {copiedState.copiedII && (
                  <div className="italic text-[12px] text-Success">copied</div>
                )}
              </div>
            </div>
            <div>
              <p className="text-[13px] font-[400] text-BlackHomz">WhatsApp Link</p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                WA.com/Your-Link
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() =>
                    handleCopyClick("WA.com/Your-Link", "copiedIII")
                  }
                  className="cursor-pointer"
                />
              </div>
              <div>
                {copiedState.copiedIII && (
                  <div className="italic text-[12px] text-Success">copied</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyPropertyImage;
