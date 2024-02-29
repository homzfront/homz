import React from "react";
import Widget from "./widget";

const EstateInfo = ({ data }) => {
  return (
    <div className="p-8">
      <div>
        <div>
          <p className="text-[16px] sm:text-[20px] font-[400] sm:font-[500] text-GrayHomz">
            Property Information
          </p>
        </div>

        <Widget data={data} />
      </div>
    </div>
  );
};

export default EstateInfo;
