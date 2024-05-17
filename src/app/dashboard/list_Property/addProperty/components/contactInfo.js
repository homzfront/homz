import React, { useState } from "react";
import Image from "next/image";
import useProfileStore from "@/store/profile";

const ContactInfo = ({
  BackToPropertyPhotos,
  handleSubmitData,
  // loading,
}) => {
  const { profile } = useProfileStore();
  const [email, setEmail] = useState(profile?.email || "");
  const [whatsapp, setWhatsAppLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);


  const onSubmit = () => {
    const phoneNumberRegex = /^\d{11}$/;
    const whatsappLinkRegex = /^https:\/\/wa\.me\//;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setError("Phone number must be 11 digits");
      return;
    } if (whatsapp) {
      if (!whatsappLinkRegex.test(whatsappLink)) {
        setError("Invalid whatsApp link. Whatsapp link must start with `https://wa.me/`");
        return;
      }
    }
    const data = {
      ...(phoneNumber && { phoneNumber }),
      ...(whatsapp && { whatsapp }),
      ...(email && { email }),
    };
    handleSubmitData(data);
  };
  return (
    <div className="">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px] duoViewPoint">
        Contact Information
      </div>
      <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400]">
        Kindly fill in your correct contact information
      </div>
      <div
        className=" flex flex-col md:w-full duoViewPoint"
      >
        <div className="flex  gap-[2rem] mt-5">
          <div className="profiles flex  flex-col space-y-4">
            <div>
              <label htmlFor="phoneNumber">
                {" "}
                Phone Number <span className="text-red-500 text-[15px]">*</span>
              </label>
              <br />
              <input
                type="number"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value)
                  setIsValid(true);
                  setError("");
                }}
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border duoViewPoint w-[335px]"
              />
            </div>
            <div>
              <label htmlFor="email">
                Email
                {/* <span className="text-red-500 text-xs">*</span> */}
              </label>
              <br />
              <input
                // {...register("email")}
                value={email}
                placeholder="Enter email"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border duoViewPoint w-[335px] opacity-60"
                disabled
              />
            </div>
            <div>
              <label htmlFor="whatsapp"> WhatsApp Link</label>
              <br />
              <input
                placeholder="Enter WhatsApp Link"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border duoViewPoint w-[335px]"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsAppLink(e.target.value)
                  setError("")
                }}
              // onBlur={() => {
              //   if (whatsappLink.trim() !== "") {
              //     // Remove all non-numeric characters from the phone number
              //     const phoneNumber = whatsappLink
              //       .replace(/[^0-9]/g, "")
              //       .replace(/^0+/, "");
              //     setWhatsAppLink(`https://wa.me/${phoneNumber}`);
              //   }
              // }}
              />
            </div>
            {
              error && <div className="italic text-error text-[11px] font-[400]">
                {error}
              </div>
            }
          </div>
        </div>
        <div className="mt-[8rem] px-3 flex justify-between">
          <div>
            <p
              className="text-[14px] font-[500] md:py-[8px] md:px-[12px]  rounded-[4px] md:text-BlueHomz border text-[#D5D5D5]  h-[36px] w-[36px] md:h-full md:w-full flex items-center justify-center gap-1 cursor-pointer"
              onClick={BackToPropertyPhotos}
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
            </p>
          </div>
          <button
            disabled={!isValid ? true : false}
            className={`flex md:mr-14 border justify-center  w-[122px]  items-center text-[14px] font-[500] py-[8px] px-[12px] ${!isValid
              ? "text-GrayHomz bg-GrayHomz5 border-[#A9A9A9]"
              : "text-white border-white bg-BlueHomz"
              } rounded-[4px]`}
            onClick={onSubmit}
          >
            List Property
            {!isValid ? (
              <Image
                src={
                  "/static/dashboard/enterprisemanager/dashboard/arrow-right.png"
                }
                alt=""
                height={16}
                width={16}
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
    </div>
  );
};

export default ContactInfo;
