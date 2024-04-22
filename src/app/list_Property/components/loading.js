import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoadingII = () => {
  return (
    <div className="h-[35vh] z-40 inset-0 flex items-center justify-center ">
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

export default LoadingII;
