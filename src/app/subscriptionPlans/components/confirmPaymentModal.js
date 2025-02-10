import React from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Warning from "@/components/icons/warning";

const ConfirmPaymentModal = ({ isOpen, setIsOpenModal }) => {

    const selectedPlan= sessionStorage.getItem("selectedPlan")
  return (
    <CustomizedModal isOpen={isOpen}>
      <div className="sm:w-[464px] font-normal text-GrayHomz flex flex-col gap-[24px] rounded-[12px] bg-white p-[32px] border">
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <Warning />
        </div>
        <p className="text-[14px] sm:text-[16px] text-center">
          Your {selectedPlan} will be activated immediately your payment is
          confirmed.
        </p>
        <div className="text-[12px] sm:text-[14px]">
          <button
            onClick={() => {
              setIsOpenModal(false);
            }}
            className="h-[48px] w-full hover:rounded-[4px] font-[500] text-BlueHomz hover:border hover:border-BlueHomz"
          >
            Close
          </button>
        </div>
      </div>
    </CustomizedModal>
  );
};

export default ConfirmPaymentModal;
