import React from "react";
import Widget from "./widget";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Setting = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[1147px]">
        <p className="font-[500] text-[20px] text-GrayHomz px-8 pt-8">
          Dashboard Settings
        </p>
        <Widget />
      </div>
    </div>
  );
};

export default Setting;
