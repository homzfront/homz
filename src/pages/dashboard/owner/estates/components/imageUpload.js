// ImageUpload.js
import React, { useRef } from "react";
import Image from "next/image";

const ImageUpload = ({ uploadedImage, onImageUpload, onImageRemove, width, height }) => {
  const inputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      onImageUpload(formData);
    }
    
  };

  const handleImageRemove = () => {
    onImageRemove(null);
  };

  return (
    <div className="flex gap-2">
      <div
        className={`h-[${height}px] rounded-[8px] w-[${width}px] justify-center items-center flex ${
          uploadedImage
            ? ""
            : "bg-blue-100 "
        }`}
      >
        {uploadedImage ? (
          <Image
            src={URL.createObjectURL(uploadedImage.get("file"))}
            height={height}
            width={width}
            className="object-contain"
            alt="img"
            style={{ width: "auto", height: "auto" }}
          />
        ) : (
            <Image
            src={"/static/dashboard/enterprisemanager/estate/add.png"}
            height={72}
            width={72}
            className="mb-2 cursor-pointer"
            alt="img"
            onClick={() => inputRef.current.click()}
          />
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          ref={inputRef}
        />

        {uploadedImage && (
          <Image
            src={"/trush-square.png"}
            height={24}
            width={24}
            className="cursor-pointer"
            alt="img"
            onClick={handleImageRemove}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
