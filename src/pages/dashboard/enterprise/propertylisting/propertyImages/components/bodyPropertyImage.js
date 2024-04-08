"use client";
import Image from "next/image";
import React, { useState } from "react";

const BodyPropertyImage = ({ showRatingPage, data, user }) => {
  console.log(data);

  function capitalizeFirstLetter(str) {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      // Return an empty string or handle the error as needed
      return "";
    }
  }
  function addCommasToNumber(number) {
    // Convert the number to a string
    const numberString = number?.toString();
    // Use regular expression to add commas
    const formattedNumber = numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `N ${formattedNumber}`;
  }

  function getTimeAgo(postedTime) {
    const postedDate = new Date(postedTime);
    const currentDate = new Date();

    const timeDifferenceInMilliseconds = currentDate - postedDate;
    const timeDifferenceInSeconds = Math.floor(
      timeDifferenceInMilliseconds / 1000
    );
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
    const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

    if (timeDifferenceInDays >= 1) {
      // If the time difference is 1 day or more, return days ago
      return `${timeDifferenceInDays} ${
        timeDifferenceInDays === 1 ? "day" : "days"
      } ago`;
    } else if (timeDifferenceInHours >= 1) {
      // If the time difference is 1 hour or more, return hours ago
      return `${timeDifferenceInHours} ${
        timeDifferenceInHours === 1 ? "hour" : "hours"
      } ago`;
    } else {
      // Otherwise, return minutes ago
      return `${timeDifferenceInMinutes} ${
        timeDifferenceInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }
  }

  // Example usage:
  const postedTime = "2024-02-04T20:33:56.156Z";
  const timeAgo = getTimeAgo(postedTime);
  console.log(`Time ago: ${timeAgo}`);

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
  console.log(user);
  return (
    <div className="pl-2 pt-4">
      <div className="flex justify-between">
        <p className="text-[23px] font-[700] text-GrayHomz">
          {capitalizeFirstLetter(data?.data?.name)}
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
          {addCommasToNumber(data?.data?.yearlyRent)}{" "}
          <span className="text-[18px] font-[500]">per year</span>
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
            <p className="text-[14px] font-[500] text-GrayHomz2">
              {" "}
              {capitalizeFirstLetter(data?.data?.area)},{" "}
              {capitalizeFirstLetter(data?.data?.state)}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Image
              src={"/static/dashboard/enterprisemanager/propertyList/clock.png"}
              alt=""
              height={24}
              width={24}
            />
            <p className="text-[14px] font-[500] text-GrayHomz2">
              Posted {`${getTimeAgo(data?.data?.createdAt)}`}.
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
        <div className="border-b pt-2 pb-4">
          <div key={data.id} className="flex flex-col my-2 gap-3">
            <div className="flex">
              <p className="text-[14px] font-[400] text-GrayHomz w-[20%]">
                Property Type
              </p>
              <p className={`text-[14px] font-[500] w-[40%] text-BlackHomz`}>
                {capitalizeFirstLetter(data?.data?.propertyType)}
              </p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-[400] text-GrayHomz w-[20%]">
                Address
              </p>
              <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
                {data?.data?.address}
              </p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-[400] text-GrayHomz w-[20%]">
                Rooms
              </p>
              <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
                {data?.data?.numberOfRooms}
              </p>
            </div>
            <div className="flex">
              <p className="text-[14px] font-[400] text-GrayHomz w-[20%]">
                Bathrooms
              </p>
              <p className={`text-[14px] font-[500] w-[40%] text-GrayHomz`}>
                {data?.data?.numberOfBathrooms}
              </p>
            </div>
          </div>
        </div>
        <p className="text-[14px] font-[500] text-GrayHomz border-b pt-4 pb-6">
          {data?.data?.description}
        </p>
        <div className="mt-3 flex flex-col gap-4 h-[180px]">
          <p className="text-[13px] font-[400] text-GrayHomz2">
            Property Owner
          </p>
          <div className="flex gap-2 items-center">
            <Image src={user?.businessLogo?.url} alt="" height={40} width={40} className="rounded-full" />
            <p className="text-[18px] font-[500] text-GrayHomz">
              {user?.fullName}
            </p>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-[13px] font-[400] text-BlackHomz">
                Phone Number
              </p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                  {user?.phoneNumber}
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() =>
                    handleCopyClick(`${user?.phoneNumber}`, "copied")
                  }
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
              <p className="text-[13px] font-[400] text-BlackHomz">Email</p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                  {user?.user?.email}
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() =>
                    handleCopyClick(`${user?.user?.email}`, "copiedII")
                  }
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
              <p className="text-[13px] font-[400] text-BlackHomz">
                WhatsApp Link
              </p>
              <div className="mt-2 bg-whiteblue w-[280px] h-[45px] flex items-center justify-between px-4 rounded-sm">
                <p className="text-[14px] font-[500] text-BlueHomz">
                  {data?.data?.contacts?.whatsapp}
                </p>
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/propertyList/copy.png"
                  }
                  width={16}
                  height={17}
                  alt=""
                  onClick={() =>
                    handleCopyClick(
                      `${data?.data?.contacts?.whatsapp}`,
                      "copiedIII"
                    )
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
