import React, { useState } from "react";
import Image from "next/image";

const ContactInfo = ({
  BackToPropertyPhotos,
  handleSubmitData,
  // loading,
}) => {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsAppLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);


  const onSubmit = () => {
    const phoneNumberRegex = /^\d{11}$/;
    const whatsappLinkRegex = /^https:\/\/wa\.me\//;
    const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!phoneNumberRegex.test(phoneNumber)) {
      setError("Phone number must be 11 digits");
      return;
    }
    if (whatsapp) {
      if (!whatsappLinkRegex.test(whatsapp)) {
        setError("Invalid whatsApp link. Whatsapp link must start with `https://wa.me/`");
        return;
      }
    }
    if (email) {
      const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
      if (!validEmail.test(email)) {
        setError("Invalid email link format");
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
    <div className="w-full">
      <div className="md:text-[23px] font-[700] text-BlueHomz leading-[20.16px] md:leading-[28.98px] ">
        Contact Information
      </div>
      <div className="leading-[16.38px] text-[13px] md:text-[14px] font-[400]">
        Kindly fill in your correct contact information
      </div>
      <div
        className=" flex flex-col w-full "
      >
        <div className="flex w-full gap-[2rem] mt-5 text-[13px] md:text-[14px] font-[500] text-GrayHomz ">
          <div className="profiles flex w-full flex-col space-y-4">
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
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
              />
            </div>
            <div>
              <label htmlFor="email">
                Email
              </label>
              <br />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                placeholder="Enter email"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
              />
            </div>
            <div>
              <label htmlFor="whatsapp"> WhatsApp Link</label>
              <br />
              <input
                placeholder="Enter WhatsApp Link"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsAppLink(e.target.value)
                  setError("")
                }}
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
            className={`flex md:mr-14 border justify-center  w-[122px] md:w-[142px] items-center text-[12.5px] md:text-[14px] font-[500] py-[8px] px-[12px] ${!isValid
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
