import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Image from "next/image";

const FileUpload = () => {

  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file);
    setUploadedImage(formData);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

        }
      );

      setUploadStatus("success");
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      setUploadStatus("error");
      console.error("Error uploading file:", error);
    }
  }, []);

  const handleImageRemove = () => {
    setUploadedImage(null); // Clear the uploaded image
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
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
                src={URL.createObjectURL(uploadedImage.get("file"))}
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
   {
    !uploadedImage && (
        <div {...getRootProps()} className=" flex flex-col justify-around border border-GrayHomz6 w-[283px] h-[155px] rounded-md py-6 px-4 items-center text-center cursor-pointer">
        <input {...getInputProps()} />
        <Image src={"/static/dashboard/enterprisemanager/profile/Featured_icon.png"} width={47} height={53} alt=""/>
        <p><span className="text=[14px] font-[600] text-BlueHomz">Click to upload</span> <span className="text=[14px] font-[400] text-GrayHomz">or drag and drop</span></p>
        <p className="text=[14px] font-[400] text-GrayHomz">
        PDF, JPG or PNG (max. 5mb)
        </p>
      </div>
    )
   }
    </div>
  );
};





export default FileUpload;
