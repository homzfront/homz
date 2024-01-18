"use client";
import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/imageUploadII";
import Loading from "@/components/mainmenu/loading";
import api from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Photos = ({ data }) => {
  console.log(data);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [uploadedImage3, setUploadedImage3] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(data?.coverPhoto?.url);
console.log(data?._id);
  useEffect(() => {
    // Check if data and required properties are available
    if (data) {
      // setUploadedImage(data.coverPhoto?.url || null);

      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);
console.log(uploadedImage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Do nothing if already loading

    setLoading(true); // Set loading to true when submitting the form

    if (!uploadedImage) {
      // Handle the case where uploadedImage is not defined
      console.error("No image uploaded");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("coverPhoto", uploadedImage);

    // Convert FormData to object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log(formDataObject);
    
    try {
      const response = await api.patch(
        `/estates/${data._id}/cover-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // add other headers as needed
          },
        }
      );


      
      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response.data);
        setLoading(false);
        toast.success("update successful");
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
        toast.error("update falied");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error", error);
      console.error(error.response?.data?.message);
      setLoading(false);
      // setLoginError(error.response?.data?.message);
    }
  };

  return (
    <div className=" block">
      {loading && <Loading />}
      {
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
      }
      <div className="flex flex-col gap-2">
        <h1 className="text-[23px] font-[700] text-BlueHomz">Add Photos</h1>
        <p className="text-[18px] font-[400] text-GrayHomz ">
          Add at least one photo of your estate
        </p>
        <p className="text-[13px] font-[400] text-GrayHomz2">
          Supported formats are .jpg and .png and file size must not exceed 5 mb
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Cover photo</p>
          <div className="mt-4 w-[235px] flex justify-start">
            <ImageUpload
              onImageRemove={setUploadedImage}
              handleImageUpload={handleImageUpload}
              uploadedImage={uploadedImage}
            />
          </div>
        </div>
        <div className="">
          <p className=" text-[13px] font-[500] text-GrayHomz">Other photos</p>
          <div className="mt-4 flex">
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage2}
                handleImageUpload={handleImageUpload2}
                uploadedImage={uploadedImage2}
              />
            </div>
            <div className="w-[235px] flex justify-start">
              <ImageUpload
                onImageRemove={setUploadedImage3}
                handleImageUpload={handleImageUpload3}
                uploadedImage={uploadedImage3}
              />
            </div>
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
  );
};

export default Photos;
