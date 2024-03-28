"use client";
import React, { useState } from "react";
import ImageUpload from "../components/imageUpload";
import Image from "next/image";

const AddPhotos = ({
  handlePageChange,
  handlePageChangeThree,
  uploadedImage,
  uploadedImage2,
  uploadedImage3,
  setUploadedImage,
  setUploadedImage2,
  setUploadedImage3,
}) => {

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

  return (
    <div className="px-8 block">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Add cover photo and at least one photo of your property
        </p>
        <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Cover photo <span className="text-red-500 font-[10px]">*</span></p>
          <div className="mt-4 w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage}
              handleImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
              file={"coverPhoto"}
            />
          </div>
        </div>
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Other photos <span className="text-red-500 font-[10px]">*</span></p>
          <div className="mt-4 flex">
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                handleImageUpload={handleImageUpload2}
                uploadedImage={uploadedImage2}
                file={"photos"}
              />
            </div>
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                handleImageUpload={handleImageUpload3}
                uploadedImage={uploadedImage3}
                file={"photos"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20%] flex justify-between">
        <div>
          <button
            onClick={handlePageChange}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            {" "}
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
            Previous
          </button>
        </div>
        {uploadedImage !== null && uploadedImage2 !== null ? (
          <div className="">
            <button
              onClick={handlePageChangeThree}
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AddPhotos;
