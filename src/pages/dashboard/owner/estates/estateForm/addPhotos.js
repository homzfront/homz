"use client";
import React, { useState } from "react";
import ImageUpload from "../components/imageUpload";
import Image from "next/image";

const AddPhotos = ({ handlePageChange, handlePageChangeThree }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);

  return (
    <div className="px-8 block">
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Add at least one photo of your estate
        </p>
        <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p>
      </div>
      <div className="flex mt-8">
        <div className="w-[235px] flex justify-start">
          <ImageUpload
            onImageRemove={setUploadedImage}
            onImageUpload={setUploadedImage}
            uploadedImage={uploadedImage}
          />
        </div>
        <div className="w-[235px] flex justify-start">
          <ImageUpload
            onImageRemove={setUploadedImage2}
            onImageUpload={setUploadedImage2}
            uploadedImage={uploadedImage2}
          />
        </div>
        <div className="w-[235px] flex justify-start">
          <ImageUpload
            onImageRemove={setUploadedImage3}
            onImageUpload={setUploadedImage3}
            uploadedImage={uploadedImage3}
          />
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
        <div>
          <button
            onClick={handlePageChangeThree}
            className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex w-[100px] justify-center items-center"
          >
            Next
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-blue.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotos;
