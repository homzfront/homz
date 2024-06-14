import React from "react";
import CustomizedModal from "./CustomizedModal";
import Image from "next/image";

const SuccessModal = ({
  isOpen,
  title,
  handleEvent,
  handleOptionButton,
  successText,
  optionalText,
  optionTextnbutton,
  buttonColor
}) => {
  return (
    <div>
      <CustomizedModal
        isOpen={isOpen}
        // onRequestClose={closeSuccessModal}
      >
        <div className="bg-white border flex flex-col w-[333px] md:w-[464px]  p-[32px] rounded-[12px] gap-[18px]">
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
          {optionTextnbutton && (
            <button
              className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  sm:w-[400px] h-[48px] p-[12px]"
              onClick={handleOptionButton}
            >
              {optionTextnbutton}
            </button>
          )}
          <button
            className={`${buttonColor? "border-BlueHomz2 text-BlueHomz": "bg-BlueHomz2 text-white"} font-[500]  rounded-[4px] border h-[48px] p-[12px]`}
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
