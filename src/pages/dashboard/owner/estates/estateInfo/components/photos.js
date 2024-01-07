"use client";
import React, { useState } from "react";
import ImageUpload from "../../components/imageUpload";
import Image from "next/image";

const Photos = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);

  return (
    <div>
      <div className="flex flex-col gap-2 max-h-[800px] justify-between">
        <div className="">
          <div className="mt-4 w-[1110px] h-auto mb-2 py-5 flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage}
              onImageUpload={setUploadedImage}
              uploadedImage={uploadedImage}
              width={1110}
              height={368}
            />
          </div>
        </div>
        <div className="flex mt-8">
          <div className="w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage2}
              onImageUpload={setUploadedImage2}
              uploadedImage={uploadedImage2}
              width={196}
              height={196}
            />
          </div>
          <div className="w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage3}
              onImageUpload={setUploadedImage3}
              uploadedImage={uploadedImage3}
              width={196}
              height={196}
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-[10%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div> */}
    </div>
  );
};

export default Photos;
