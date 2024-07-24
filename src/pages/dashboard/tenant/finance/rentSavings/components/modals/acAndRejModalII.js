import LoadingFormII from "@/components/mainmenu/loadingFormII";
import React from "react";

const AcAndRejModalII = ({
  header,
  body,
  returnHome,
  returnHomeTwo,
  button,
  buttonTwo,
  loading
}) => {
  return (
    <div>
      <div className="absolute top-0 z-20 h-screen w-full  inset-0 flex items-center  bg-black bg-opacity-30">
        <div className="max-w-[464px] p-2 m-auto bg-white h-[260px] rounded-md">
          <div className="flex flex-col justify-around items-center h-full p-6">
            <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
              {header}
            </h1>
            <p className="text-[16px] font-[500] text-warning2 text-center">
              {body}
            </p>
            <button
              onClick={returnHome}
              className={`mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500] ${loading ? "pointer-events-none w-full flex justify-center" : ""} `}
            >
              {loading ? <LoadingFormII /> : button}
            </button>
            <button
              onClick={returnHomeTwo}
              className={`mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500] ${loading ? "pointer-events-none" : ""}`}
            >
              {buttonTwo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcAndRejModalII;
