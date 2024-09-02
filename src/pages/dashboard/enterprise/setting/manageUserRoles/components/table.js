import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "./dropDown";
import Button from "../../../components/button";
import PropertyAccess from "./propertyAccess";
import useBodyScroll from "@/utils/useBodyScroll";
import AcAndRejModel from "../../../components/acAndRejModel";
import ConfirmModal from "../../../components/confirmModal";

const datas = [
  {
    _id: '65fc06dc69180a1af3575164',
    user: {
      _id: '65fc06db69180a1af357515d',
      email: 'dyllon.blaze@farmoaks.com'
    },
    enterpriseId: '65e88c5e9a5be721800a415b',
    propertyOwner: {
      _id: '65fc06dc69180a1af3575162',
      fullName: 'Kunle',
      phoneNumber: '09034995323'
    },
    is_deleted: false,
    role: 'security',
    permission: 'READ',
    estatesDetails: [
      {
        estate: { _id: '65f1d720b34d160904aa0554', name: 'Disney' },
        is_deleted: false,
        _id: '65fc06dc69180a1af3575165'
      }
    ],
    createdAt: '2024-03-21T10:07:24.144Z',
    updatedAt: '2024-04-18T12:56:48.788Z',
    __v: 0
  },
  {
    _id: '661cfc6f38878e3052deac33',
    user: {
      _id: '661cfc6f38878e3052deac2c',
      email: 'cambryn.jowel@dockerbike.com'
    },
    enterpriseId: '65e88c5e9a5be721800a415b',
    propertyOwner: {
      _id: '661cfc6f38878e3052deac31',
      fullName: 'Trica',
      phoneNumber: '07047388232'
    },
    is_deleted: false,
    role: 'Customer Support',
    permission: 'READ',
    estatesDetails: [
      {
        estate: { _id: '661cfbe038878e3052deaa2d', name: 'Spartan Hebrew' },
        is_deleted: false,
        _id: '661cfc6f38878e3052deac34'
      }
    ],
    createdAt: '2024-04-15T10:07:43.991Z',
    updatedAt: '2024-04-18T14:11:24.963Z',
    __v: 0
  },
  {
    _id: '66210a7aa9db4c06a60d585f',
    user: { _id: '66210a79a9db4c06a60d584d', email: 'norawa5400@agaseo.com' },
    enterpriseId: '65e88c5e9a5be721800a415b',
    propertyOwner: {
      _id: '66210a79a9db4c06a60d585b',
      fullName: 'Dupe',
      phoneNumber: '09059949323'
    },
    is_deleted: false,
    role: 'security',
    permission: 'READ',
    estatesDetails: [
      {
        estate: { _id: '66210523a9db4c06a60d50d7', name: 'Donut House' },
        is_deleted: false,
        _id: '66210a7aa9db4c06a60d5860'
      }
    ],
    createdAt: '2024-04-18T11:56:42.187Z',
    updatedAt: '2024-04-18T12:58:59.921Z',
    __v: 0
  },
  {
    _id: '662123ddc724e670f684c8a9',
    user: {
      _id: '662123dbc724e670f684c8a2',
      email: 'filiberto.matson@foodfarms.net'
    },
    enterpriseId: '65e88c5e9a5be721800a415b',
    propertyOwner: {
      _id: '662123dcc724e670f684c8a7',
      fullName: 'Lekan',
      phoneNumber: '08093992321'
    },
    is_deleted: false,
    role: 'Customer Support',
    permission: 'READ',
    estatesDetails: [
      {
        estate: { _id: '66210523a9db4c06a60d50d7', name: 'Donut House' },
        is_deleted: false,
        _id: '662123ddc724e670f684c8aa'
      }
    ],
    createdAt: '2024-04-18T13:45:01.026Z',
    updatedAt: '2024-04-18T14:06:55.272Z',
    __v: 0
  },
  {
    _id: '66212a9cc724e670f684d7c0',
    user: {
      _id: '66212a9bc724e670f684d7b9',
      email: 'rayansh.shael@foodfarms.net'
    },
    enterpriseId: '65e88c5e9a5be721800a415b',
    propertyOwner: {
      _id: '66212a9cc724e670f684d7be',
      fullName: 'TUTU',
      phoneNumber: '09048933992'
    },
    is_deleted: false,
    role: 'security',
    permission: 'READ',
    estatesDetails: [
      {
        estate: { _id: '661cfbe038878e3052deaa2d', name: 'Spartan Hebrew' },
        is_deleted: false,
        _id: '66212a9cc724e670f684d7c1'
      }
    ],
    createdAt: '2024-04-18T14:13:48.198Z',
    updatedAt: '2024-04-18T14:14:31.511Z',
    __v: 0
  }
]

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

  const totalPages = Math.ceil(datas?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = datas?.slice(startIndex, endIndex);

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

  return (
    <div className="mt-6">
      <div>
        <div className="border w-full rounded-t-[12px]">
          <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
            <div className="w-[5%] "></div>
            <div className="w-[17%] ">Name</div>
            <div className="w-[25%] ">Email Address</div>
            <div className="w-[18%] ">Properties</div>
            <div className="w-[15%] ">User Role</div>
            <div className="w-[20%] ">Action</div>
          </div>
          <div>
            {currentData &&
              currentData.map((data) => (
                <div
                  key={data?._id}
                  className={`border-b-[1px] font-[400] text-[14px] text-GrayHomz  items-center flex justify-center w-full gap-2 px-4 h-[77px] ${data?.estatesDetails?.[0]?.is_deleted === true ? "hidden" : ""}`}
                >
                  <div className="pl-4 w-[5%]">
                    <input
                      type="checkbox"
                      className="rounded-[50%]"
                      onChange={handleSelectLandlord}
                    // checked={handleSelect}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-[17%]">

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
                  <div className="w-[18%] flex justify-start items-center cursor-pointer">
                    <div
                      // onClick={() => handleToggleMenu(data?._id)}
                      className={` rounded-[2px] h-[45px] w-[90%]  flex gap-3 justify-start items-center`}
                    >
                      <p className="text-[14px] font-[500] text-GrayHomz2">
                        {data?.estatesDetails?.[0]?.estate?.name}
                        {
                          data?.estatesDetails?.[0]?.length >= 2 && <span className="text-[14px] font-[500] text-warning2"> +1</span>
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
                  <div className="w-[15%] text-[14px] text-GrayHomz font-[400]">{data?.role}</div>
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
