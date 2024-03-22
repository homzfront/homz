"use client";
import React, { useCallback, useRef, useState } from "react";
import UpdateButton from "../components/updateButton";
import { toast } from "react-toastify";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { updateProfilePicture } from "@/api/tenantSevice";

const ProfilePicture = ({ data }) => {
  console.log(data);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles[0]); // Log the acceptedFiles array to see its structure

    const file = acceptedFiles[0];
    console.log(file);
    setUploadedImage(file);
  }, []);

  console.log(uploadedImage);

  const updateDone = async (e) => {
    e.preventDefault()
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!uploadedImage) {
      console.error("No image uploaded");
      setLoading(false);
      return;
    }

    try {
      const { success, updatedImage, error } = await updateProfilePicture(
        uploadedImage
      );

      if (success) {
        console.log("Form successfully updated", updatedImage);
        setLoading(false);
        setDoneUpdate(true);
        setShowDialogue(false);
        // toast.success("Update successful");
      } else {
        console.error("Update failed", error);
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Update error", error);
      setLoading(false);
      if (
        error?.response?.data?.error?.errors &&
        error.response.data.error.errors.length > 0
      ) {
        const errorMessage = error.response.data.error.errors[0];
        console.error("Error message:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else if (error?.response?.data?.message) {
        const errorMessage = error.response.data.message;
        console.error("Unexpected status code:", errorMessage);
        toast.error(`Update failed: ${errorMessage}`);
      } else {
        toast.error("Update failed");
      }
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null); // Clear the uploaded image
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="mt-8">
      <div className="">
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            <div
              className={`w-[237px] h-[237px] rounded-full flex items-center justify-center ${
                uploadedImage ? "" : ""
              }`}
            >
              {uploadedImage ? (
                <div className="h-full w-full rounded-full">
                  <Image
                    src={URL.createObjectURL(uploadedImage)}
                    height={100}
                    width={100}
                    className="object-cover h-full w-full rounded-full"
                    alt="img"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              ) : !data?.coverPhoto?.url ? (
                <div>
                  {" "}
                  <div className="w-[237px] h-[237px] bg-GrayHomz5 rounded-full flex items-center justify-center">
                    <Image
                      src="/static/dashboard/enterprisemanager/profile/user.png"
                      height={52}
                      width={52}
                      className="cursor-pointer"
                      alt="img"
                      onClick={() => inputRef.current.click()}
                    />
                  </div>
                </div>
              ) : (
                <div className=" flex items-start">
                  <Image
                    src={data?.coverPhoto?.url}
                    height={100}
                    width={100}
                    className="object-cover h-full w-full rounded-full"
                    alt="img"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <Image
                    src={"/static/dashboard/enterprisemanager/estate/add.png"}
                    height={36}
                    width={36}
                    className="cursor-pointer"
                    alt="img"
                    onClick={() => inputRef.current.click()}
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...getInputProps()}
                ref={inputRef}
              />

              {uploadedImage && (
                <Image
                  src="/trush-square.png"
                  height={24}
                  width={24}
                  className="cursor-pointer"
                  alt="img"
                  onClick={handleImageRemove}
                />
              )}
            </div>
          </div>
          {!uploadedImage && (
            <div
              {...getRootProps()}
              className=" flex flex-col justify-around border border-GrayHomz6 w-[283px] h-[155px] rounded-md py-6 px-4 items-center text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <Image
                src={
                  "/static/dashboard/enterprisemanager/profile/Featured_icon.png"
                }
                width={47}
                height={53}
                alt=""
              />
              <p>
                <span className="text=[14px] font-[600] text-BlueHomz">
                  Click to upload
                </span>{" "}
                <span className="text=[14px] font-[400] text-GrayHomz">
                  or drag and drop
                </span>
              </p>
              <p className="text=[14px] font-[400] text-GrayHomz">
                PDF, JPG or PNG (max. 5mb)
              </p>
            </div>
          )}
        </div>
      </div>
      <UpdateButton
        updateDone={updateDone}
        doneUpdate={doneUpdate}
        setDoneUpdate={setDoneUpdate}
        loading={loading}
        showDialogue={showDialogue}
        setShowDialogue={setShowDialogue}
      />
    </div>
  );
};

export default ProfilePicture;
