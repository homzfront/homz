import React from "react";
import Image from "next/image";
import Link from "next/link";
import  { useRouter } from "next/navigation";

function PopUpMenuTwo({ data, handleDelete }) {
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  // console.log(data);
  // const router = useRouter();
//   const handleRowClick = (Profile) => {
//   // console.log(Profile);
//   router.push(`/admin_dashboard/Profiles/${Profile.id}`);
// };


  return (
    <div className="drop-down absolute top-[2.5rem] w-[180px]  py-3  text-GrayHomz font-[500] text-[11px] right-[36px]  border-slate-500 z-30  rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col gap-4">
      <Link href={``}>
         
        {/* <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center"> */}
        <div className="hover:bg-whiteblue h-[40px]  hover:text-BlueHomz flex items-center px-4 gap-3 text-[14px]  rounded-sm  text-center">

            <Image
              src={
                "/static/images/black_user.svg"
              }
              alt=""
              height={16}
              width={16}
              className=""
            />
        <button >
            View Profile
        </button>
          </div>
         
        {/* </div> */}
      </Link>
      <Link href={``}>
       
        {/* <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center"> */}
        <div className="hover:bg-whiteblue h-[40px] px-4 gap-3 text-[14px] hover:text-BlueHomz flex items-center rounded-sm  text-center">
            <Image
              src={
                "/static/images/black_trash.svg"
              }
              alt=""
              height={16}
              width={16}
              className=""
            />
            Delete Profile
          </div>
         
        {/* </div> */}
      </Link>


      {/* <button onClick={() => handleDelete(data.id)}>
          <div className="hover:bg-whiteblue  hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center">
            <Image
              src={
                "/static/dashboard/enterprisemanager/dashboard/trash.png"
              }
              alt=""
              height={16}
              width={16}
              className=""
            />
            Delete Profile
          </div>
        </button> */}
    </div>
  );
}

export default PopUpMenuTwo;
