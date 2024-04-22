import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "./dropDown";
import Button from "../../../components/button";
import PropertyAccess from "./propertyAccess";
import useBodyScroll from "@/utils/useBodyScroll";
import AcAndRejModel from "../../../components/acAndRejModel";
import ConfirmModal from "../../../components/confirmModal";

const Table = ({ estateData, openRevoke, setOpenRevoke, fetchData, roleData }) => {
  const [selectedRoles, setSelectedRoles] = useState(Array(10)?.fill(null)); // Array to store selected values for each dropdown

  const handleRoleSelect = (index, option) => {
    const updatedSelectedRoles = [...selectedRoles];
    updatedSelectedRoles[index] = option;
    setSelectedRoles(updatedSelectedRoles);
  };

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [openRevokeAccept, setOpenRevokeAccept] = useState(false);
  const [handleSelect, setHandleSelect] = useState(false);

  const handleSelectLandlord = () => {
    setHandleSelect(!handleSelect);
  }

  const closeRevoke = () => {
    setOpenRevoke(false);
  };

  const RevokeAccept = () => {
    setOpenRevokeAccept(true);
  };

  const closeRevokeAccept = () => {
    setOpenRevokeAccept(false);
    setOpenRevoke(false);
  };

  useBodyScroll([popUpMenuTwo]);

  const totalPages = Math.ceil(roleData?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = roleData?.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleToggleMenu = (id) => {
    setPopUpMenuTwo(!popUpMenuTwo);
    setSelectedDataId(id);
  };

  const closeMenu = () => {
    setPopUpMenuTwo(false);
  };

  // Use reduce to generate an array of the first three pages
  const firstThreePages = Array.from(
    { length: Math.min(totalPages, 3) },
    (_, index) => index + 1
  );

  useBodyScroll([openRevoke])
  // console.log(roleData);
  // console.log(estateData);
  // console.log(data?.estatesDetails?.length);

  return (
    <div className="mt-6">
      <div>
        <div className="border w-full rounded-t-[12px]">
          <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
            <div className="w-[5%] "></div>
            <div className="w-[25%] ">Name</div>
            <div className="w-[25%] ">Email Address</div>
            <div className="w-[25%] ">Properties</div>
            <div className="w-[20%] ">Action</div>
          </div>
          <div>
            {currentData &&
              currentData.map((data) => (
                <div
                  key={data?._id}
                  className={ `border-b-[1px] font-[400] text-[14px] text-GrayHomz  items-center flex justify-center w-full gap-2 px-4 h-[77px]`}
                >
                  <div className="pl-4 w-[5%]">
                    <input
                      type="checkbox"
                      className="rounded-[50%]"
                      onChange={handleSelectLandlord}
                    // checked={handleSelect}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-[25%]">

                    {!data?.coverPhoto?.url ? (
                      <Image
                        src={
                          "/static/dashboard/enterprisemanager/dashboard/AvatarEmpty.png"
                        }
                        alt=""
                        width={30}
                        height={30}
                        className=""
                      />
                    ) : (
                      <Image
                        src={data?.coverPhoto?.url}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-[100%]"
                      />
                    )}
                    <span className="text-[14px] text-GrayHomz font-[400]">{data?.propertyOwner?.fullName}</span>
                  </div>
                  <div className="w-[25%] text-[14px] text-GrayHomz font-[400]">{data?.user?.email}</div>
                  <div className="w-[25%] flex justify-start items-center cursor-pointer">
                    <div
                      onClick={() => handleToggleMenu(data?._id)}
                      className={` rounded-[2px] h-[45px] w-[90%]  flex gap-3 justify-start items-center`}
                    >
                      <p className="text-[14px] font-[500] text-GrayHomz2">
                        {data?.estatesDetails?.[0]?.estate?.name}
                        {
                          data?.estatesDetails?.length >= 2 && <span className="text-[14px] font-[500] text-warning2"> +1</span>
                        }
                      </p>
                      <div
                        className={` ${popUpMenuTwo && selectedDataId === data?._id
                          ? "transform rotate-180"
                          : ""
                          }`}
                      >
                        <Image
                          src="/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                          height={16}
                          width={16}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {popUpMenuTwo && selectedDataId === data?._id && (
                    <PropertyAccess
                      data={data}
                      estateData={estateData}
                      closeMenu={closeMenu}
                      fetchData={fetchData}
                    />
                  )}
                  {openRevokeAccept ? (
                    <ConfirmModal
                      returnHome={closeRevokeAccept}
                      header={"User removed Successfully"}
                      button={"Close"}
                      body={`${data?.Tenant} has successfully been removed from your dashboard`}
                    />
                  ) : openRevoke ? (
                    <AcAndRejModel
                      header={"Remove User?"}
                      body={`Clicking on ‘Yes’ will remove ${data?.Tenant} from your dashboard, proceed?`}
                      button={"Yes"}
                      buttonTwo={"No, go back"}
                      returnHomeTwo={closeRevoke}
                      returnHome={RevokeAccept}
                    />
                  ) : (
                    <div
                      onClick={() => handleToggleMenu(data?._id)}
                      className="w-[20%] cursor-pointer text-BlueHomz ">
                      + Add to new property
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <Button
          firstThreePages={firstThreePages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePageClick={handlePageClick}
          handlePrev={handlePrev}
        />{" "}
      </div>
    </div>
  );
};

export default Table;
