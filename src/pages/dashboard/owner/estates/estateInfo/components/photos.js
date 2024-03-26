"use client";
import React, { useState } from "react";
import ImageUpload from "../../components/imageUpload";
import Image from "next/image";

const Photos = ({ data }) => {
  const uploadedImage = (data?.coverPhoto?.url ? data?.coverPhoto?.url : null);
  const uploadedImage2 = (data?.photos?.[0]?.url ? data?.photos?.[0]?.url : null);
  const uploadedImage3 = (data?.photos?.[1]?.url ? data?.photos?.[1]?.url : null);
  return (
    <div>
      <div className="flex gap-4 mt-10">
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Cover photo</p>
          <div className="mt-4 w-[235px] flex justify-start">
            <div
              className={`h-[196px] rounded-[8px] w-[196px] justify-center items-center flex ${uploadedImage !== null
                ? ""
                : "bg-blue-100 hidden"
                }`}
            >
              {uploadedImage !== null ? (
                <Image
                  src={uploadedImage}
                  height={196}
                  width={196}
                  className="object-contain"
                  alt="img"
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src={"/static/dashboard/enterprisemanager/estate/add.png"}
                  height={72}
                  width={72}
                  className="mb-2 cursor-pointer"
                  alt="img"
                />
              )}
            </div>
          </div>
        </div>
        <div className={`${uploadedImage2 !== null ? "" : "hidden"}`}>
          <p className=" text-[13px] font-[500] text-GrayHomz">Other photos</p>
          <div className="mt-4 flex gap-2 w-[750px]">
            <div className="w-[235px] flex justify-start">
              <div
                className={`h-[196px] rounded-[8px] w-[196px] justify-center items-center flex ${uploadedImage2 !== null
                  ? ""
                  : "bg-blue-100 hidden"
                  }`}
              >
                {uploadedImage2 !== null ? (
                  <Image
                    src={uploadedImage2}
                    height={196}
                    width={196}
                    className="object-contain"
                    alt="img"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  <Image
                    src={"/static/dashboard/enterprisemanager/estate/add.png"}
                    height={72}
                    width={72}
                    className="mb-2 cursor-pointer"
                    alt="img"
                  />
                )}
              </div>
            </div>
            <div className="w-[235px] flex justify-start">
              <div
                className={`h-[196px] rounded-[8px] w-[196px] justify-center items-center flex ${uploadedImage3 !== null
                  ? ""
                  : "bg-blue-100 hidden"
                  }`}
              >
                {uploadedImage3 !== null ? (
                  <Image
                    src={uploadedImage3}
                    height={196}
                    width={196}
                    className="object-contain"
                    alt="img"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  <Image
                    src={"/static/dashboard/enterprisemanager/estate/add.png"}
                    height={72}
                    width={72}
                    className="mb-2 cursor-pointer"
                    alt="img"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;
