import React from "react";

const AcceptAndRejectModel = ({
  header,
  body,
  returnHome,
  returnHomeTwo,
  button,
  buttonTwo,
}) => {
  return (
    <div>
      <div className="absolute top-0 z-20 h-screen w-[1440px]  inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="max-w-[464px] pt-4 m-auto bg-white h-[240px] rounded-md">
          <div className="w-[464px]flex flex-col justify-around items-center gap-4 px-8">
            <h1 className="text-BlackHomz font-[500] text-[20px] text-center">
              {header}
            </h1>
            <p className="text-[16px] font-[500] text-GrayHomz text-center">
              {body}
            </p>
            <button
              onClick={() => {
                returnHome();
                // Optionally close the modal after the action
                // closeModel();
              }}
              className="mt-2 h-[48px] rounded-md w-full bg-BlueHomz text-white text-[16px] font-[500]"
            >
              {button}
            </button>
            <button
              onClick={() => {
                returnHomeTwo();
                // Optionally close the modal after the action
                // closeModel();
              }}
              className="mt-4 h-[48px] rounded-md w-full border border-BlueHomz text-BlueHomz text-[16px] font-[500]"
            >
              {buttonTwo}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptAndRejectModel;
