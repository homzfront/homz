"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "./components/dropDownManageUsers";
import Invites from "./components/invites";
import Input from "../../components/input";
import ConfirmModal from "../../components/confirmModal";
import ToggleButton from "../../components/toggle";
import DropDown from "/src/pages/dashboard/enterprise/components/dropDownTwo";
import Link from "next/link";

const ManageUsers = () => {
  const options = [
    { id: 1, label: "Can View" },
    { id: 2, label: "Can Edit" },
  ];

  // State to store the selected option
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [selectOp, setSelectedOp] = useState([]);
  const [dataEmail, setDataEmail] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const option2 = [
    { id: 1, label: "Sunshine Estate" },
    { id: 2, label: "Unity Estate" },
    { id: 3, label: "Diamond Estate" },
    { id: 4, label: "Ajao Estate" },
    { id: 5, label: "Heaven Estate" },
  ];

  const [selectedRoleTwo, setSelectedRoleTwo] = useState(null);
  const [pickedEstate, setPickedEstate] = useState([]);

  const handleSelectEstate = (estate) => {
    setSelectedRoleTwo(estate);
    setPickedEstate(estate);
  };

  // Handle the selection of an option
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedOp(role);
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // useEffect to handle scrolling
  useEffect(() => {
    document.body.style.overflow = openModal ? "hidden" : "auto";
    if (openModal) {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [openModal]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setDataEmail(email);
    setOpenModal(!openModal);
    // Do something with the collected data, e.g., send it to the server
    console.log("Selected Role:", selectedRole);
    console.log("Email:", email);
  };
  const returnHome = () => {
    setOpenModal(false);
    setIsOpen(false);
    setSelectedOp([]);
    setEmail("");
  };

  // Determine if the button should be disabled based on the email input value
  const isButtonDisabled = !email;

  return (
    <div>
      <div className="border-t border-b p-8">
        <div className="text-[14px] font-[400] text-GrayHomz">
          Add other persons to view and maintain your property management
          dashboard
        </div>
        <div className="flex gap-6 items-center mt-6">
          <div className="w-[360px]">
            <Input
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <Dropdown
              options={options}
              selectOption={"Can Edit"}
              onSelect={handleRoleSelect}
            />
          </div>

          <button
            onClick={handleSubmit}
            className={` h-[45px] mt-2 text-[16px] font-[700]  px-[15px] rounded-md ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed bg-GrayHomz6 text-GrayHomz5" : "bg-BlueHomz text-white"
            }`}
            disabled={isButtonDisabled}
          >
            Invite
          </button>
        </div>
        {selectOp.label === "Can View" && (
          <div className="mt-4">
            <div className="flex gap-3 items-center">
              <ToggleButton onToggle={handleToggle} isOpen={isOpen} />{" "}
              <p
                className={`text-[16px] font-[400] ${
                  !isOpen ? "text-GrayHomz2" : "text-BlackHomz"
                } `}
              >
                View as property owner
              </p>
            </div>
            {isOpen && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-[14px] font-[500]">
                  Select property you want property owner to view
                </p>
                <DropDown
                  options={option2}
                  className={"w-[350px]"}
                  onSelect={handleSelectEstate}
                  selectOption={"Select Property"}
                />
               <div className="flex gap-1"> 
               <p className="text-[14px] font-[400] text-GrayHomz">
                  Yet to add a property?
                </p>
                <Link href={""} className="text-[14px] font-[700] text-BlueHomz">
                  Add New Property
                </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {openModal && (
        <ConfirmModal
          header={"Invite Sent Successfully"}
          body={`Your invite link has successfully been sent to ${dataEmail}`}
          button={"Close"}
          returnHome={returnHome}
        />
      )}
      <Invites />
    </div>
  );
};

export default ManageUsers;
