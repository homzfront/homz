import BankDetails from "@/components/icons/bankDetails";
import Dashboard from "@/components/icons/dashboard";
import Document from "@/components/icons/document";
import ImportIcon from "@/components/icons/importIcon";
import Info from "@/components/icons/info";
import PeopleTenant from "@/components/icons/people-tenant";
import PropertyInfo from "@/components/icons/propertyInfo";
import Reminder from "@/components/icons/reminder";
import useEditPropertyTab from "@/store/enterpriseStore/useEditPropertyTab";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import InviteTenant from "../importTenant/inviteTenant";
import SingleInvite from "../importTenant/components/singleInvite";
import useClickOutside from "@/utils/clickOutside";
import BulkInvite from "../importTenant/components/bulkInvite";
import ConfirmModal from "../../components/confirmModal";
import useCSVFileStore from "@/store/document/useCSVFileStore";
import useTenantForInvite from "@/store/enterpriseStore/useTenantForInvite";
import ExceedTenant from "../importTenant/components/ExceedTenant";
import ImportSummary from "../importTenant/components/importSummary";

const PopUpMenu = ({ estateData, openTenantInvite, setOpenTenantInvite }) => {
 const { setOpenMapping} = useCSVFileStore();
  const { setTab } = useEditPropertyTab();
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [activeFive, setActiveFive] = useState(false);
  const [activeSix, setActiveSix] = useState(false);
  const [activeSeven, setActiveSeven] = useState(false);
  const [openSingleInvite, setOpenSingleInvite] = useState(false);
  const [openBulkInvite, setOpenBulkInvite] = useState(false);
  const dropdownRef = useClickOutside(() => {
    setOpenMapping(false)
    setOpenTenantInvite(false)});
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [importData, setImportData] = useState(false);
  const { setCSVFile, CSVFile, setEstateId, response } = useCSVFileStore();
  const { tenantData } = useTenantForInvite()
  const [showNumberOfHouseModal, setShowNumberOfHouseModal] = useState(false);
  const [unimportedTenantModal, setUnimportedTenantModal] = useState(false);
  const [showMappingSummaryModal, setShowMappingSummaryModal] = useState(false);
  const [unimportedTenantRentModal, setUnimportedTenantRentModal] = useState(false);

  console.log(showNumberOfHouseModal)
  console.log(estateData)
  console.log(CSVFile);
  console.log(response?.data?.successfulUploads)

  return (
    <div className="z-20 drop-down absolute text-GrayHomz py-2 font-[500] top-5 md:top-8 right-1 md:right-2 border h-auto w-[150px] md:w-[218px] rounded-lg bg-white flex flex-col items-center justify-around">
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz px-2 w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/estates/dashboard/${estateData?._id}`}>
          {active ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Dashboard className='#006AFF' classNameTwo="#006AFF" />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Dashboard
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <Dashboard />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2  ">
                View Dashboard
              </p>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveTwo(true)}
        onMouseLeave={() => setActiveTwo(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/estates/tenants/${estateData?._id}`}>
          {activeTwo ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <PeopleTenant className='#006AFF' />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View Tenants
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <PeopleTenant />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                View Tenants
              </p>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveSeven(true)}
        onMouseLeave={() => setActiveSeven(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full cursor-pointer">
        <div className="w-full" onClick={() => setOpenTenantInvite(true)}>
          {activeSeven ?
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <ImportIcon className='#006AFF' />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                Manually add Tenant(s)
              </p>
            </div> :
            <div className="px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md">
              <ImportIcon />
              <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
                Manually add Tenant(s)
              </p>
            </div>
          }
        </div>
      </div>
      {
        <CustomizedModal isOpen={openTenantInvite} onRequestClose={() => setOpenTenantInvite(false)}>
          <div ref={dropdownRef}>
            {showMappingSummaryModal ?
              <ImportSummary
                setShowMappingSummaryModal={setShowMappingSummaryModal}
                unimportedTenantModal={unimportedTenantModal}
                setUnimportedTenantModal={setUnimportedTenantModal}
                unimportedTenantRentModal={unimportedTenantRentModal}
                setUnimportedTenantRentModal={setUnimportedTenantRentModal}
                setSuccessfulModal={setSuccessfulModal}
                estateId={estateData?._id}
              /> :
              showNumberOfHouseModal ?
                <ExceedTenant estateData={estateData} setShowNumberOfHouseModal={setShowNumberOfHouseModal} />
                :
                successfulModal ?
                  <ConfirmModal
                    returnHome={() => {
                      setSuccessfulModal(false)
                      setOpenTenantInvite(false)
                      setOpenSingleInvite(false)
                      setCSVFile(null);
                      setEstateId(null);
                      setImportData(false)
                      setOpenBulkInvite(false)
                      setShowNumberOfHouseModal(false);
                      setUnimportedTenantModal(false);
                      setShowMappingSummaryModal(false);
                      setUnimportedTenantRentModal(false);
                    }}
                    button={"Close"}
                    header={`${response ? "Tenant(s)" : "Tenant"} Added Successfully!`}
                    body={
                      response
                        ? `Tenants have been imported and have received invitation links via email.`
                        : `An invitation link to join ${estateData?.name} has been sent to ${tenantData ? tenantData?.email : ""} mail.`
                    }
                  />
                  :
                  importData ?
                    <ConfirmModal
                      returnHome={() => {
                        setSuccessfulModal(false)
                        setOpenTenantInvite(false)
                        setOpenSingleInvite(false)
                        setCSVFile(null);
                        setEstateId(null);
                        setImportData(false)
                        setOpenBulkInvite(false)
                      }}
                      button={"Close"}
                      header={`${CSVFile ? [CSVFile?.length] : 0} Tenant(s) Imported Successfully!
                      `}
                      body={`
                    Invitation links to join ${estateData?.name} been sent to the mails of all imported tenants with an email attribute.
                    `}
                    />
                    :
                    openSingleInvite ? <SingleInvite setSuccessfulModal={setSuccessfulModal} setOpenSingleInvite={setOpenSingleInvite} setOpenTenantInvite={setOpenTenantInvite} estateName={estateData?.name} estateId={estateData?._id} /> :
                      openBulkInvite ? <BulkInvite
                        showNumberOfHouseModal={showNumberOfHouseModal}
                        setShowNumberOfHouseModal={setShowNumberOfHouseModal}
                        setOpenBulkInvite={setOpenBulkInvite} estateData={estateData}
                        setImportData={setImportData}
                        setShowMappingSummaryModal={setShowMappingSummaryModal}
                      /> :
                        <InviteTenant setOpenBulkInvite={setOpenBulkInvite} id={estateData?._id} setOpenTenantInvite={setOpenTenantInvite} openSingleInvite={openSingleInvite} setOpenSingleInvite={setOpenSingleInvite} />
            }
          </div>
        </CustomizedModal>
      }
      <div
        onMouseEnter={() => setActiveThree(true)}
        onMouseLeave={() => setActiveThree(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${estateData?._id}`}>
          {activeThree ?
            <div
              onClick={() => {
                setTab("bank")
              }}
              className="hover:bg-whiteblue flex items-center justify-between py-1 px-2 h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] flex items-center gap-3">
                <BankDetails className='#006AFF' />
                <span className="mt-1">Add Bank Details</span>
              </div>
              <Info classNameTwo="#006AFF" className='#006AFF' />
            </div> :
            <div
              onClick={() => {
                setTab("bank")
              }}
              className="hover:bg-whiteblue flex items-center justify-between py-1 px-2 h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] flex items-center gap-3">
                <BankDetails />
                <span className="mt-1">Add Bank Details</span>
              </div>
              <Info />
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveFour(true)}
        onMouseLeave={() => setActiveFour(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/reminder-multiple/${estateData?._id}`}>
          {activeFour ?
            <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 flex items-center gap-2.5">
                <Reminder className='#006AFF' classNameTwo="#006AFF" />
                <span className="mt-1"> Set rent due reminder</span>
              </div>
            </div> :
            <div className="hover:bg-whiteblue flex items-center h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] py-1 px-2 flex items-center gap-2.5">
                <Reminder />
                <span className="mt-1"> Set rent due reminder</span>
              </div>
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveFive(true)}
        onMouseLeave={() => setActiveFive(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <Link
          className="w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${estateData?._id}`}>
          {activeFive ?
            <div
              onClick={() => {
                setTab("document")
              }}
              className="hover:bg-whiteblue flex items-center justify-between py-1 px-2 h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] flex items-center gap-3 ">
                <Document className='#006AFF' />
                <span className="mt-1">Property Documents</span>
              </div>
              <Info classNameTwo="#006AFF" className='#006AFF' />
            </div> :
            <div
              onClick={() => {
                setTab("document")
              }}
              className="hover:bg-whiteblue flex items-center justify-between py-1 px-2 h-full w-full rounded-md">
              <div className="text-[11px] md:text-[13px] font-[500] flex items-center gap-3 ">
                <Document />
                <span className="mt-1">Property Documents</span>
              </div>
              <Info />
            </div>
          }
        </Link>
      </div>
      <div
        onMouseEnter={() => setActiveSix(true)}
        onMouseLeave={() => setActiveSix(false)}
        className=" md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz px-2 w-full ">
        <Link className="hidden md:block w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${estateData?._id}`}>
          {activeSix ?
            <div
              onClick={() => {
                setTab(null)
              }}
              className="px-2 hover:bg-whiteblue flex gap-0.5 items-center h-full w-full rounded-md">
              <PropertyInfo className="#006AFF" />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Information
              </p>
            </div> :
            <div
              onClick={() => {
                setTab(null)
              }}
              className="px-2 hover:bg-whiteblue flex gap-0.5 items-center h-full w-full rounded-md">
              <PropertyInfo />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Information
              </p>
            </div>
          }
        </Link>
        <Link className="md:hidden w-full" href={`/dashboard/enterprise-property/estates/estateInfo/${estateData?._id}`}>
          {activeSix ?
            <div
              onClick={() => {
                setTab(null)
              }}
              className="px-2 hover:bg-whiteblue flex items-center gap-1 h-full w-full rounded-md">
              <PropertyInfo className="#006AFF" />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Info..
              </p>
            </div> :
            <div
              onClick={() => {
                setTab(null)
              }}
              className="px-2 hover:bg-whiteblue flex items-center gap-1 h-full w-full rounded-md">
              <PropertyInfo />
              <p className="text-[11px] md:text-[13px] truncate font-[500] py-1 px-2 ">
                Manage Property Info..
              </p>
            </div>
          }
        </Link>
      </div>
    </div>
  );
};

export default PopUpMenu;
