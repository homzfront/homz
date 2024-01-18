import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="absolute top-0 z-40 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#006AFF"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
