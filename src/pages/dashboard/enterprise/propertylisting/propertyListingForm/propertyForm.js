import React from "react";
import Widget from "./widget";
import Image from "next/image";

const PropertyForm = ({returnToStartRegistration}) => {
  return (
    <div>
        <div className="px-8 pt-8 flex items-center cursor-pointer" onClick={returnToStartRegistration}>
          <div>
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/arrow-left.png"
              }
              alt=""
              height={16}
              width={16}
            />
          </div>
          <div className="text-GrayHomz2 text-[14px] font-[400]">Go Back</div>
        </div>
      <Widget  returnToStartRegistration={returnToStartRegistration}/>
    </div>
  );
};

export default PropertyForm;
