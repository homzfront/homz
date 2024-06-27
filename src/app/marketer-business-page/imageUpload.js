import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ImageUpload = ({propertyData}) => {
  const [errorMsg2, setErrorMsg2] = useState("");
  const [marketerPhoto, setMarketerImage] = useState(null);
  const [ImageSrc, setImageSrc] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const marketerImageRef = useRef(null);

  const uploadProfilePhoto = () => {
    if (marketerImageRef.current) {
      marketerImageRef.current.click();
    }
  };
  const displayMarketerImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setErrorMsg2("Only, JPG, JPEG or PNG files are allowed.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMsg2("File size exceeds 5MB.");
        return;
      } else {
        setErrorMsg2("");
        setMarketerImage(file);
        setFileUploaded(true);
        setImageSrc(URL.createObjectURL(file));
      }
    }
  };
  

  return (
    
      <div className="">
        <div>
          <input
            type="file"
            name="marketerImage"
            ref={marketerImageRef}
            id="marketerImage"
            onChange={displayMarketerImage}
            style={{ display: "none" }}
            accept="image/png, image/jpg, image/jpeg"
          />

          <p
            className={`md:w-[181px] md:h-[181px] h-[100px] w-[100px] sm:rounded-[100%] border-[10.53px] border-[#FFFFFF] rounded-[315.79px] flex justify-center items-center mx-auto sm:border-0 ${
              !fileUploaded && "bg-[#D5D5D5]"
            }`}
          >
            <Image
              src={fileUploaded ? ImageSrc : propertyData?.lisitingPropertyId?.businessInfo?.businessLogo?.url ? propertyData.lisitingPropertyId.businessInfo.businessLogo.url :"/static/images/marketerDefaultImage.png"}
              alt="Marketer's Photo"
              className={"sm:w-[181px] md:h-[181px] h-full w-full rounded-[100%] cursor-pointer"}
              width={181}
              height={181}
              onClick={uploadProfilePhoto}

            />
          </p>
        </div>
      </div>

  );
};

export default ImageUpload;
