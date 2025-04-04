import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingFormIII = () => {
  return (
    <ThreeDots
      visible={true}
      height="20"
      width="20"
      color="#006AFF"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoadingFormIII;
