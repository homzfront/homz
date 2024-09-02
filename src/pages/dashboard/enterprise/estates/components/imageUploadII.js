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
    if (inputRef.current) {
      inputRef.current.value = ""; 
    }
  };

  return (
    <div className="flex gap-2">
      <div
        className={`h-[196px] rounded-[8px] w-[196px] justify-center items-center flex ${uploadedImage || image ? "" : "bg-blue-100 "
          }`}
      >
        {uploadedImage ? (
          <Image
            src={URL?.createObjectURL(uploadedImage)}
            height={140}
            width={140}
            alt=""
            layout="fixed" // Specify the desired height
            objectFit="cover"
            objectPosition="center"
            className="object-cover bg-center h-[140px] rounded-[8px]"
            quality={100}
            priority
          />
        ) : image ? (
          <div className="flex items-end gap-1">
            <Image
              src={image}
              height={140}
              width={140}
              alt="img"
              layout="fixed"
              objectFit="cover"
              objectPosition="center"
              className="object-cover bg-center h-[140px] rounded-[8px]"
              quality={100} // Ensure maximum quality
              priority
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
