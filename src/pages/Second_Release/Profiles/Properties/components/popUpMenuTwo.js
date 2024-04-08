import React from "react";
import Image from "next/image";
import Link from "next/link";

function PopUpMenuTwo({ data, handleDelete, view, select }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // console.log(data);
  return (
    <div className={`drop-down relative right-[34px] top-[-45px] w-[173px] py-3  text-GrayHomz font-[500] text-[11px]  border-slate-500  rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col gap-0`}>
      <Link href={``}>
         
        {/* <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center"> */}
        <button className="hover:bg-whiteblue h-[40px] w-[173px]  hover:text-BlueHomz flex items-center px-4 gap-3 text-[14px]  rounded-sm  text-center" onClick={view}>
            {/* <Image
              src={
                "/static/images/black_user.svg"
              }
              alt=""
              height={16}
              width={16}
              className=""
            /> */}
            View
          </button>
         
        {/* </div> */}
      </Link>
      <Link href={``}>
       
        {/* <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center"> */}
        <div className="hover:bg-whiteblue h-[40px] w-[173px] px-4 gap-3 text-[14px] hover:text-BlueHomz flex items-center rounded-sm  text-center">
            {/* <Image
              src={
                "/static/images/black_trash.svg"
              }
              alt=""
              height={16}
              width={16}
              className=""
            /> */}
            Download
          </div>
         
        {/* </div> */}
      </Link>


      <button onClick={handleDelete}>
          <div className="hover:bg-whiteblue w-[173px] text-[14px] hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm text-center">
            {/* <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/trash.png"
              }
              alt=""
              height={16}
              width={16}
              className=""
            /> */}
            Delete
          </div>
        </button>
    </div>
  );
}

export default PopUpMenuTwo;
