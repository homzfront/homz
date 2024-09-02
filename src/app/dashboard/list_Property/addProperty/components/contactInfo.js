import React, { useState } from "react";
import Image from "next/image";
import useProfileStore from "@/store/profile";

const ContactInfo = ({
  BackToPropertyPhotos,
  handleSubmitData,
  setSaveToDraft,
}) => {
  const { profile } = useProfileStore();
  const [email, setEmail] = useState(profile?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsapp, setWhatsAppLink] = useState("");
  const [whatsappFormatted, setWhatsAppFormatted] = useState("");
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [isFocus, setFocus] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const phoneFormat = /^((\+234)+|0)[7-9]{1}[0-9]{9}$/;

  const onSubmit = () => {
 
    const data = {};
    data.phoneNumber=phoneNumber;
    data.email=email;
    data.whatsapp=whatsappFormatted
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
      <div className=" flex flex-col w-full ">
        <div className="flex w-full gap-[2rem] mt-5 text-[13px] md:text-[14px] font-[500] text-GrayHomz ">
          <div className="profiles flex w-full flex-col space-y-4">
            <div>
              <label htmlFor="phoneNumber">
                {" "}
                Phone Number <span className="text-red-500 text-[15px]">*</span>
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setIsValid(true);
                  setError("");
                }}
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                onBlur={() => {
                  if (!phoneFormat.test(phoneNumber)) {
                    setError("Invalid Phone number");
                    return;
                  }
                }}
              />
            </div>
            {error && (
              <div className="italic text-error text-[11px] font-[400]">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                value={email}
                placeholder="Enter email"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                disabled
              />
            </div>
            <div>
              <label htmlFor="whatsapp"> WhatsApp</label>
              <br />
              <input
                placeholder="Enter WhatsApp Number"
                className="h-[43px] md:h-[45px] md:w-[473px] md:p-[12px] rounded-[4px] pl-2 border placeholder:text-[13px] w-[100%]"
                value={isFocus ? whatsapp : whatsappFormatted}
                onChange={(e) => {
                  setWhatsAppLink(e.target.value);
                  setError2("");
                }}
                onBlur={() => {
                  setFocus(false);
                  if (!phoneFormat.test(whatsapp)) {
                    setError2("Invalid Phone number");
                    setFocus(true);
                  } else {
                    setError2("");
                    const phoneNumber = whatsapp
                      .replace(/[^0-9]/g, "")
                      .replace(/^0+/, "");
                    setWhatsAppFormatted(`https://wa.me/${phoneNumber}`);
                  }
                }}
                onSelect={() => setFocus(true)}
              />
            </div>
            {error2 && (
              <div className="italic text-error text-[11px] font-[400]">
                {error2}
              </div>
            )}
          </div>
        </div>
        <div className="mt-[8rem] sm:px-3 flex justify-between">
          <div>
            <p
              className="text-[14px] font-[500] py-[8px] px-[12px]  rounded-[4px] md:text-BlueHomz  text-BlueHomz border border-BlueHomz  h-[36px] w-[120px] md:h-full md:w-full flex items-center justify-center gap-1 cursor-pointer"
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
                className="hidden"
              />

              <span className="block">Previous</span>
            </p>
          </div>
          {/* <button
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
          </button> */}
          <div className="flex gap-3 items-center">
            <button
              disabled={!isValid ? true : false}
              className={`hidden sm:flex gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px]  ${"text-[#c0bfbf]"
                // !isValid ? "text-[#D5D5D5]" : "text-BlueHomz"
              }`}
              // onClick={() => setSaveToDraft(true)}
            >
              <Image
                src={`/static/images/clock2.svg`}
                // src={`/static/images/${
                //   !isValid ? "clock2.svg" : "blueclock.svg"
                // }`}
                alt=""
                height={16}
                width={16}
              />
              <span>Save to draft</span>
            </button>
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
        <p
          // disabled={!isValid ? true : false}
          className={`mx-auto my-2 flex md:hidden gap-2 items-center text-[14px] font-[500] py-[8px] px-[12px] rounded-[4px] mt-4 ${
            "text-[#c0bfbf]"
            // isValid ? "text-[#D5D5D5]" : "text-BlueHomz"
          }`}
          // onClick={() => setSaveToDraft(true)}
        >
          <Image
            src="/static/images/clock2.svg"
            // src={`/static/images/${isValid ? "clock2.svg" : "blueclock.svg"}`}
            alt=""
            height={16}
            width={16}
          />
          <span>Save to draft</span>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
