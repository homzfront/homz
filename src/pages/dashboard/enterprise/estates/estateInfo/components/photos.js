"use client";
import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/imageUploadII";
import { toast } from "react-toastify";
import { updateEstateCoverPhoto } from "@/api/estateService";
import LoadingII from "@/components/mainmenu/loadingII";

const Photos = ({ data }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publicId, setPublicID] = useState([]);
  const [publicId2, setPublicID2] = useState([]);

  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      // setUploadedImage(data.coverPhoto?.url || null);

      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleImageUpload2 = (e, publicId) => {
    const file = e.target.files[0];
    setUploadedImage2(file);
    setPublicID(publicId);
  };

  const handleImageUpload3 = (e, publicId) => {
    const file = e.target.files[0];
    setUploadedImage3(file);
    setPublicID2(publicId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!uploadedImage) {
      setLoading(false);
      return;
    }

    try {
      const { success, updatedImage, error } = await updateEstateCoverPhoto(
        data._id,
        uploadedImage
      );

      if (success) {
        setLoading(false);
        toast.success("Update successful");
      } else {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
      }
    }
  };

  return (
    <div className=" block">
      {loading ? (
        <LoadingII />
      ) : (
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
            <p className="text-[18px] font-[400] text-GrayHomz ">
              Add at least one photo of your property
            </p>
            <p className="text-[13px] font-[400] text-GrayHomz2">
              Supported formats are .jpg and .png and file size must not exceed
              5 mb
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="">
              <p className=" text-[13px] font-[500] text-GrayHomz">
                Cover photo
              </p>
              <div className="mt-4 w-[235px] flex justify-start">
                <ImageUpload
                  onImageRemove={setUploadedImage}
                  handleImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  image={data?.coverPhoto?.url}
                />
              </div>
            </div>
          </div>

          <div className="mt-[10%] flex justify-end">
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
