import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <Image
        src="/loading/Spinner-1s-200px.gif" // Replace with the actual path to your downloaded spinner
        alt="Loading Spinner"
        height={16}
        width={16}
        // className="w-16 h-16" // Adjust the size as needed
      />
    </div>
  );
};

export default Loading;
