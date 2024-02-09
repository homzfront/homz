import React from "react";
import { MutatingDots } from "react-loader-spinner";

const LoadingMutating = () => {
  return (
    <div>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#006AFF"
        secondaryColor="#006AFF"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingMutating;
