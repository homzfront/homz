import React, { useState } from "react";
import SuccessModal from "@/components/mainmenu/SuccessModal";

const RequestCard = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [sendRequest, setSendRequest] = useState(false);

  const phoneFormat = /^((\+234)+|0)[7-9]{1}[0-9]{9}$/;

  const closeSuccessModal = () => {
    setSendRequest(false);
  
  };
  return (
    <div className=" flex flex-col gap-4 h-fit border rounded-[12px] p-[20px] w-[100%] mt-2 sm:mt-0">
      <p className="text-[16px] leading-[24px] font-[500] text-[#181717]">
        Request Callback
      </p>
      <div className="">
        <label
          className="text-[11px] md:text-[14px] font-[500] text-BlackHomz"
          htmlFor="name"
        >
          Name
        </label>
        <br />
        <input
          className="h-[45px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] sm:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
          placeholder="e.g Victor Desmond"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="text-[11px] md:text-[14px] font-[500] text-BlackHomz"
        >
          {" "}
          Phone Number
        </label>
        <br />
        <input
          type="text"
          placeholder="e.g 00000000000"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            setError("");
          }}
          className="h-[45px] p-[8px] md:p-[12px] rounded-[4px] border w-[100%] text-[13px] sm:text-[14px] font-[500] text-GrayHomz placeholder:text-[13px] pl-2"
          onBlur={() => {
            if (phoneNumber === "") {
              setError("");
              return;
            }
            if (!phoneFormat.test(phoneNumber)) {
              setError("Invalid Phone number");
              return;
            }
          }}
        />
      </div>
      {error && (
        <div className="italic text-error text-[11px] font-[400]">{error}</div>
      )}
      <button className="text-white bg-[#006AFF] py-[8px] px-[12px] rounded-[4px]  text-[14px] leading-[16.5px] font-[400]" onClick={()=>setSendRequest(true)}>
        Send Request
      </button>
      <SuccessModal
        isOpen={sendRequest}
        title="Callback Request Sent Successfully"
        handleEvent={closeSuccessModal}
      />
    </div>
  );
};
export default RequestCard;
;
