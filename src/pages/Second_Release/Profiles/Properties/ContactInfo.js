"use client";
import Image from "next/image";
import React, { useState } from "react";

const ContactInfo = () => {
  const [edit, setEdit] = useState(false);

  const handleEditBtn = (event) => {
    event.preventDefault();
    setEdit(!edit);
    // console.log('clicked');
  };

  return (
    <div className="flex flex-col item gap-5">
      <div className="flex  gap-[3rem]">
        <div className="profiles flex  flex-col space-y-7">
          <div className=" space-y-1">
            <label for="ManagerPhone" className="">
            Manager’s Phone Number
            </label>
            <br />
            <input
              type="text"
              id="ManagerPhone"
              className={`ContactInfoField ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="ManagerPhone"
              placeholder="0000 - 000 - 0000"
              readOnly={!edit && true}

            />
          </div>

          <div className=" space-y-1">
            <label for="EmergencyPhoneNumber">Emergency Phone Number</label>
            <br />
            <input
              type="text"
              id="EmergencyPhoneNumber"
              className={`ContactInfoField ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="EmergencyPhoneNumber"
              placeholder="0000 - 000 - 0000"
              readOnly={!edit && true}

            />
          </div>
          <div className=" space-y-1">
            <label for="ContactInfoEmail">Utility Services Phone Number <span className="text-[10px]">(Dry cleaning, Waste disposal, etc)</span></label>
            <br />
            <input
              type="text"
              id="ContactInfoEmail"
              className={`ContactInfoField ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="ContactInfoEmail"
              placeholder="[0000 - 000 - 0000]"
              readOnly={!edit && true}

            />
          </div>
          <div className=" space-y-1">
            <label for="SecurityPhoneNumber">Security  Phone Number</label>
            <br />
            <input
              type="text"
              id="SecurityPhoneNumber"
              className={`ContactInfoField ${!edit ? "bg-[#E6E6E6]" : "adminCellBorders"}`}
              name="SecurityPhoneNumber"
              placeholder="[0000 - 000 - 0000]"
              readOnly={!edit && true}

            />
          </div>
        </div>

        {/* <div className=" flex flex-col items-center justify-center pb-6"> */}
        <div className="relative">
         
        </div>
        {/* </div> */}
      </div>

      <div className="">
      <button
        className={`${
          edit ? "hidden" : "block"
        }  editBtn md:w-[83px] h-[40px] bg-BlueHomz text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Update
      </button>
      <button
        className={`${
          !edit ? "hidden" : "block"
        }  editBtn md:w-[120px] h-[40px]   bg-BlueHomz text-white rounded-[4px] mr-[3rem] text-center md:ml-auto  md:mt-[1.5rem] relative`}
        onClick={(e) => handleEditBtn(e)}
      >
        Save Update
      </button>
      </div>
    </div>
  );
};

export default ContactInfo;
