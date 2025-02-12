import Image from "next/image";
import React from "react";

const ProfileCard = ({ tenantData, openKYC, setOpenKYC }) => {
  return (
    <div className="w-[350px] h-auto py-4 px-6 shadow-md bg-white rounded-[12px]">
      <div className="w-full ">
        {tenantData?.data?.coverPhoto?.url ? (
          <Image
            src={tenantData?.data?.coverPhoto?.url}
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
      <h1 className="font-[700] my-4 text-[20px] text-GrayHomz">
        {tenantData?.data?.fullName}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Phone No</p>
          <p className="text-[13px] font-[500] text-BlackHomz w-[62%]">
            {tenantData?.data?.phoneNumber}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Email</p>
          <p className="text-[13px] font-[500] break-words text-BlackHomz w-[62%]">
            {tenantData?.data?.user?.email}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <p className="text-[13px] font-[400] text-GrayHomz">Home Address</p>
          <p className="text-[13px] font-[500] text-BlackHomz w-[62%]">
            {tenantData?.data?.houseAddress}
          </p>
        </div>
      </div>
      <button onClick={() => setOpenKYC(true)} className="mt-6 w-full h-[45px] rounded-[4px] bg-BlueHomz text-white text-sm font-normal">
        View Personal Information
      </button>
    </div>
  );
};

export default ProfileCard;
