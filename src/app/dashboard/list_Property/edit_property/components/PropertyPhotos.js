"use client";
import React, { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import { toast } from "react-toastify";
import LoadingII from "@/components/mainmenu/loadingII";
import {
  updatePropertyCoverPhoto,
  updatePropertyOtherPhoto,
} from "@/api/propertyService";

const PropertyPhoto = ({ data }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [uploadedImage4, setUploadedImage4] = useState(null);
  const [uploadedImage5, setUploadedImage5] = useState(null);
  const [uploadedImageCoverPhoto, setUploadedImageCoverPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      // setUploadedImage(data.coverPhoto?.url || null);

      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);


  // console.log(data);


  const handleImageUpload = (imageKey, file) => {
    switch (imageKey) {
      case "uploadedImage":
        setUploadedImage(file);
        break;
      case "uploadedImage2":
        setUploadedImage2(file);
        break;
      case "uploadedImage3":
        setUploadedImage3(file);
        break;
      case "uploadedImage4":
        setUploadedImage4(file);
        break;
      case "uploadedImage5":
        setUploadedImage5(file);
        break;
      case "uploadedImageCoverPhoto":
        setUploadedImageCoverPhoto(file);
        break;
      default:
        break;
    }
  };

  const removeImage = (imageKey) => {
    switch (imageKey) {
      case "uploadedImage":
        setUploadedImage(null);
        break;
      case "uploadedImage2":
        setUploadedImage2(null);
        break;
      case "uploadedImage3":
        setUploadedImage3(null);
        break;
      case "uploadedImage4":
        setUploadedImage4(null);
        break;
      case "uploadedImage5":
        setUploadedImage5(null);
        break;
      case "uploadedImageCoverPhoto":
        setUploadedImageCoverPhoto(null);
        break;
      default:
        break;
    }
  };

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
          data?.photos?.[1]?.publicId
        )
      );
    }

    if (uploadedImage3) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage3,
          data?.photos?.[2]?.publicId
        )
      );
    }

    if (uploadedImage4) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage4,
          data?.photos?.[3]?.publicId
        )
      );
    }

    if (uploadedImage5) {
      updatePromises.push(
        updatePropertyOtherPhoto(
          data._id,
          uploadedImage5,
          data?.photos?.[4]?.publicId
        )
      );
    }

    try {
      // Execute all promises simultaneously
      const responses = await Promise.all(updatePromises);

      // Handle responses
      responses.forEach(({ success, updatedImage, error }, index) => {
        if (success) {
          // console.log(`Image ${index + 1} successfully updated`, updatedImage);
          toast.success(`Update ${index + 1} successful`);
        } else {
          // console.error(`Update ${index + 1} failed`, error);
          toast.error(`Update ${index + 1} failed: ${error}`);
        }
      });
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false); // Set loading to false after all updates are attempted
    }
  };


  return (
    <div className="block w-full">
      {loading ? (
        <LoadingII />
      ) : (
        <div className="w-full flex flex-col md:px-8">
          <div className="flex flex-col md:flex-row md:items-start w-full justify-between md:mt-8">
            <div className="md:w-[25%]">
              <div>
                <p className="text-[13px] font-[500] text-GrayHomz">
                  Cover photo
                </p>
                <div className="w-[120px] flex justify-start mt-4">
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImageCoverPhoto", file)}
                    onImageRemove={() => removeImage("uploadedImageCoverPhoto")}
                    uploadedImage={uploadedImageCoverPhoto}
                    image={data?.coverPhoto?.url}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:grid md:w-[75%]">
              <p className="text-[13px] font-[500] text-GrayHomz">
                Other photos
              </p>
              <div className="mt-4 grid gap-8 grid-cols-1 md:grid-cols-4">
                <div className="w-[120px] flex justify-start">
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImage", file)}
                    onImageRemove={() => removeImage("uploadedImage")}
                    uploadedImage={uploadedImage}
                    image={data?.photos?.[0].url}
                  />
                </div>
                <div className={`w-[120px] flex justify-start ${data?.photos?.[1]?.url ? "" : "hidden"}`}>
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImage2", file)}
                    onImageRemove={() => removeImage("uploadedImage2")}
                    uploadedImage={uploadedImage2}
                    image={data?.photos?.[1]?.url}
                  />
                </div>
                <div className={`w-[120px] flex justify-start ${data?.photos?.[2]?.url ? "" : "hidden"}`}>
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImage3", file)}
                    onImageRemove={() => removeImage("uploadedImage3")}
                    uploadedImage={uploadedImage3}
                    image={data?.photos?.[2]?.url}
                  />
                </div>
                <div className={`w-[120px] flex justify-start ${data?.photos?.[3]?.url ? "" : "hidden"}`}>
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImage4", file)}
                    onImageRemove={() => removeImage("uploadedImage4")}
                    uploadedImage={uploadedImage4}
                    image={data?.photos?.[3]?.url}
                  />
                </div>
                <div className={`w-[120px] flex justify-start ${data?.photos?.[4]?.url ? "" : "hidden"}`}>
                  <ImageUpload
                    handleImageUpload={(file) => handleImageUpload("uploadedImage5", file)}
                    onImageRemove={() => removeImage("uploadedImage5")}
                    uploadedImage={uploadedImage5}
                    image={data?.photos?.[4]?.url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-[10%] flex justify-between w-full md:px-3">
        <div></div>
        <button
          onClick={handleSubmit}
          className="flex cursor-pointer border justify-center md:w-[77px] w-[335px] items-center text-[14px] font-[500] py-[8px] px-[12px] text-white border-white bg-BlueHomz rounded-[4px]"    
          >
          Update
        </button>
      </div>
    </div>
  );
};

export default PropertyPhoto;
