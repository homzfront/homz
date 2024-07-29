import React from "react";
import CustomizedModal from "./CustomizedModal";

const ConfirmationModal = ({
  isOpen,
  title,
  confirmatoryText,
  handleEvent,
  cancel,
  optionText,
  optionText2, color
}) => {
  return (
    
      <CustomizedModal isOpen={isOpen}>
        <div className="bg-white border w-[333px] flex flex-col sm:w-[464px] py-[24px] px-[16px] sm:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className={` text-[14px] leading-[19.5px] sm:text-[20px] font-[700] sm:leading-[25.2px] text-center ${color && color}`}>
            {title}
          </p>
          <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
            {confirmatoryText}
          </p>
          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  sm:w-[400px] h-[48px] p-[12px]"
            onClick={handleEvent}
          >
          {optionText ? optionText : "Yes"}
            
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] border  sm:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              cancel(false);
            }}
          >
          {optionText2? optionText2 : " No, go back"}
           
          </button>
        </div>
      </CustomizedModal>
    
  );
};

export default ConfirmationModal;
