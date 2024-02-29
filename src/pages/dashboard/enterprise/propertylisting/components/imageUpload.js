// ImageUpload.js
import React, { useRef } from "react";
import Image from "next/image";

const ImageUpload = ({
  uploadedImage,
  handleImageUpload,
  onImageRemove,
  image,
}) => {
  const inputRef = useRef(null);

  const handleImageRemove = () => {
    onImageRemove(null);
  };

  return (
    <div className="flex gap-2">
      <div
        className={`h-[140px] rounded-[8px] w-[140px] justify-center items-center flex ${
          uploadedImage || image ? "" : "bg-blue-100 "
        }`}
      >
        {uploadedImage ? (
          <Image
            src={URL?.createObjectURL(uploadedImage)}
            height={100}
            width={100}
            className="object-cover"
            alt="img"
            style={{ width: "auto", height: "auto" }}
          />
        ) : image ? (
          <div className="flex items-end gap-1">
            <Image
              src={image}
              height={100}
              width={100}
              className="object-cover"
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
        ) : (
          <Image
            src={"/static/dashboard/enterprisemanager/estate/add.png"}
            height={36}
            width={36}
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
            className="cursor-pointer mt-2"
            alt="img"
            onClick={handleImageRemove}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
