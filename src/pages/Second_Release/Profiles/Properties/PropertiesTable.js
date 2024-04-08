"use client;";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../tableGrid/components/button";
import DropDown from "./components/DropDown";
import MainPane from "./MainPane";
import AddProperty from "./AddProperty/propertyInfo";

const PropertiesTable = ({ Data }) => {
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [data, setData] = useState(Data || []);
  const [property, setProperty] = useState(false);
  const [proData, setProData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addNewProperty, setAddNewProperty] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  
  const handleNewProperty = () => {
    setAddNewProperty(!addNewProperty);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const clickDelete = (index) => {
    setSelectedDataId(index); // Set the index of the row to be deleted
    setShowConfirmation(true); // Show the confirmation dialog
  };
  const handleDelete = () => {
    const updatedData = [...data];
    updatedData.splice(selectedDataId, 1);
    setData(updatedData);
    setShowConfirmation(false);
  };
  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  const router = useRouter();

  const handleRowClick = (Property) => {
    setProData(Property);
    setProperty(!property);
    // router.push(`/second_release/Property/${Property.id}`);

    // console.log(Property);
  };

  return (
    <div className="mt-4 w-full pb-[4rem]">
      {addNewProperty ? (
        <>
          <AddProperty />
        </>
      ) : (
        <>
          {data.length > 1 ? (
            <div className={`${property && "hidden"}`}>
              <div className="">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center ">
                    <p className="font-[500]">Properties</p>
                    <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                      <span className="text-BlueHomz text-[18px] font-[400]">
                        {data.length}
                      </span>
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <div className="pt-[5px]">
                      <DropDown edit={true} />
                    </div>
                    <input
                      type="date"
                      className="adminBorders items-center flex text-GrayHomz2 py-[1.5px] px-[10px] rounded cursor-pointer"
                      pattern="\d{2}-\d{2}-\d{4}"
                      id="date"
                      name="date"
                      placeholder="Date"
                    />
                    <button className="adminBorders border-BlueHomz items-center text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer">
                      <span>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/repeat.png"
                          }
                          alt=""
                          height={17}
                          width={16}
                        />
                      </span>
                      Reset
                    </button>
                  </div>
                  <div>
                    <button
                      className="adminBord items-center text-[14px] font-[500] flex bg-[#006AFF] text-white px-[10px] p-1 rounded cursor-pointer gap-2"
                      onClick={handleNewProperty}
                    >
                      <span>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                          }
                          alt=""
                          height={12}
                          width={16}
                        />
                      </span>
                      Add New Property
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <table className="border w-full">
                  <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px] ">
                    <tr>
                      <th className="md:w-[221.2px] h-[40px] gap-[12px] px-[20px] py-[14px] pl-3">
                        Property Name
                      </th>
                      <th className="md:w-[221.2px] h-[40px] gap-[12px] px-[20px] py-[14px]">
                        Location
                      </th>
                      <th className="md:w-[150.2px] h-[40px] gap-[12px] px-[20px] py-[14px]">
                        No of Houses
                      </th>
                      <th className="md:w-[150.2px] h-[40px] gap-[12px] px-[20px] py-[14px]">
                        No of Tenants
                      </th>
                      <th className="md:w-[150.2px] h-[40px] gap-[12px] px-[20px] py-[14px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentData.map((data, index) => (
                      <tr key={index} className="pl-3">
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
                        <td
                          className="w-[150.2px] h-[40px] text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-[20px]"
                          // onClick={() => handleRowClick(data)}
                        >
                          {data.No_of_Houses}
                        </td>
                        <td
                          className="w-[150.2px] h-[40px]  text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-[20px]"
                          // onClick={() => handleRowClick(data)}
                        >
                          {data.No_of_Tenants}
                        </td>

                        <td className="w-[150.2px] h-[40px]  text-[#4E4E4E] font-[500] text-[11px] py-[8px] pr-[16px] pl-[20px] space-x-3">
                          {/* {!showConfirmation ? ( */}
                            <div>
                              <button onClick={() => handleRowClick(data)}>
                                <Image
                                  src={"/static/images/edit-2.svg"}
                                  alt=""
                                  height={16}
                                  width={16}
                                  className="profileIcons  w-[36px] h-[36px] p-[11px] rounded-[8px] cursor-pointer mr-[10px]"
                                />
                              </button>

                              <button onClick={handleDelete}>
                                <Image
                                  src={"/static/images/trash.svg"}
                                  alt=""
                                  height={16}
                                  width={16}
                                  className="profileIcons  w-[36px] h-[36px] p-[11px] rounded-[8px] cursor-pointer"
                                />
                              </button>
                            </div>
                      
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <Button
                  firstThreePages={firstThreePages}
                  currentPage={currentPage}
                  lastThreePages={lastThreePages}
                  totalPages={totalPages}
                  handleNext={handleNext}
                  handlePageClick={handlePageClick}
                  handlePrev={handlePrev}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex gap-2 items-center pl-2">
                <p className="font-[500]">Properties</p>
                <span className="bg-whiteblue w-[30px] h-[35px] flex justify-center items-center rounded-[8px]">
                  <span className="text-BlueHomz text-[18px] font-[400]">
                    {data.length}
                  </span>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
                <Image
                  src={"/static/images/Frame 1318.svg"}
                  alt=""
                  height={100}
                  width={100}
                  className="rounded-[8px]"
                />
                <button
                  className="flex items-center justify-center text-[14px] font-[500] bg-[#006AFF] text-white px-4 py-2 rounded cursor-pointer space-x-2"
                  onClick={handleNewProperty}
                >
                  <Image
                    src={
                      "/static/dashboard/enterprisemanager/dashboard/add-squareWhite.png"
                    }
                    alt=""
                    height={12}
                    width={16}
                  />
                  <span>Add New Property</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <div className={`${property ? "block" : "hidden"}`}>
        <MainPane data={proData} />
      </div>
    </div>
  );
};

export default PropertiesTable;
