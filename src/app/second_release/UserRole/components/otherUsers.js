import Image from "next/image";
import React, { useState } from "react";
import Button from "./button";
import { OtherUsersData } from "./otherUserData";
import CustomizeModal from "../../components/CustomizedModal";
import PropertyAccess from "./propertyAccess";
import RoleDropDown from "./roleDropDown";

const OtherUsersTable = ({ collapsed }) => {
  const [data, setData] = useState(OtherUsersData || []);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [success2ModalIsOpen, setSuccess2ModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterModalIsOpen, setfilterModalIsOpen] = useState(false);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [propertAccessModalIsOpen, setPropertyAccessModalIsOpen] =
    useState(false);
  const [name, setName] = useState(null);
  const [otherUsers, setOtherUserss] = useState([]);
//   const [filter, setFilter] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
    // console.log("clicked")
  };
  const handleFilter = (filter) =>{
    const filterRole= OtherUsersData.filter(user=>user.Role === filter );   
    setData(filterRole);
  }
  const openPropertyAccessModal = (data) => {
    setPropertyAccessModalIsOpen(true);
    setSelectedProperty(data);

    // console.log("clicked")
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setInfoModalIsOpen(false);
    setfilterModalIsOpen(false)
  };

  const handleOtherUsersInfo = (info) => {
    setOtherUserss(info);
    setInfoModalIsOpen(true);
  };
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setSuccess2ModalIsOpen(false);
    setName("");
  };
  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const handleCheckboxChange = (event, id, selectedName) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedRows([...selectedRows, id]);
      setName(selectedName);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setName("");
    }
  };
  const deleteRow = () => {
    setDeleteModalIsOpen(true);
  };
  const handleDeleteRows = () => {
    const newData = data.filter((row) => !selectedRows.includes(row._id));
    setData(newData);
    setSelectedRows([]);
    setDeleteModalIsOpen(false);
    setSuccess2ModalIsOpen(true);
  };

  const ITEMS_PER_PAGE = !collapsed ? 6 : 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );
  const lastThreePagesStart = Math.max(totalPages - 2, 1); // Calculate the starting page number for the last three pages
  const lastThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => lastThreePagesStart + index
  );

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-col px-4">
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2 items-center ">
          <p className="text-[14px] font-[500]">Users</p>
          <span className="bg-whiteblue w-[30px] h-[30px] flex justify-center items-center rounded-[8px]">
            <span className="text-BlueHomz text-[18px] font-[400]">
              {data.length}
            </span>
          </span>
        
        <div className="md:hidden h-[32px] w-[32px] ml-6 rounded-[4px] flex items-center justify-center filterBorder hover:border-blue-600">
          <button onClick={()=>setfilterModalIsOpen(true)}>
            <Image
              src="/static/images/filter.svg"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <p className="text-[16px] font-[400] text-GrayHomz pt-1">
            Filter by:
          </p>
          <div className="">
      <RoleDropDown  handleFilter={handleFilter}/>
          </div>
          <button className="adminBorders border-BlueHomz items-center w-[83px] text-[14px] font-[500] flex text-BlueHomz px-[10px] p-1 rounded cursor-pointer h-[36px]" onClick={() => setData(OtherUsersData)}>
            <span>
              <Image
                src={"/static/dashboard/enterprisemanager/dashboard/repeat.png"}
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
            className=" items-center text-[14px] font-[500] flex gap-2 text-red-600 px-[10px] p-1 rounded cursor-pointer"
            onClick={deleteRow}
            disabled={selectedRows.length === 0 ? true : false}
          >
            <span>
              <Image
                src={"/static/images/trash.svg"}
                alt=""
                height={12}
                width={16}
              />
            </span>
            <span>Remove User(s)</span>
          </button>
        </div>
      </div>

      <main className="mt-4 flex flex-col gap-[24px] ">
        <table className="border w-full">
          <thead className="bg-whiteblue text-[13px] font-[500] text-BlackHomz w-full text-center md:text-left h-[50px]">
            <tr>
              <th className="w-[32px] md:w-[40px] h-[48px] px-[5px] md:px-[10px] py-[14px]"></th>
              <th className="md:w-[258px] h-[48px] md:pl-[16px] pr-[24px] py-[14px]">
                Name
              </th>
              <th className="hidden md:table-cell md:w-[258px] h-[48px] px-[16px] py-[14px]">
                Email
              </th>
              <th className=" md:table-cell md:w-[258px] h-[48px] md:px-[16px] py-[14px] flex items-start px-[20px]">
                Property
              </th>
              <th className="hidden md:table-cell md:w-[258px] h-[48px] md:px-[16px] py-[14px] pl-[2px] pr-[30px]">
                User Role
              </th>
              <th className="hidden md:table-cell md:w-[258px] h-[48px] px-[16px] py-[14px]">
                Action
              </th>
              <th className=" md:hidden md:w-[258px] h-[48px] px-[16px] py-[14px]"></th>
            </tr>
          </thead>
          <tbody className="">
            {currentData.map((data, index) => (
              <tr key={index} className="pl-3 ">
                <td className=" w-[32px] md:w-[40px] h-[48px] px-[5px] md:px-[10px] py-[14px]">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      id={data.Name}
                      name={data.Name}
                      checked={selectedRows.includes(data._id)}
                      value={data._id}
                      onChange={(e) =>
                        handleCheckboxChange(e, data._id, data.Name)
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>

                <td
                  className="hidden md:flex items-center gap-3 text-GrayHomz4 font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[12px] h-[64px]"
                  // onClick={() => handleRowClick(data)}
                >
                  <Image
                    src="/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    alt=""
                    width={30}
                    height={30}
                    className="hidden md:block"
                  />
                  <span className="text-[12px]">{data.Name}</span>
                </td>
                <td
                  className="md:hidden flex items-center gap-3 text-GrayHomz4 font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[12px] h-[64px] cursor-pointer"
                  onClick={() => handleOtherUsersInfo(data)}
                >
                  <Image
                    src="/static/dashboard/enterprisemanager/dashboard/Avatar.png"
                    alt=""
                    width={30}
                    height={30}
                    className="hidden md:block"
                  />
                  <span className="text-[12px]">{data.Name}</span>
                </td>
                <td
                  className={`text-GrayHomz font-[500] text-[14px] break-words  md:w-[257.75px] py-[16px] px-[12px] h-[77px] ${
                    "hidden md:table-cell" // Hide on mobile
                  }`}
                  // onClick={() => handleRowClick(data)}
                >
                  {data.Email}
                </td>
                <td
                  className={`md:text-GrayHomz cursor-pointer text-blue-600 font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[20px] h-[64px] underline underline-offset-4`}
                  onClick={() => openPropertyAccessModal(data)}
                >
                  {data && data.Property && data.Property.length > 0 ? (
                    <>
                      <span>
                        {`${data.Property[0]}`}
                        {data.Property.length > 1 && (
                          <span className="text-red-600">
                            {" "}
                            +{data.Property.length - 1}
                          </span>
                        )}
                      </span>
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className=" hidden md:table-cell font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[12px] h-[64px]">
                  {data.Role}
                </td>
                <td className=" hidden md:table-cell font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[12px] h-[64px]">
                  <button className="text-blue-600 text-[14px] leading-[21px] cursor-pointer">
                    + Add to new property
                  </button>
                </td>
                <td className="md:hidden font-[500] text-[14px]  md:w-[257.75px] py-[16px] px-[12px] h-[64px]">
                  <button className="bg-whiteblue w-[30px] h-[30px] flex items-center justify-center rounded-[8px] md:bg-inherit md:h-full md:w-full ">
                    <Image
                      src={"/static/images/add_icon.svg"}
                      alt=""
                      height={24}
                      width={24}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length >= 1 && (
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
      </main>

      <CustomizeModal
        isOpen={success2ModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              User removed Successfully
            </p>

            <p className=" text-[13px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              <span className="text-red-500">{name}</span> has successfully been
              removed from your dashboard
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            Close
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <Image
              src="/static/images/success_icon.svg"
              height={48}
              width={46}
              alt=""
            />
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Invite Sent Successfully
            </p>

            <p className=" text-[13px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              {/* {`Your invite link has successfully been sent to /n ${}`} */}
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeSuccessModal();
            }}
          >
            Close
          </button>
        </div>
      </CustomizeModal>
      <CustomizeModal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
      >
        <div className="bg-white adminCellBorders w-[333px] flex flex-col md:w-[464px] py-[24px] px-[16px] md:p-[32px] rounded-[12px] gap-[18px] items-center justify-center">
          <div className="flex flex-col gap-6 items-center justify-center">
            <p className=" text-[14px] leading-[17.64px]  md:text-[20px] font-[700] md:leading-[25px] text-center">
              Remove User?
            </p>

            <p className=" text-[13px] leading-[19.5px] md:text-[16px] text-[400] md:leading-[24px] text-center">
              Clicking on ‘Yes’ will remove{" "}
              <span className="text-red-500">{name}</span> from your dashboard,
              proceed?
            </p>
          </div>

          <button
            className="bg-BlueHomz2 w-[301px]  text-white rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={handleDeleteRows}
          >
            Yes
          </button>
          <button
            className="border-BlueHomz w-[301px]  text-blue-600 rounded-[4px] adminCellBorders  md:w-[400px] h-[48px] p-[12px]"
            onClick={() => {
              closeDeleteModal();
            }}
          >
            No, go back
          </button>
        </div>
      </CustomizeModal>

      <PropertyAccess
        modalIsOpen={propertAccessModalIsOpen}
        selectedProperty={selectedProperty}
        setModalIsOpen={setPropertyAccessModalIsOpen}
      />

      <CustomizeModal isOpen={infoModalIsOpen} onRequestClose={closeModal}>
        <div className="bg-white adminCellBorders flex flex-col w-[355px] p-[28px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-BlueHomz text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              OtherUsers Information
            </p>

            <div>
              <button onClick={closeModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className=" py-[20px] px-[16px] flex flex-col rounded-[12px] bg-[#F6F6F6] space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">Full Name</p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {otherUsers.Name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                Email
              </p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {otherUsers.Email}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">Property</p>
              <p className="text-[14px] leading-[21px] font-[500] text-blue-600 underline underline-offset-4">
                {otherUsers &&
                otherUsers.Property &&
                otherUsers.Property.length > 0 ? (
                  <>
                    <span>
                      {`${otherUsers.Property[0]}`}
                      {otherUsers.Property.length > 1 && (
                        <span className="text-blue-600 ">
                          {" "}
                          +{otherUsers.Property.length - 1}
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[14px] leading-[21px] font-[500]">
                User Role
              </p>
              <p className="text-[14px] leading-[21px] font-[500]">
                {otherUsers.Role}
              </p>
            </div>
          </div>
        </div>
      </CustomizeModal>

      <CustomizeModal
        isOpen={filterModalIsOpen}
        onRequestClose={closeModal}
      >
        <div className="bg-white adminCellBorders flex flex-col w-[350px]  py-[24px] px-[16px] rounded-[12px] gap-[18px]">
          <div className=" flex items-center justify-between">
            <p className="text-[#4E4E4E] text-[14px] leading-[21px] font-[500] mb-2 pt-2">
              Filter by
            </p>

            <div>
              <button onClick={closeModal} className="cursor-pointer">
                <Image
                  src="/static/images/close-square.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </div>
          </div>

          <RoleDropDown  handleFilter={handleFilter}/>


          <button className="adminBorders w-[318px] h-[42px] p-[12px] border-[#006AFF] bg-[#006AFF] items-center text-[14px] font-[500] flex justify-center  rounded-[4px] cursor-pointer mt-3"
          onClick={() => setData(OtherUsersData)}
          >
            <span>
              <Image
                src={"/static/images/white_repeat.svg"}
                alt=""
                height={17}
                width={16}
              />
            </span>
            <span className="text-[14px] leading-[17.64px] text-[700] text-white">
              Reset
            </span>
          </button>
        </div>
      </CustomizeModal>
    </div>
  );
};

export default OtherUsersTable;
