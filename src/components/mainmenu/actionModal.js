import React from 'react'
import CustomizedModal from "./CustomizedModal";
import ThreeDotsLoader from "./ThreeDotsLoader";


const ActionModal = ({
    title,
    description,
    action1,
    action2,
    isOpen,
    loader,action1Title
}) => {
  return (
    <CustomizedModal isOpen={isOpen}>
        <div className="bg-white border w-[333px] flex flex-col sm:w-[464px] py-[24px] px-[16px] sm:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <p className="text-[14px] leading-[19.5px] sm:text-[20px] font-[700] sm:leading-[25.2px] text-center">
            {title}
          </p>
          <p className=" leading-[19.5px] text-[13px] md:text-[16px] font-[400] md:leading-[24px] text-center">
           {description}
          </p>
          <div className="flex gap-[8px] items-center w-full">
            <button
              className="bg-BlueHomz2  flex items-center justify-center  text-white rounded-[4px] w-[196px] h-[48px] p-[12px] "
              onClick={action1}
            >
              {!loader ? (
                <span>{action1Title}</span>
              ) : (
                <ThreeDotsLoader color="#ffffff" />
              )}
            </button>
            <button
              className="border-BlueHomz text-blue-600 rounded-[4px] border h-[48px] p-[12px] w-[196px]"
              onClick={action2}
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomizedModal>
  )
}

export default ActionModal