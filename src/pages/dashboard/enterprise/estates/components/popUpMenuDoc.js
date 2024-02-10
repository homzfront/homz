import React from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteEstateDocSpecificUSer } from "@/api/estateService";

function PopUpMenuDoc({ data, id, fetchDataAgain }) {
  if (!data || !data?.fileDocument?.url || !id) {
    return null; // or handle accordingly, e.g., return a loading state
  }

  const removeData = async () => {
    console.log(data._id);
    console.log(data);
    try {
      const response = await deleteEstateDocSpecificUSer({
        id,
        data_id: data._id,
      });
      console.log(response);
      // Handle the response if needed
      fetchDataAgain(); // Assuming fetchDataAgain is defined and passed as a prop
    } catch (error) {
      // Handle errors if the fetch fails
    }
  };
  console.log(data._id);
  console.log(data);
  return (
    <div className="drop-down absolute top-6 text-GrayHomz font-[500] text-[13px] right-[15px] border rounded-md bg-white flex flex-col items-center justify-around">
      <Link
        href={data?.fileDocument?.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="hover:bg-whiteblue hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center">
          <Image
            src={"/static/dashboard/enterprisemanager/estate/eye.png"}
            alt=""
            height={17}
            width={16}
            style={{ height: "auto", width: "auto" }}
          />
          View
        </div>
      </Link>

      <button
        onClick={removeData}
        className="hover:bg-whiteblue hover:text-BlueHomz flex items-center px-4 h-[40px] gap-1 rounded-sm w-[160px] text-center"
      >
        <Image
          src={
            "/static/dashboard/enterprisemanager/estate/document-download.png"
          }
          alt=""
          height={17}
          width={16}
        />
        Delete
      </button>
    </div>
  );
}

export default PopUpMenuDoc;
