import React from "react";
import { Puff } from "react-loader-spinner";
const MapLoader = () => {
  return (
    <div className="absolute top-0 z-40 h-screen w-full inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#006AFF"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default MapLoader;
