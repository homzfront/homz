"use client";

import React, { useState } from "react";
import ImageUpload from "../components/imageUpload";
import Image from "next/image";

const Photos = ({
  handlePageChangeTwo,
  handlePageChangeFour,
  formData,
  handleChange,
  setFormData,
}) => {

  const handleImageUpload = (imageKey, file) => {
    setFormData({
      ...formData,
      [imageKey]: file,
    });
  };

  const removeImage = (imageKey) => {
    setFormData({
      ...formData,
      [imageKey]: null,
    });
  };


  return (
    <div className="px-8 block w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
        <p className="text-[18px] font-[400] text-GrayHomz">
          Add at least three (3) photos of your property
        </p>
        <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png, and file size must not exceed 5
          MB
        </p>
      </div>
      <div className="flex items-start w-full justify-between gap-4 mt-8">
        <div className="w-25%">
          <div>
            <p className="text-[13px] font-[500] text-GrayHomz">Cover photo <span className="text-error">*</span></p>
            <div className="w-[140px] flex justify-start mt-4">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImageCoverPhoto", file)}
                onImageRemove={() => removeImage("uploadedImageCoverPhoto")}
                uploadedImage={formData?.uploadedImageCoverPhoto}
              />
            </div>
          </div>
        </div>
        <div className="grid w-[75%]">
          <p className="text-[13px] font-[500] text-GrayHomz">Other photos <span className="text-error">*</span></p>
          <div className="flex mt-4 justify-between">
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImage", file)}
                onImageRemove={() => removeImage("uploadedImage")}
                uploadedImage={formData?.uploadedImage}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImage2", file)}
                onImageRemove={() => removeImage("uploadedImage2")}
                uploadedImage={formData?.uploadedImage2}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImage3", file)}
                onImageRemove={() => removeImage("uploadedImage3")}
                uploadedImage={formData?.uploadedImage3}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImage4", file)}
                onImageRemove={() => removeImage("uploadedImage4")}
                uploadedImage={formData?.uploadedImage4}
              />
            </div>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                handleImageUpload={(file) => handleImageUpload("uploadedImage5", file)}
                onImageRemove={() => removeImage("uploadedImage5")}
                uploadedImage={formData?.uploadedImage5}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[5%] flex justify-between w-full">
        <div>
          <button
            onClick={handlePageChangeTwo}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            <Image
              src="/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        {
          formData?.uploadedImageCoverPhoto === null || (formData?.uploadedImage === null &&
            formData?.uploadedImage2 === null &&
            formData?.uploadedImage3 === null &&
            formData?.uploadedImage4 === null &&
            formData?.uploadedImage5 === null) ? (
            <div className="">
              <button
                disabled
                className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-GrayHomz border bg-GrayHomz5"
              >
                Next
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                  }
                  alt=""
                  height={17}
                  width={16}
                />
              </button>
            </div>
          ) : (
            <div className="">
              <button
                onClick={handlePageChangeFour}
                className="flex w-[100px] justify-center items-center text-[14px] font-[500] p-4 rounded-md text-white border bg-BlueHomz"
              >
                Next
                <Image
                  src={
                    "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
                  }
                  alt=""
                  height={16}
                  width={16}
                />
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Photos;
