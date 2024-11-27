"use client";
import React, { useState } from 'react';
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import Update from '@/components/icons/update';
import Delete from '@/components/icons/delete';
import PopUpUpdateMenu from './popUpUpdateMenu.js';
import ConfirmModal from '../../components/confirmModal';
import DeleteModel from '../../components/deleteModal';
import api from '@/utils/api';
import PaymentRefetchTenant from '@/store/enterpriseStore/paymentRefetchTenant';
import useRentSummaryTenant from '@/store/enterpriseStore/rentSummaryTenant.js';
import useExportEnterpriseSingleTenant from '@/store/enterpriseStore/exportEnterpriseSingleTenant.js';

function PopUpMenu({ data, setDeleteModal, deleteModal, deleteSuccessModal, reFetchSummaryData, setDeleteSuccessModal, handleDelete, dropdownRef, handleUpdateForm, setUpdateForm, updateForm }) {
  // Move all hooks to the top
  const [activeThree, setActiveThree] = useState(false);
  const [activeFour, setActiveFour] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setRefetch } = PaymentRefetchTenant();
  const { fetchData: exportFetch } = useExportEnterpriseSingleTenant();

  // Conditional rendering after hooks
  if (!data) {
    return null;
  }

  const deletePayment = async () => {
    setRefetch(false);
    setLoading(true);
    const paymentId = data?._id
    const tenantId = data?.tenantId?._id
    try {
      const response = await api.delete(`/offlinePayment/enterprise/rent/tenant/${tenantId}/remove/${paymentId}/reference/${data?.reference}`)
      setRefetch(true);
      setDeleteSuccessModal(true);
      exportFetch(tenantId)
      reFetchSummaryData();

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
      {/* Update Record */}
      <div
        onMouseEnter={() => setActiveThree(true)}
        onMouseLeave={() => setActiveThree(false)}
        className={`${data?.paymentMethod !== "offline" ? "hidden" : ""} md:h-[30px] h-auto rounded-md flex gap-1 items-center py-1 px-2 text-GrayHomz hover:text-BlueHomz w-full`}>
        <button className="w-full" onClick={() => handleUpdateForm(data._id)}>
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
        <button className="w-full" onClick={() => handleDelete(data._id)}>
          <div className={`px-2 hover:bg-whiteblue flex gap-1 items-center h-full w-full rounded-md`}>
            <Delete className={activeFour ? '#D92D20' : undefined} classNameTwo={activeFour ? '#D92D20' : undefined} />
            <p className="text-[11px] md:text-[13px] font-[500] py-1 px-2 ">
              Delete
            </p>
          </div>
        </button>
      </div>
      {updateForm && (
        <CustomizedModal isOpen={updateForm}>
          <PopUpUpdateMenu
            data={data}
            setUpdateForm={setUpdateForm}
            setSuccessfulModal={setSuccessfulModal}
            reFetchSummaryData={reFetchSummaryData}
          />
        </CustomizedModal>
      )}
      {successfulModal && (
        <CustomizedModal isOpen={successfulModal}>
          <ConfirmModal
            header={"Offline Payment Updated Successfully"}
            body={`You have successfully updated offline payment record for ${data?.tenantId?.fullName}`}
            button={"Close"}
            returnHome={() => {
              setSuccessfulModal(false)
            }}
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
                  setRefetch(false)
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

export default PopUpMenu;
