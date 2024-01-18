"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import FileUpload from "./components/fileUpload";
import UpdateButton from "../components/updateButton";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import api from "@/utils/api";


const ProfilePicture = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);
  const [doneUpdate, setDoneUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles[0]); // Log the acceptedFiles array to see its structure

    const file = acceptedFiles[0];
 console.log(file);
    setUploadedImage(file);

  }, []);

  console.log(uploadedImage);
  const updateDone = async () => {
    try {

      if (loading) return; // Do nothing if already loading

      setLoading(true); // Set loading to true when submitting the form
     // Create FormData
     const formData = new FormData();
     formData.append("coverPhoto", uploadedImage);
 
      // Use uploadedImage or any other relevant data in the update request
      const response = await api.patch("/tenants/profileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // add other headers as needed
        },
      });

      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setDoneUpdate(!doneUpdate);
        setLoading(false);
        setUploadedImage(null);
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      setLoading(false);
      // setLoginError(error.response?.data?.message);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null); // Clear the uploaded image
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="mt-8">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="">
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            <div
              className={`w-[237px] h-[237px] rounded-full flex items-center justify-center ${
                uploadedImage ? "" : "bg-GrayHomz5"
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
              ) : (
                <div className="w-[237px] h-[237px] rounded-full flex items-center justify-center">
                  <Image
                    src="/static/dashboard/enterprisemanager/profile/user.png"
                    height={52}
                    width={52}
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
      />
    </div>
  );
};

export default ProfilePicture;
