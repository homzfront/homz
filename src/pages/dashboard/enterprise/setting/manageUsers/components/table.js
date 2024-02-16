import Image from "next/image";
import React, { useState } from "react";
import Dropdown from "./dropDown";
import Button from "../../../components/button";
import PropertyAccess from "./propertyAccess";
import useBodyScroll from "@/utils/useBodyScroll";
import AcAndRejModel from "../../../components/acAndRejModel";
import ConfirmModal from "../../../components/confirmModal";

const Table = ({ estateData }) => {
  const [selectedRoles, setSelectedRoles] = useState(Array(10).fill(null)); // Array to store selected values for each dropdown

  const handleRoleSelect = (index, option) => {
    const updatedSelectedRoles = [...selectedRoles];
    updatedSelectedRoles[index] = option;
    setSelectedRoles(updatedSelectedRoles);
  };
  const data = [
    {
      id: 1,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 2,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 3,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 4,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 5,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 6,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 7,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 8,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 9,
      Tenant: "Adeyemo Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
    {
      id: 10,
      Tenant: "Okunola Olayemi",
      Properties: [
        {
          id: 1,
          label: "Sunrise Property",
        },
        {
          id: 2,
          label: "Iyewo Estate",
        },
      ],
      Role: "Landlord",
      Access: "Can view",
      Email: "AdeyemoOla@gmail.com",
      Action: "Remove",
    },
  ];

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [popUpMenuTwo, setPopUpMenuTwo] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);
  const [openRevoke, setOpenRevoke] = useState(false);
  const [openRevokeAccept, setOpenRevokeAccept] = useState(false);


  
  const showRevoke = () => {
    setOpenRevoke(true);
  };

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

  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = data?.slice(startIndex, endIndex);

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

  return (
    <div className="mt-6">
      <div>
        <div className="border w-full rounded-t-[12px]">
          <div className="bg-whiteblue h-[60px] text-[13px] flex items-center justify-center gap-2 font-[500] text-BlackHomz  px-4 rounded-t-[12px]">
            <div className="w-[18%] ">Name</div>
            <div className="w-[20%] ">Email Address</div>
            <div className="w-[16%] ">Role</div>
            <div className="w-[16%] ">Access</div>
            <div className="w-[16%] ">Properties</div>
            <div className="w-[14%] ">Action</div>
          </div>
          <div>
            {currentData &&
              currentData.map((data, index) => (
                <div
                  key={data.id}
                  className="border-b-[1px] font-[400] text-[14px] text-GrayHomz  items-center flex justify-center w-full gap-2 px-4 h-[77px]"
                >
                  <div className="flex items-center gap-2 w-[18%]">
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
                    <span className="">{data?.Tenant}</span>
                  </div>
                  <div className="w-[20%] ">{data.Email}</div>
                  <div className="w-[16%] flex justify-start items-center">
                    <div className="border border-GrayHomz5 rounded-[2px] h-[45px] w-[70%] px-4 flex items-center justify-start">
                      {data.Role}
                    </div>
                  </div>
                  <div className="w-[16%] flex justify-start items-center">
                    <div className="border border-GrayHomz5 rounded-[2px] h-[45px] w-[70%] px-4 flex items-center justify-start">
                      {data.Access}
                    </div>
                  </div>
                  <div className="w-[16%] flex justify-start items-center cursor-pointer">
                    <div
                      onClick={() => handleToggleMenu(data?.id)}
                      className={`border border-GrayHomz5 rounded-[2px] h-[45px] w-[90%] px-4 flex gap-3 justify-start items-center`}
                    >
                      <p>
                        Sunrise...
                        <span className="text-BlueHomz"> +2</span>
                      </p>
                      <div
                        className={` ${
                          popUpMenuTwo && selectedDataId === data?.id
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
                  {popUpMenuTwo && selectedDataId === data?.id && (
                    <PropertyAccess
                      data={data}
                      estateData={estateData}
                      closeMenu={closeMenu}
                    />
                  )}
                  { openRevokeAccept ? (
                    <ConfirmModal
                      returnHome={closeRevokeAccept}
                      header={"User removed Successfully"}
                      button={"Close"}
                      body={`${data.Tenant} has successfully been removed from your dashboard`}
                    />
                  ) : openRevoke ? (
                    <AcAndRejModel
                      header={"Remove User?"}
                      body={`Clicking on ‘Yes’ will remove ${data.Tenant} from your dashboard, proceed?`}
                      button={"Yes"}
                      buttonTwo={"No, go back"}
                      returnHomeTwo={closeRevoke}
                      returnHome={RevokeAccept}
                    />
                  ) : (
                    <div onClick={showRevoke} className="w-[14%] cursor-pointer text-warning2 ">
                      {data.Action}
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
