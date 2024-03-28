"use client";

import React, { useState } from "react";
import ImageUpload from "../components/imageUpload";
import Image from "next/image";

const Photos = ({
  handlePageChangeTwo,
  handlePageChangeFour,
  uploadedImageCoverPhoto,
  setUploadedImageCoverPhoto,
  uploadedImage,
  setUploadedImage,
  uploadedImage2,
  setUploadedImage2,
  uploadedImage3,
  setUploadedImage3,
  uploadedImage4,
  setUploadedImage4,
  uploadedImage5,
  setUploadedImage5,
}) => {
  const handleImageUploadCoverPhoto = (e) => {
    const file = e.target.files[0];
    setUploadedImageCoverPhoto(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleImageUpload2 = (e) => {
    const file = e.target.files[0];
    setUploadedImage2(file);
  };

  const handleImageUpload3 = (e) => {
    const file = e.target.files[0];
    setUploadedImage3(file);
  };

  const handleImageUpload4 = (e) => {
    const file = e.target.files[0];
    setUploadedImage4(file);
  };

  const handleImageUpload5 = (e) => {
    const file = e.target.files[0];
    setUploadedImage5(file);
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
                onImageRemove={setUploadedImageCoverPhoto}
                handleImageUpload={handleImageUploadCoverPhoto}
                uploadedImage={uploadedImageCoverPhoto}
              />
            </div>
          </div>
        </div>
        <div className="grid w-[75%]">
          <p className="text-[13px] font-[500] text-GrayHomz">Other photos <span className="text-error">*</span></p>
          <div className="flex mt-4 justify-between">
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage}
                handleImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                handleImageUpload={handleImageUpload2}
                uploadedImage={uploadedImage2}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                handleImageUpload={handleImageUpload3}
                uploadedImage={uploadedImage3}
              />
            </div>
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage4}
                handleImageUpload={handleImageUpload4}
                uploadedImage={uploadedImage4}
              />
            </div>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="w-[140px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage5}
                handleImageUpload={handleImageUpload5}
                uploadedImage={uploadedImage5}
              />
            </div>
          </div>
        </div>
      </div >
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
        {uploadedImageCoverPhoto === null || (uploadedImage === null &&
          uploadedImage2 === null &&
          uploadedImage3 === null &&
          uploadedImage4 === null &&
          uploadedImage5 === null) ? (
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
    </div >
  );
};

export default Photos;
