import React from "react";
import Widget from "./widget";
import Image from "next/image";
import Link from "next/link";

const PropertyForm = () => {
  return (
    <div>
      <Link href={""}>
        <div className="px-8 pt-8 flex items-center">
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
      </Link>
      <Widget />
    </div>
  );
};

export default PropertyForm;
