import React from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";

const SuccessModal = ({
  isOpen,
  title,
  handleEvent,
  successText,
  optionalText,
  otherButton,
}) => {
  return (
    <div>
      <CustomizedModal
        isOpen={isOpen}
        // onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <div className="flex  flex-col">
              <p className="text-[14px] md:text-[20px] font-[700] leading-[17.64px] md:leading-[25.2px] text-center mb-1">
                {title}
              </p>
              <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
                {successText}
              </p>
            </div>
          </div>
          {otherButton && (
            <button
              className="bg-[#006AFF] text-white rounded-[4px] adminCellBorders h-[48px] p-[12px]"
              onClick={handleEvent}
            >
              {otherButton}
            </button>
          )}
          <button
            className={`${
              otherButton
                ? " text-[#006AFF] bg-white btnBorder "
                : "bg-[#006AFF] text-white "
            } rounded-[4px] h-[48px] p-[12px]`}
            onClick={handleEvent}
          >
            {optionalText ? optionalText : "Close"}
          </button>
        </div>
      </CustomizedModal>
    </div>
  );
};

export default SuccessModal;
