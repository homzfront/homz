"use client"
import WidgetTwo from "./widgetTwo";




const PopUpWalletCreationForm = ({ closeForm, fetchDataAgain }) => {

  return (
    <div className="absolute top-0 z-20 h-screen w-full inset-0 flex items-center justify-center shadow-lg bg-black bg-opacity-30">
      <div className="w-[550px] h-auto bg-white shadow-lg rounded-md p-8">
        <div className="w-full">
          <div className="w-[100%]">
            <WidgetTwo fetchDataAgain={fetchDataAgain} closeForm={closeForm}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpWalletCreationForm;
