import React from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import StatusDropdown from "./statusDropDown";

const VisitorAccessInfo = ({
  tenant,
  typeOfUser,
  detailsModalIsOpen,
  closeDetailsMobileModal,
  isOpen,
  handleStatusChange,
  toggleDropdown,
}) => {
  return (
    <CustomizedModal
      isOpen={detailsModalIsOpen}
      onRequestClose={closeDetailsMobileModal}
    >
      <div className="sm:hidden bg-white border flex flex-col w-[360px] py-6 px-4 rounded-[12px] gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-BlueHomz text-[14px] font-medium mb-2">
            Access Request Information
          </p>
          <button onClick={closeDetailsMobileModal} className="cursor-pointer">
            <Image
              src="/static/images/close-square.svg"
              height={24}
              width={24}
              alt="Close modal"
            />
          </button>
        </div>

        {/* Tenant Information */}
        <div className="w-full p-4 grid grid-cols-2 gap-y-4 gap-x-4 rounded-[12px] bg-[#F6F6F6]">
          {[
            { label: "Tenant’s Name", value: tenant.TenantName },
            { label: "Property", value: tenant.Property },
            { label: "Apartment Number", value: tenant.ApartmentNo },
            { label: "Address", value: tenant.Address },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-[12px] text-gray-500 font-medium">
                {item.label}
              </p>
              <p className="text-[12px] text-gray-700 font-normal">
                {item.value}
              </p>
            </React.Fragment>
          ))}
        </div>

        {/* Visitor Information */}
        <div className="w-full p-4 grid grid-cols-2 gap-y-4 gap-x-4 rounded-[12px] bg-[#F6F6F6]">
          {[
            { label: "Visitor’s Name", value: tenant.VisitorName },
            { label: "Phone Number", value: tenant.Phone_Number },
            { label: "Purpose", value: tenant.PurposeOfVisit },
            { label: "No of visitors", value: tenant.No_Of_Persons },
            { label: "Date of visit", value: tenant.DateOfVisit },
            { label: "Access Code", value: tenant.AccessCode },
            {
              label: "Access Status",
              value: (
                <StatusDropdown
                  data={tenant}
                  handleStatusChange={handleStatusChange}
                  isOpen={isOpen}
                  toggleDropdown={toggleDropdown}
                />
              ),
            },
            { label: "Tenant’s Name", value: tenant.TenantName },
            { label: "Time In", value: tenant.TimeIn },
            { label: "Time Out", value: tenant.Time_Out },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <p className="text-[12px] text-gray-500 font-medium">
                {item.label}
              </p>
              <p className="text-[12px] text-gray-700 font-normal">
                {item.value}
              </p>
            </React.Fragment>
          ))}
        </div>

        {/* View Tenant Profile Button */}
        {typeOfUser !== "security" && (
          <button
            className="bg-[#006AFF] text-white text-[14px] font-medium flex items-center justify-center gap-2 rounded-md h-[42px] py-2"
            onClick={() => viewTenantProfile(tenantId)}
          >
            <Image
              src="/static/images/new_user.svg"
              height={16}
              width={16}
              alt="View tenant"
            />
            <span>View tenant’s profile</span>
          </button>
        )}
      </div>
    </CustomizedModal>
  );
};

export default VisitorAccessInfo;
