import React from "react";
import { Hourglass } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Hourglass
        visible={true}
        height="15"
        width="15"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#ffff", "#006AFF"]}
      />
    </div>
  );
};

export default Loading;
