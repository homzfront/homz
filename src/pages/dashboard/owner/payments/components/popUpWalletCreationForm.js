"use client"
import CreateTransactionPin from "./createTransactionPin";
import WidgetTwo from "./widgetTwo";




const PopUpWalletCreationForm = ({ closeForm, fetchDataAgain }) => {

  return (
    <div className="absolute px-8 md:px-0 top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="'w-full md:w-[550px]">
        <CreateTransactionPin closeForm={closeForm} />
      </div>
    </div>
  );
};

export default PopUpWalletCreationForm;
