import React from "react";

const YesNOModal = (confirmH, returnH, showConfirmation, returnHome) => {
  return (
    <div>
      {showConfirmation ? (
        <confirmModal returnHome={returnHome} header={"Successful"} body={"Status has successfully been updated"} button={"Okay"}/>
      ) : (
        <div className="absolute top-0 z-20 h-screen w-[1440px]  inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="max-w-[464px] m-auto bg-white h-[240px] rounded-md">
            <div className="w-[464px] px-8 flex flex-col justify-center pt-4 items-center gap-3">
              <div className="text-BlackHomz font-[700] text-[20px]">
                Save Staus Change?
              </div>
              <button
                onClick={()=>confirmH}
                className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
              >
                Yes
              </button>
              <button
                onClick={returnH}
                className="h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[700]"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YesNOModal;
