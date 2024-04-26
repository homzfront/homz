import React from "react";
import { ThreeDots } from "react-loader-spinner";

const LoadingForm = () => {
  return (
    <ThreeDots
      visible={true}
      height="40"
      width="40"
      color="#006AFF"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoadingForm;
