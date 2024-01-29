"use client";
import Image from "next/image";
import React, { useState } from "react";

const EstateInfoP = ({ data }) => {
  const [copiedState, setCopiedState] = useState({
    copied: false,
    copiedII: false,
    copiedIII: false,
    copiedIV: false,
    copiedV: false,
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

  const Data = data || null;
  console.log(Data);
  return (
    <div>
      <div className="">
        {Data &&
          Data.map((data) => (
            <div key={data.id}>
              <div className="w-full h-[172px] bg-inputBg rounded-[12px] px-6 py-8 flex flex-col justify-between">
                <div className="flex justify-between w-[540px]">
                  <p className="text-[14px] font-[400] text-GrayHomz w-[180px]">
                    Property Name
                  </p>
                  <p className="text-[16px] font-[500] text-BlackHomz w-[360px]">
                    {data.EstateName}
                  </p>
                </div>
                <div className="flex justify-between w-[540px]">
                  <p className="text-[14px] font-[400] text-GrayHomz w-[180px]">
                    Property Location
                  </p>
                  <p className="text-[16px] font-[500] text-BlackHomz w-[360px]">
                    {data.EstateLocation}
                  </p>
                </div>
                <div className="flex justify-between w-[540px]">
                  <p className="text-[14px] font-[400] text-GrayHomz w-[180px]">
                    Property Address
                  </p>
                  <p className="text-[16px] font-[500] text-BlackHomz w-[360px] flex gap-2 items-center">
                    {data.EstateAddress}
                    <Image
                      src={"/static/dashboard/tenant/estateInfo/copy.png"}
                      alt=""
                      height={16}
                      width={16}
                      className="cursor-pointer"
                      onClick={() =>
                        handleCopyClick(`${data.EstateAddress}`, "copied")
                      }
                    />
                    {copiedState.copied && (
                      <span className=" text-[10px] font-[400] italic text-Success">
                        copied
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-6 w-full h-[284px] bg-inputBg rounded-[12px] px-6 py-8 flex flex-col justify-between">
                <p className="text-[16px] font-[500] text-BlueHomz">
                  Contact Information
                </p>
                <div className="h-[174px] flex flex-col justify-between">
                  <div className="flex justify-between w-[580px]">
                    <p className="text-[14px] font-[400] text-GrayHomz w-[210px]">
                      Manager
                    </p>
                    <p className="text-[16px] font-[500] text-BlackHomz w-[360px] flex gap-2 items-center">
                      {data.Manager}
                      <Image
                        src={"/static/dashboard/tenant/estateInfo/copy.png"}
                        alt=""
                        height={16}
                        width={16}
                        className="cursor-pointer"
                        onClick={() =>
                          handleCopyClick(`${data.Manager}`, "copiedV")
                        }
                      />
                      {copiedState.copiedV && (
                        <span className=" text-[10px] font-[400] italic text-Success">
                          copied
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between w-[580px]">
                    <p className="text-[14px] font-[400] text-GrayHomz w-[210px]">
                      Emergency
                    </p>
                    <p className="text-[16px] font-[500] text-BlackHomz w-[360px] flex gap-2 items-center">
                      {data.Emergency}
                      <Image
                        src={"/static/dashboard/tenant/estateInfo/copy.png"}
                        alt=""
                        height={16}
                        width={16}
                        className="cursor-pointer"
                        onClick={() =>
                          handleCopyClick(`${data.Emergency}`, "copiedII")
                        }
                      />
                      {copiedState.copiedII && (
                        <span className=" text-[10px] font-[400] italic text-Success">
                          copied
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between w-[580px]">
                    <p className="text-[14px] font-[400] text-GrayHomz w-[210px]">
                      Utility Service <br />
                      <span className="text-[11px] font-[400] text-GrayHomz w-[180px]">
                        (Dry cleaning, waste disposal, etc)
                      </span>
                    </p>
                    <p className="text-[16px] font-[500] text-BlackHomz w-[360px] flex gap-2 items-center">
                      {data.UtilityService}
                      <Image
                        src={"/static/dashboard/tenant/estateInfo/copy.png"}
                        alt=""
                        height={16}
                        width={16}
                        className="cursor-pointer"
                        onClick={() =>
                          handleCopyClick(`${data.UtilityService}`, "copiedIII")
                        }
                      />
                      {copiedState.copiedIII && (
                        <span className=" text-[10px] font-[400] italic text-Success">
                          copied
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between w-[580px]">
                    <p className="text-[14px] font-[400] text-GrayHomz w-[210px]">
                      Property Address
                    </p>
                    <p className="text-[16px] font-[500] text-BlackHomz w-[360px] flex gap-2 items-center">
                      {data.EmergencyII}
                      <Image
                        src={"/static/dashboard/tenant/estateInfo/copy.png"}
                        alt=""
                        height={16}
                        width={16}
                        className="cursor-pointer"
                        onClick={() =>
                          handleCopyClick(`${data.EmergencyII}`, "copiedIV")
                        }
                      />
                      {copiedState.copiedIV && (
                        <span className=" text-[10px] font-[400] italic text-Success">
                          copied
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div></div>
    </div>
  );
};

export default EstateInfoP;
