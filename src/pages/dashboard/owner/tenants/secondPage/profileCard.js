import ArrowRightSmall from "@/components/icons/arrowRightSmall";
import TickSuccess from "@/components/icons/tickSuccess";
import Verified from "@/components/icons/verified";
import WarningIcon from "@/components/icons/warningIcon";
import Image from "next/image";
import React from "react";

const ProfileCard = ({ data, setOpenKYC }) => {

  const status = "approved"

  return (
    <div className="w-[350px] h-auto py-4 px-6 shadow-md bg-white rounded-[12px]">
      <div className="w-full flex justify-center">
        {data?.data?.coverPhoto?.url ? (
          <Image
            src={data?.data?.coverPhoto?.url}
            height={198}
            width={198}
            alt=""
            layout="full" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[198px] rounded-full"
            quality={100}
            priority
          />
        ) : (
          <div className="w-[198px] h-[198px] bg-GrayHomz5 rounded-full flex items-center justify-center">
            <Image
              src="/static/dashboard/enterprisemanager/profile/user.png"
              height={52}
              width={52}
              alt="img"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-2 w-ful">
        <h1 className="font-[700] my-4 text-[20px] text-GrayHomz">
          {data?.data?.fullName}
        </h1>
        <Verified />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Phone No</p>
          <p className="text-[13px] font-[500] text-BlackHomz w-[62%]">
            {data?.data?.phoneNumber}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Email</p>
          <p className="text-[13px] font-[500] break-words text-BlackHomz w-[62%]">
            {data?.data?.user?.email}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Home Address</p>
          <p className="text-[13px] font-[500] text-BlackHomz w-[62%]">
            {data?.data?.houseAddress}
          </p>
        </div>
      </div>
      <div className={`bg-[#F6F6F6] rounded-[8px] mt-2 p-4 text-sm font-normal ${status === "" ? "" : ""}`}>
        <p className="text-[13px] text-BlackHomz pb-2 w-[34%]">
          Tenant KYC
        </p>
        <div className="flex gap-2 bg-white rounded-[4px] p-2 w-full">
          <button className={`w-[56%] h-[45px] rounded-[4px] flex justify-start items-center gap-2 ${status === "approved" ? "text-Success" : status === "pending" ? " text-warning" : "text-error"}`}>
            {status === "approved" ? <TickSuccess /> : status === "pending" ? <WarningIcon /> : <WarningIcon className="#d92d20" />}
            {status === "approved" ? "Approved" : status === "pending" ? "Pending" : "Rejected"}
          </button>
          <button onClick={() => setOpenKYC(true)} className="px-1 w-[44%] h-[45px] rounded-[4px] bg-whiteblue text-BlueHomz flex justify-center items-center gap-2">
            View KYC
            <ArrowRightSmall className="#006AFF" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
