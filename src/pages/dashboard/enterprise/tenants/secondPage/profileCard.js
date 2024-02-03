import Image from "next/image";
import React from "react";

const ProfileCard = ({ data }) => {
  console.log(data);
  return (
    <div className="h-auto py-4 px-6 shadow-md bg-white rounded-[12px]">
      <div className="w-full ">
        <Image
          src={"/static/dashboard/enterprisemanager/tenants/Ellipse 70.png"}
          height={198}
          width={198}
          alt=""
        />
      </div>
      <h1 className="font-[700] my-4 text-[20px] text-GrayHomz">
        {data?.data?.fullName}
      </h1>
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
    </div>
  );
};

export default ProfileCard;
