import React from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Image from "next/image";
import StatusDropdown from "./statusDropDown";
import formatTime from "@/utils/formatTime";
import changeBackendDateFormat from "@/utils/changeBackendDateFormat";
import Link from "next/link";


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
            { label: "Tenant’s Name", value: tenant?.tenant?.fullName },
            { label: "Property", value: tenant?.estateId?.name },
            { label: "Apartment Number", value: tenant?.apartmentNo },
            { label: "Address", value: tenant?.tenant?.houseAddress },
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
            { label: "Visitor’s Name", value: tenant?.visitorName },
            { label: "Phone Number", value: tenant?.visitorPhoneNumber },
            { label: "Purpose", value: tenant?.purposeOfVisit },
            { label: "No of visitors", value: tenant?.noOfPersons },
            { label: "Date of visit", value: changeBackendDateFormat(tenant?.dateOfVisit) },
            { label: "Access Code", value: tenant?.accessCode },
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
            { label: "Tenant’s Name", value: tenant?.tenant?.fullName },
            { label: "Time In", value: formatTime(tenant?.timeIn) },
            { label: "Time Out", value: formatTime(tenant?.timeOut) },
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
          <Link
            className="bg-[#006AFF] text-white text-[14px] font-medium flex items-center justify-center gap-2 rounded-md h-[42px] py-2"
            href={`/dashboard/enterprise-property/tenants/profile/${tenant?.tenant?._id}`}
          >
            <Image
              src="/static/images/new_user.svg"
              height={16}
              width={16}
              alt="View tenant"
            />
            <span>View tenant’s profile</span>
          </Link>
        )}
      </div>
    </CustomizedModal>
  );
};

export default VisitorAccessInfo;
