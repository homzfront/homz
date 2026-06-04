import React, { useRef, useState } from "react";
import PropertyPhoto from "./PropertyPhotos";
import ContactInfo from "./contactInfo";
import useProfileStore from "@/store/profile";
import Image from "next/image";

const ContactInfoMedia = ({
  BackToRentalsInfo,
  setUploadedCoverPhoto,
  setUploadedOtherPhotos,
  handleSubmitData,
  setVideoLinksData,
  setSaveToDraft,
}) => {
  const { profile } = useProfileStore();
  const [email, setEmail] = useState(profile?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [whatsappFormatted, setWhatsAppFormatted] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const mediaRef = useRef();
  const onSubmit = () => {
    if (error || error2) {
      return;
    }
    const data = {};
    data.phoneNumber = phoneNumber;
    data.email = email;
    data.whatsapp = whatsappFormatted;

    if (mediaRef.current) {
      // Use getMediaData to read photo data synchronously — avoids the async
      // state timing bug where setUploadedCoverPhoto/setUploadedOtherPhotos
      // wouldn't be reflected in the parent before handleSaved fired
      const { coverPhoto, otherPhotos, videoLinks } = mediaRef.current.getMediaData();
      handleSubmitData(data, coverPhoto, otherPhotos, videoLinks);
    } else {
      handleSubmitData(data, null, [], null);
    }
  };
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex sm:gap-[25px] gap-6 sm:flex-row flex-col">
        <ContactInfo
          handleSubmitData={handleSubmitData}
          setSaveToDraft={setSaveToDraft}
          setIsValid={setIsValid}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          email={email}
          whatsappFormatted={whatsappFormatted}
          setWhatsAppFormatted={setWhatsAppFormatted}
          error={error}
          setError={setError}
          error2={error2}
          setError2={setError2}
        />

        <PropertyPhoto
          ref={mediaRef}
          BackToRentalsInfo={BackToRentalsInfo}
          setUploadedCoverPhoto={setUploadedCoverPhoto}
          setUploadedOtherPhotos={setUploadedOtherPhotos}
          setSaveToDraft={setSaveToDraft}
          setVideoLinksData={setVideoLinksData}
        />
      </div>

      <div className="flex mb-0 flex-row justify-between sm:mt-20 mt-10  md:px-0 paginate">
        <div>
          <button
            onClick={BackToRentalsInfo}
            // className="text-[14px] font-[500] p-4 rounded-md text-BlueHomz border border-BlueHomz flex h-[36px w-[36px] md:w-[100px] justify-center items-center"
            className="text-[14px] font-[500] md:py-[8px] md:px-[12px] rounded-[4px] md:text-BlueHomz border text-[#D5D5D5]  h-[39px] w-[45px] md:h-full md:w-full flex items-center justify-center gap-1 "
          >
            <Image
              src="/static/images/blue-arrow-left.svg"
              width={20}
              height={20}
              alt=""
              className="hidden md:block"
            />
            <Image
              src="/static/images/black-arrow-left.svg"
              width={22}
              height={22}
              alt=""
              className="md:hidden"
            />

            <span className="hidden md:block">Previous</span>
          </button>
        </div>
        <button
          disabled={!isValid ? true : false}
          className={`flex md:mr-14 border gap-1 justify-center  md:w-fit  items-center text-[14px] font-[500] py-[8px] px-[12px] ${
            !isValid
              ? "text-[#D5D5D5] bg-[#E6E6E6] border-[#A9A9A9]"
              : "text-white border-white bg-BlueHomz"
          } rounded-[4px] `}
          type="submit"
          onClick={onSubmit}
        >
          List Property
          {!isValid ? (
            <Image
              src={"/static/images/Vector.svg"}
              alt=""
              height={8}
              width={8}
            />
          ) : (
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-right-white.png"
              }
              alt=""
              height={16}
              width={16}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactInfoMedia;