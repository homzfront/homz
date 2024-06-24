import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoader = ({color}) => {
  return (
    <div>
      <ThreeDots
        visible={true}
        height="30"
        width="30"
        color={color}
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default ThreeDotsLoader;
