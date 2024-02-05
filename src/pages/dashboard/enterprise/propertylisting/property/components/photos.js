"use client";
import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/imageUpload";
import {  toast } from "react-toastify";
import LoadingII from "@/components/mainmenu/loadingII";
import {
  updatePropertyCoverPhoto,
  updatePropertyOtherPhoto,
} from "@/api/propertyService";

const Photos = ({ data }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
  const [uploadedImage6, setUploadedImage6] = useState(null);
  const [uploadedImage7, setUploadedImage7] = useState(null);
  const [uploadedImage8, setUploadedImage8] = useState(null);
  const [uploadedImageCoverPhoto, setUploadedImageCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      // setUploadedImage(data.coverPhoto?.url || null);

      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  console.log(uploadedImageCoverPhoto);
  const handleImageUploadCoverPhoto = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImageCoverPhoto(file);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage(file);
  };
  const handleImageUpload2 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage2(file);
  };
  const handleImageUpload3 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage3(file);
  };
  const handleImageUpload4 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage4(file);
  };
  const handleImageUpload5 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage5(file);
  };
  const handleImageUpload6 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage6(file);
  };
  const handleImageUpload7 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage7(file);
  };
  const handleImageUpload8 = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadedImage8(file);
  };

  console.log(data);
  console.log(data?.photos?.[0].publicId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading
  
    setLoading(true); // Set loading to true when submitting the form
  
    // Create an array to hold all promises
    const updatePromises = [];
  
    // Cover photo
    if (uploadedImageCoverPhoto) {
      updatePromises.push(
        updatePropertyCoverPhoto(data._id, uploadedImageCoverPhoto)
      );
    }
  
    // Other photos
    if (uploadedImage) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage,
          data?.photos?.[0].publicId
        )
      );
    }
  
    if (uploadedImage2) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage2,
          data?.photos?.[1].publicId
        )
      );
    }
  
    if (uploadedImage3) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage3,
          data?.photos?.[2].publicId
        )
      );
    }
  
    try {
      // Execute all promises simultaneously
      const responses = await Promise.all(updatePromises);
  
      // Handle responses
      responses.forEach(({ success, updatedImage, error }, index) => {
        if (success) {
          console.log(`Image ${index + 1} successfully updated`, updatedImage);
          toast.success(`Update ${index + 1} successful`);
        } else {
          console.error(`Update ${index + 1} failed`, error);
          toast.error(`Update ${index + 1} failed: ${error}`);
        }
      });
    } catch (error) {
      console.error("Update error", error);
      toast.error("Update failed");
    } finally {
      setLoading(false); // Set loading to false after all updates are attempted
    }
  };
  
  return (
    <div className="px-8 block w-[1055px]">
      {loading ? (
        <LoadingII />
      ) : (
        <div>
          <div className="flex items-start w-full justify-between gap-4 mt-8">
            <div>
              <div>
                <p className="text-[13px] font-[500] text-GrayHomz">
                  Cover photo
                </p>
                <div className="w-[120px] flex justify-start mt-4">
                  <ImageUpload
                    onImageRemove={setUploadedImageCoverPhoto}
                    handleImageUpload={handleImageUploadCoverPhoto}
                    uploadedImage={uploadedImageCoverPhoto}
                    image={data?.coverPhoto?.url}
                  />
                </div>
              </div>
            </div>
            <div className="grid w-[760px]">
              <p className="text-[13px] font-[500] text-GrayHomz">
                Other photos
              </p>
              <div className="flex mt-4 justify-between">
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage}
                    handleImageUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                    image={data?.photos?.[0].url}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage2}
                    handleImageUpload={handleImageUpload2}
                    uploadedImage={uploadedImage2}
                    image={data?.photos?.[1]?.url}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage3}
                    handleImageUpload={handleImageUpload3}
                    uploadedImage={uploadedImage3}
                    image={data?.photos?.[2]?.url}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage4}
                    handleImageUpload={handleImageUpload4}
                    uploadedImage={uploadedImage4}
                  />
                </div>
              </div>
              <div className="flex mt-4 justify-between">
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage5}
                    handleImageUpload={handleImageUpload5}
                    uploadedImage={uploadedImage5}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage6}
                    handleImageUpload={handleImageUpload6}
                    uploadedImage={uploadedImage6}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage7}
                    handleImageUpload={handleImageUpload7}
                    uploadedImage={uploadedImage7}
                  />
                </div>
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    onImageRemove={setUploadedImage8}
                    handleImageUpload={handleImageUpload8}
                    uploadedImage={uploadedImage8}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20%] flex justify-end">
            <button
              onClick={handleSubmit}
              className="text-[14px] font-[500] p-4 rounded-md text-white bg-BlueHomz flex w-[100px] justify-center items-center"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
