"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import LandlordTable from "./landlordTable";
import CustomizeModal from "../../components/CustomizedModal";
import AddPropertyModal from "./addPropertyModal";
import OtherUsersTable from "./otherUsers";
import UserRole from "./dashboardRole";

const DashSettings = () => {
  const [landlords, setLandlords] = useState(true);
  const [otherUsers, setOtherUsers] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [role, setRole] = useState("");

  const handleSetRole = useCallback((role) => {
    setRole(role);
  }, []);

  const handleSelectedProperty = (data) => {
    setSelectedProperty(data);
  };

  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    setEmail("");
    setSelectedProperty(null);
  };
  // Function to handle changes in the email input field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCollapseBtn = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCollapse(!collapse);
  };
  // Function to handle button click (for demonstration purposes)
  const handleInviteClick = () => {
    setSuccessModalIsOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLandlords = () => {
    setLandlords(true);
    setOtherUsers(false);
    setEmail("");
  };
  const handleOtherUsers = () => {
    setEmail("");
    setLandlords(false);
    setOtherUsers(true);
    setSelectedProperty(null);
  };
  return (
    <div className="flex flex-col  gap-[2rem]">
      <div className="flex flex-col justify-between gap-[28px]">
        <div className="flex gap-2 items-center ">
          <p className="font-[500] hidden text-[20px] md:block">
            {" "}
            Dashboard Settings
          </p>
        </div>

        <div className="flex gap-3 pl-4">
          <button
            className={`adminBord items-center  h-[37px] text-[14px] font-[500] flex ${
              landlords
                ? "bg-[#006AFF] text-white"
                : "bg-[#EEF5FF] md:bg-inherit hover:md:bg-[#EEF5FF] "
            } text-[#4E4E4E] px-[12px] py-[8px] rounded-[4px] cursor-pointer gap-[8px]`}
            onClick={handleLandlords}
          >
            Manage Landlords
          </button>
          {/* </div>
          <div className="flex items-center gap-2"> */}

          <button
            className={`items-center text-[14px] font-[500] flex rounded-[4px] text-[#4E4E4E] px-[12px] py-[8px] cursor-pointer gap-[8px] ${
              otherUsers
                ? "bg-[#006AFF] text-white"
                : "bg-[#EEF5FF] md:bg-inherit hover:md:bg-[#EEF5FF] "
            }`}
            onClick={handleOtherUsers}
          >
            Manage other users
          </button>
        </div>
      </div>

      <main className="h-full w-[350px] ml-4 md:ml-0 bg-[#F6F6F6] py-[24px] px-[20px] gap-[24px] rounded-[12px] flex flex-col md:gap-[12px] md:w-full md:mr-4">
        <div className="flex justify-between">
          <p className="text-[14px] text-[400] leading-[21px] text-[#4E4E4E]">
            {landlords
              ? " Add landlord to view and monitor properties"
              : " Invite other users to your dashboard"}
          </p>
          <button className="cursor-pointer" onClick={handleCollapseBtn}>
            {!collapse ? (
              <Image
                src={"/static/images/arrow-right.svg"}
                alt=""
                height={20}
                width={20}
              />
            ) : (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
        {collapse && (
          <>
            <div className="flex gap-4 flex-col md:flex-row">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={`md:w-[346px] ${
                  email.trim() ? "text-BlackHomz bg-blue-50" : "bg-[#F6F6F6]"
                } h-[44px] adminCellBorders p-[12px] rounded-[4px] text-[14px] border-[#A9A9A9]`}
              />
                  <p className="md:hidden text-[11px] text-[400] leading-[14px]">
                    {landlords
                      ? "Select property you want Landlord to view "
                      : "Assign a role to the user "
                      }
                  </p>
              {landlords ? (
                <>

                  <div
                    className={`${
                      selectedProperty?.Name
                        ? " text-BlackHomz bg-blue-50"
                        : "text-GrayHomz2"
                    } md:w-[348px] h-[44px] adminCellBorders mb-1 p-1 rounded cursor-pointer  border-[#A9A9A9]`}
                  >
                    {/* className="flex text-[14px] h-full font-[500] text-GrayHomz2 justify-between items-center "> */}

                    <div className="flex items-center justify-between cursor-pointer py-2 px-4">
                      <p
                        className="hidden text-[14px] md:block"
                        onClick={openModal}
                      >
                        {selectedProperty
                          ? `${selectedProperty?.Name}`
                          : "Select property you want Landlord to view "}
                      </p>
                      <p className="text-[14px] md:hidden" onClick={openModal}>
                        {selectedProperty
                          ? `${selectedProperty?.Name}`
                          : "Select a Property"}
                      </p>
                      <button onClick={openModal}>
                        <Image
                          src={
                            "/static/dashboard/enterprisemanager/dashboard/arrow-down.png"
                          }
                          height={16}
                          width={16}
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <UserRole selectRole={handleSetRole} />
              )}
              <button
                className={`text-white h-[44px] hidden w-[68px] p-[12px] rounded-[4px] cursor-pointer ${
                  email.trim() && (selectedProperty?.Name || role)
                    ? "bg-blue-600"
                    : "bg-[#E6E6E6] text-[#D5D5D5]"
                } md:block`}
                onClick={handleInviteClick}
                disabled={!email.trim()} // Disable button when email is empty
              >
                Invite
              </button>
            </div>

            <p className="text-[14px] text-[400] leading-[21px]">
              Yet to add a property?{" "}
              <span className="text-blue-600">Add New Property</span>
            </p>
            <button
              className={`text-white h-[44px] p-[12px] rounded-[4px] cursor-pointer md:hidden ${
                email.trim() && (selectedProperty?.Name || role)
                  ? "bg-blue-600"
                  : "bg-[#E6E6E6] text-[#D5D5D5]"
              } md:block`}
              onClick={handleInviteClick}
              disabled={!email.trim()} // Disable button when email is empty
            >
              Invite
            </button>
          </>
        )}
      </main>
      <div className="">
        {landlords && <LandlordTable collapsed={collapse} />}
        {otherUsers && <OtherUsersTable collapsed={collapse} />}
      </div>
      <AddPropertyModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setSelectedProperty={handleSelectedProperty}
      />

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
              {`Your invite link has successfully been sent to /n ${email.trim()}`}
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
    </div>
  );
};

export default DashSettings;
