import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CardMenus({
  data,
  handleDelete,
  publish,
  setDeleteProperty,
  handleUnpublished,
  handlePublished,
  setIsMenuOpen,
  refs,
  setModalIsOpen
}) {
  // const router= useRouter();
  // onClick={(e) => {
  //   router.push(`/dashboard/list_Property/edit_property/${data?._id}`);
  // }}
  if (!data) {
    return null; // or handle accordingly, e.g., return a loading state
  }
  return (
    <div
      className="absolute z-50 md:top-[1.55rem] top-[1rem] right-[5px]  md:right-[6px] mt-2 py-[12px] px-1  w-[207px] bg-white shadow-md rounded-[12px]"
      ref={refs}
    >
      <Link 
      href={`/dashboard/list_Property/edit_property/${data?._id}`}
        className=" flex gap-3 items-center text-[14px] font-[500] leading-[21px] text-[#4E4E4E] p-[8px] hover:bg-gray-100 w-full"
      
      >
        <Image
          src="/static/images/new_edit-2.svg"
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>Edit details</span>
      </Link>
      <button
        className=" flex gap-3 items-center text-[14px] font-[500] leading-[21px] text-[#4E4E4E] p-[8px] hover:bg-gray-100 w-full"
        onClick={(e) => {
          setDeleteProperty(true);
        }}
      >
        <Image
          src="/static/images/black_trash.svg"
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>Delete</span>
      </button>
      <button
        className={` flex gap-3 items-center text-[14px] font-[500] leading-[21px] ${
          publish ? "text-[#D92D20]" : "text-[#006AFF]"
        } p-[8px] hover:bg-gray-100 w-full`}
        onClick={publish ? handleUnpublished : handlePublished}
      >
        <Image
          src={`/static/images/${publish ? "stop-circle.svg" : "send-2.svg"}`}
          alt=""
          width={16}
          height={16}
          className="h-[13px] w-[13px] md:w-[16px] md:h-[16px] cursor-pointer"
        />
        <span>{publish ? "Unpublish" : "Publish"}</span>
      </button>
      <button className="w-full flex gap-[10px] h-[37px] md:px-[8px] text-[14px] items-center justify-start rounded-[8px] text-white bg-[#DC6803] flex-shrink-0 " onClick={()=>setModalIsOpen(true)}>
        <Image
          src="/static/images/orange-send.svg"
          alt=""
          height={16}
          width={16}
          className=""
        />
        <span>Promotion options</span>
      </button>
    </div>
  );
}

export default CardMenus;
