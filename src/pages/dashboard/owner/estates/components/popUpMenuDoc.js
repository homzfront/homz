import React from 'react'
import Image from "next/image";
import Link from "next/link";

function PopUpMenuDoc({ data }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  console.log(data);
    return (
      <div className="drop-down absolute top-6   text-GrayHomz font-[500] text-[13px] right-[15px] border   rounded-md bg-white flex flex-col items-center justify-around">
        <Link href={`/dashboard/property-owner/tenants/profile/${data.id}`}>
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1  rounded-sm w-[160px] text-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/estate/eye.png"
              }
              alt=""
              height={17}
              width={16}
              style={{ height: "auto", width: "auto" }}
            />
            View
          </div>
        </Link>
        <button >
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/estate/document-download.png"
              }
              alt=""
              height={17}
              width={16}
              className=""
            />
            Download
          </div>
        </button>
      </div>
    );
  }

  export default PopUpMenuDoc;