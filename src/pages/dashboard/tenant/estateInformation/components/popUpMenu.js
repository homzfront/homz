import React from "react";
import Image from "next/image";
import Link from "next/link";
import fileDownload from 'js-file-download';


function PopUpMenu({ data, dropdownRef }) {

  const handleDownload = (url, fileName) => {
    if (url === undefined && fileName === undefined) {
      return
    }
    fetch(url)
      .then(response => response?.blob())
      .then(blob => {
        fileDownload(blob, `${fileName}.pdf`);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        // Handle error
      });
  };

  return (
    <div ref={dropdownRef} className="drop-down absolute top-6   text-GrayHomz font-[500] text-[13px] right-[15px] border   rounded-md bg-white flex flex-col items-center justify-around">
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
        onClick={() => handleDownload(data?.fileDocument?.url, data?.fileName)}
      >
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

export default PopUpMenu;
