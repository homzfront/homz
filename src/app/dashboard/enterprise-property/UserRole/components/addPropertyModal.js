import Image from "next/image";
import React, { useState } from "react";
import DropDown2 from "./dropDown";
import CustomizeModal from "../../components/CustomizedModal";
import { Data } from "./Data";
import Loadiing from "./loading";
import Loading from "./loading";

const AddPropertyModal = ({
  modalIsOpen,
  setModalIsOpen,
  setSelectedProperty,
}) => {
  const [currentData, setData] = useState(Data || []);
  const [loading, setLoading] = useState(
    new Array(currentData.length).fill(false)
  );

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProperty = (e, index, data) => {
    e.preventDefault();
    const newLoadingStates = [...loading];

    // Set the loading state for the current row to true
    newLoadingStates[index] = true;
    setLoading(newLoadingStates);

    setTimeout(() => {
      newLoadingStates[index] = false;
      setLoading(newLoadingStates);
      setSelectedProperty(data);
    }, 2000);

    // console.log(data)
  };

  return (
    <div>
      <CustomizeModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col w-[333px] md:w-[816px] md:h-[581px]  bg-white rounded-[12px] p-[28px] space-y-7">
          <div className=" flex items-center justify-between">
            <div className=" flex gap-[24px]">
              <p className="hidden pt-1 md:block">
                <Image
                  src={"/static/images/buildings-2.svg"}
                  alt=""
                  height={20}
                  width={20}
                />
              </p>
              <div className="">
                <p className="text-[#202020] text-[20px] leading-[30px] font-[700] mb-2">
                  Select Property
                </p>
                <p className="text-[14px] leading-[21px] text-[#4E4E4E]">
                  Select the landlord’s property
                </p>
              </div>
            </div>
            <div>
              <button onClick={closeModal} className="cursor-pointer md:mb-2">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center md:gap-[4.8rem]">
            <div className="searchPane relative hidden md:block h-[37px] rounded-[4px]">
              <input
                type="text"
                className="pl-8 rounded-[4px] w-[320px] h-full"
                id="search"
                placeholder="Search"
                // onChange={(e) => {
                //   setSearchValue(e.target.value);
                // }}
              />
              <Image
                src="/static/dashboard/enterprisemanager/header/search-normal.png"
                alt=""
                className="absolute top-2 left-3"
                height={17}
                width={17}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center px-2 md:px-0 gap-2 w-[315px] md:w-full">
              <p className="text-[16px] font-[400] text-BlackHomz pt-1">
                Filter by:
              </p>
              <div className="flex flex-row gap-2">
                <div className="md:pt-[5px]">
                  <DropDown2 />
                </div>
                <button className="adminBorders border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] md:p-1 rounded cursor-pointer h-[33px] w-[71px] md:mt-[5px]">
                  <span>
                    <Image
                      src="/static/dashboard/enterprisemanager/dashboard/repeat.png"
                      alt=""
                      height={17}
                      width={16}
                    />
                  </span>
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 h-[591px] overflow-y-auto">
            <table className="border w-full">
              <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px] ">
                <tr>
                  <th className="w-[24px] h-[48px] px-[10px] py-[14px] md:hidden"></th>

                  <th className="md:w-[221.2px] h-[40px] gap-[12px] pl-[18px] pr-[24px] md:px-[20px] py-[14px] md:pl-3 text-left">
                    Property
                  </th>
                  <th className="md:w-[221.2px] h-[40px] gap-[12px] px-[20px] py-[14px] text-left">
                    Address
                  </th>

                  <th className=" hidden md:table-cell md:w-[150.2px] h-[40px] gap-[12px] px-[20px] py-[14px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {currentData.map((data, index) => (
                  <tr key={index} className="pl-3">
                    <td className="md:hidden w-[24px] h-[48px] px-[10px] py-[14px] z-10">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          id={data.Name}
                          name={data.Name}
                          value={data.id}
                          onChange={(e) => handleProperty(e, index, data)}
                          
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td
                      className="w-[221.2px] h-[40px] text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-3"
                      // onClick={() => handleRowClick(data)}
                    >
                      <span className="text-[12px]">{data.Name}</span>
                    </td>
                    <td
                      className="w-[221.2px] h-[40px] text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-[20px]"
                      // onClick={() => handleRowClick(data)}
                    >
                      {data.Location}
                    </td>

                    <td className="hidden md:table-cell w-[150.2px] h-[40px]  text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-[20px] space-x-3">
                      {/* {!showConfirmation ? ( */}
                      <div>
                        <button
                          className="bg-blue-600 text-white w-[107px] py-[8px] px-[12px] rounded-[4px] hover:bg-blue-500"
                          onClick={(e) => handleProperty(e, index, data)}
                          disabled={loading[index]}
                        >
                          {loading[index] ? <Loading /> : "Property"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CustomizeModal>
    </div>
  );
};

export default AddPropertyModal;
