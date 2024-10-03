"use client";
import React, { useState } from 'react';
import Link from "next/link";
import Profile from '@/components/icons/profile';
import Details from '@/components/icons/details';
import PopUpMenu from './popUpMenu';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Update from '@/components/icons/update';
import Delete from '@/components/icons/delete';
import PopUpUpdateMenu from './popUpUpdateMenu';
import ConfirmModal from '../../components/confirmModal';
import DeleteModel from '../../components/deleteModal';
import api from '@/utils/api';
import RefetchPayment from '@/store/enterpriseStore/paymentRefetch';
import useExportRentPayment from '@/store/enterpriseStore/exportRentPayment';
import useEnterpriseRevenueStore from '@/store/enterpriseStore/enterpriseRevenue';

function PopUpMenuTwo({ data, setDeleteModal, deleteModal, deleteSuccessModal, setDeleteSuccessModal, handleDataToggle, setPopUpMenu, popUpMenu, handleDelete, dropdownRef, handleUpdateForm, setUpdateForm, updateForm, setFetchDataAgain }) {
  // Move all hooks to the top
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setRefetch } = RefetchPayment();
  const { fetchData } = useExportRentPayment();
  const { fetchData: fetchRevData } = useEnterpriseRevenueStore();


  const deletePayment = async () => {
    setRefetch(false);
    setLoading(true);
    const paymentId = data?._id
    const tenantId = data?.tenantId?._id
    try {
      const response = await api.delete(`/offlinePayment/enterprise/rent/tenant/${tenantId}/remove/${paymentId}/reference/${data?.reference}`)
      if (response?.data?.success === true) {
        setRefetch(true);
        setDeleteSuccessModal(true);
        fetchData();
        fetchRevData();
      } else {
      }
    } catch (error) {
      if (error && error?.response?.data?.error?.errors) {
      }
      else if (error && error?.response?.data?.message) {
      } else {
        throw error
      }
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div
      ref={dropdownRef}
      className="drop-down absolute top-11 z-100 w-[150px] md:w-[180px] text-GrayHomz font-[500] text-[13px] right-[67px] border py-2 rounded-md bg-white flex flex-col items-center justify-around">

      {/* View Profile */}
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="md:h-[30px] h-auto rounded-md flex gap-1 items-center text-GrayHomz hover:text-BlueHomz py-1 px-2 w-full ">
        <Link className="w-full" href={`/dashboard/enterprise-property/tenants/profile/${data?.tenantId?._id}`}>
          <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
            <Profile className={active ? '#006AFF' : undefined} />
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2">
              View Profile
            </p>
          </div>
        </Link>
      </div>

      {/* View All Details */}
      <div
        onMouseEnter={() => setActiveTwo(true)}
        onMouseLeave={() => setActiveTwo(false)}
        className="md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full ">
        <button className="w-full" onClick={() => handleDataToggle(data?._id)}>
          <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
            <Details className={activeTwo ? '#006AFF' : undefined} />
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
              View All Details
            </p>
          </div>
        </button>
      </div>

      {/* Update Record */}
      <div
        onMouseEnter={() => setActiveThree(true)}
        onMouseLeave={() => setActiveThree(false)}
        className={`${data?.paymentMethod !== "offline" ? "hidden" : ""} md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full`}>
        <button className="w-full" onClick={() => {
          setRefetch(false)
          handleUpdateForm(data?._id)
        }}>
          <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
            <Update className={activeThree ? '#006AFF' : undefined} />
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
              Update record
            </p>
          </div>
        </button>
      </div>

      {/* Delete */}
      <div
        onMouseEnter={() => setActiveFour(true)}
        onMouseLeave={() => setActiveFour(false)}
        className={`${data?.paymentMethod !== "offline" ? "hidden" : ""} md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-[#D92D20] w-full`}>
        <button className="w-full" onClick={() => handleDelete(data?._id)}>
          <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
            <Delete className={activeFour ? '#D92D20' : undefined} classNameTwo={activeFour ? '#D92D20' : undefined} />
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
              Delete
            </p>
          </div>
        </button>
      </div>

      {/* Customized Modals */}
      {popUpMenu && (
        <CustomizedModal isOpen={popUpMenu}>
          <PopUpMenu data={data} setPopUpMenu={setPopUpMenu} />
        </CustomizedModal>
      )}
      {updateForm && (
        <CustomizedModal isOpen={updateForm}>
          <PopUpUpdateMenu
            data={data}
            setUpdateForm={setUpdateForm}
            setSuccessfulModal={setSuccessfulModal}
          />
        </CustomizedModal>
      )}
      {successfulModal && (
        <CustomizedModal isOpen={successfulModal}>
          <ConfirmModal
            header={"Offline Payment Updated Successfully"}
            body={`You have successfully updated offline payment record for ${data?.tenantId?.fullName}`}
            button={"Close"}
            returnHome={() => setSuccessfulModal(false)}
          />
        </CustomizedModal>
      )}
      {deleteModal && (
        <CustomizedModal isOpen={deleteModal}>
          {
            deleteSuccessModal ?
              <ConfirmModal
                header={`Offline Payment Record Deleted Successfully`}
                button={"Close"}
                returnHome={() => {
                  setDeleteModal(false)
                  setDeleteSuccessModal(false)
                }}
              />
              :
              <DeleteModel
                loading={loading}
                header={"Delete Payment Record?"}
                body={`You are about to delete this offline payment record for ${data?.tenantId?.fullName}`}
                button={"Proceed"}
                buttonTwo={"Cancel"}
                returnHome={deletePayment}
                returnHomeTwo={() => setDeleteModal(false)}
              />
          }
        </CustomizedModal>
      )}
    </div>
  );
}

export default PopUpMenuTwo;
