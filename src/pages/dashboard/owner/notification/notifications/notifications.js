import Image from "next/image";
import React, { useEffect, useState } from "react";
import PopNotification from "../components/popNotification";

const Notifications = ({ Data, openAndClose, setOpenAndClose }) => {
  const [selectedId, setSelectedId] = useState([]);

     // Ensure that Data is defined and not null
     if (!Data) {
      return null; // or handle accordingly, e.g., return a loading state
    }
    // Ensure Data is defined before use
    const data = Data || []; // Assign an empty array if Data is undefined
  

  const selectedData = (data) => {
    setSelectedId(data);
    setOpenAndClose(!openAndClose);
  };

  const closeMenu = () => {
    setOpenAndClose(false);
  };


  return (
    <div className="h-full overflow-auto scrollbar-container">
      {data.map((data) => (
        <div key={data.Id} className="">
          <div className="flex justify-between items-center border-b pt-3 pb-3">
            <div className="rounded-full shadow-md p-2 ml-5">
              <Image src={data.Image} alt="" height={40} width={40} />
            </div>
            <div className="w-[85%]">
              <p className="text-[16px] font-[600] text-BlackHomz">
                {data.Noti}
              </p>
              <p className="text-[16px] font-[400] text-GrayHomz">
                {data.Text}
              </p>
              <p className="text-[13px] font-[400] text-GrayHomz">
                {data.Time}
              </p>
            </div>
            <p
              onClick={() => selectedData(data)}
              className={`pr-5 text-[16px] font-[600] text-BlueHomz cursor-pointer`}
            >
              Open
            </p>
          </div>
        </div>
      ))}
      {openAndClose && (
       <PopNotification selectedId={selectedId} closeMenu={closeMenu}/>
      )}
    </div>
  );
};

export default Notifications;
