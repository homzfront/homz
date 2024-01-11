"use client";
import React, { useState } from "react";
import ImageUpload from "../../components/imageUpload";

const Photos = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
  const [uploadedImage6, setUploadedImage6] = useState(null);
  const [uploadedImage7, setUploadedImage7] = useState(null);
  const [uploadedImage8, setUploadedImage8] = useState(null);
  const [uploadedImageCoverPhoto, setUploadedImageCoverPhoto] = useState(null);

  return (
    <div className="px-8 block w-[1055px]">
      <div className="flex items-start w-full justify-between gap-4 mt-8">
        <div>
          <div>
            <p className="text-[13px] font-[500] text-GrayHomz">Cover photo</p>
            <div className="w-[120px] flex justify-start mt-4">
              <ImageUpload
                onImageRemove={setUploadedImageCoverPhoto}
                onImageUpload={setUploadedImageCoverPhoto}
                uploadedImage={uploadedImageCoverPhoto}
              />
            </div>
          </div>
        </div>
        <div className="grid w-[760px]">
          <p className="text-[13px] font-[500] text-GrayHomz">Other photos</p>
          <div className="flex mt-4 justify-between">
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage}
                onImageUpload={setUploadedImage}
                uploadedImage={uploadedImage}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                onImageUpload={setUploadedImage2}
                uploadedImage={uploadedImage2}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                onImageUpload={setUploadedImage3}
                uploadedImage={uploadedImage3}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage4}
                onImageUpload={setUploadedImage4}
                uploadedImage={uploadedImage4}
              />
            </div>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage5}
                onImageUpload={setUploadedImage5}
                uploadedImage={uploadedImage5}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage6}
                onImageUpload={setUploadedImage6}
                uploadedImage={uploadedImage6}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage7}
                onImageUpload={setUploadedImage7}
                uploadedImage={uploadedImage7}
              />
            </div>
            <div className="w-[120px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage8}
                onImageUpload={setUploadedImage8}
                uploadedImage={uploadedImage8}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[20%] flex justify-end">
        <button className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center">
          Update
        </button>
      </div>
    </div>
  );
};

export default Photos;
