"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import Input from "../../components/input";
import ConfirmModal from "../../components/confirmModal";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import DateIcon from "@/components/icons/date";
import processNumber from "@/utils/processNumber";
import useRentReviewTenant from "@/store/enterpriseStore/rentReview";
import { createRentReview, updateRentReview, cancelRentReview } from "@/api/rentReviewService";

// Slots into the "Rent Information" tab (see widget.js) alongside RentPeriodForm — spec §2.5:
// "Tenant Profile → Rent Details tab: 'Review Rent' action + scheduled review badge."
const RentReviewPanel = ({ tenantId, rentInfo }) => {
  const { data, loading, fetchData, getActiveReview } = useRentReviewTenant();
  const activeReview = getActiveReview();

  const [showForm, setShowForm] = useState(false);
  const [newRent, setNewRent] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (tenantId) fetchData(tenantId);
  }, [tenantId]);

  const isEditing = !!activeReview && activeReview.status === "scheduled";

  const openForm = () => {
    if (isEditing) {
      setNewRent(activeReview.newRent || "");
      setEffectiveDate(activeReview.effectiveDate ? new Date(activeReview.effectiveDate) : null);
      setNote(activeReview.note || "");
    } else {
      setNewRent("");
      setEffectiveDate(null);
      setNote("");
    }
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!newRent || !effectiveDate) {
      setError("New rent amount and effective date are required");
      toast.error("New rent amount and effective date are required");
      return;
    }

    setSubmitting(true);
    const payload = {
      newRent: processNumber(newRent),
      effectiveDate,
      note,
    };

    const { success, error: apiError } = isEditing
      ? await updateRentReview(activeReview._id, payload)
      : await createRentReview(tenantId, payload);

    setSubmitting(false);

    if (success) {
      setShowForm(false);
      setConfirm(true);
      fetchData(tenantId);
    } else {
      const message = apiError?.msg || "Could not save rent review";
      setError(message);
      toast.error(message);
    }
  };

  const handleCancelReview = async () => {
    if (!activeReview) return;
    if (submitting) return;
    setSubmitting(true);
    const { success, error: apiError } = await cancelRentReview(activeReview._id, "Cancelled by manager");
    setSubmitting(false);
    if (success) {
      toast.success("Rent review cancelled");
      fetchData(tenantId);
    } else {
      toast.error(apiError?.msg || "Could not cancel rent review");
    }
  };

  const currentRent = rentInfo?.upDateddata?.rent;

  return (
    <div className="mb-4">
      {activeReview && (
        <div
          className={`rounded-md px-4 py-3 mb-3 text-[14px] font-[500] flex flex-col md:flex-row md:items-center md:justify-between gap-2 ${
            activeReview.status === "held_for_balance"
              ? "bg-[#FEF3F2] text-[#B42318]"
              : "bg-whiteblue text-BlueHomz"
          }`}
        >
          <span>
            {activeReview.status === "held_for_balance"
              ? `Rent review on hold — outstanding balance must be cleared before ₦${Number(
                  activeReview.newRent
                ).toLocaleString()} takes effect (was due ${moment(activeReview.effectiveDate).format(
                  "DD MMM YYYY"
                )}).`
              : `Rent review scheduled for ${moment(activeReview.effectiveDate).format(
                  "DD MMM YYYY"
                )} — ₦${Number(activeReview.newRent).toLocaleString()}`}
          </span>
          <div className="flex gap-3 shrink-0">
            {activeReview.status === "scheduled" && (
              <>
                <button
                  onClick={openForm}
                  className="text-[13px] font-[600] underline"
                >
                  Edit
                </button>
                <button
                  onClick={handleCancelReview}
                  className="text-[13px] font-[600] underline text-error"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {!activeReview && (
        <button
          onClick={openForm}
          className="h-[40px] px-4 border border-BlueHomz text-BlueHomz rounded-md text-[14px] font-[500]"
        >
          Review Rent
        </button>
      )}

      {showForm && (
        <CustomizedModal isOpen={showForm} onRequestClose={closeForm}>
          <div className="bg-white rounded-md w-full max-w-[480px] p-6">
            <h2 className="text-[18px] font-[700] text-BlackHomz mb-4">
              {isEditing ? "Edit Rent Review" : "Review Rent"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {currentRent && (
                <p className="text-[13px] text-GrayHomz2">
                  Current rent: ₦{Number(currentRent).toLocaleString()}
                </p>
              )}
              <Input
                label="New Rent Amount"
                span="*"
                type="text"
                placeholder="e.g 850,000"
                value={newRent}
                onChange={(e) => {
                  setNewRent(e.target.value);
                  setError(null);
                }}
              />
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500]">
                  Effective Date <span className="text-error">*</span>
                </label>
                <div className="relative w-full rounded-md border">
                  <DatePicker
                    selected={effectiveDate}
                    onChange={(date) => {
                      setEffectiveDate(date);
                      setError(null);
                    }}
                    minDate={new Date()}
                    dateFormat="d MMMM, yyyy"
                    placeholderText="Select Date"
                    className="w-full h-[41px] px-4 py-2"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <DateIcon />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500]">Note (optional)</label>
                <textarea
                  className="px-4 py-2 border rounded-md w-full text-[14px] placeholder:text-GrayHomz2"
                  rows={3}
                  placeholder="Reason for review"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              {error && <span className="text-[12px] text-error italic">{error}</span>}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="h-[44px] w-full border rounded-md text-[14px] font-[500]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[44px] w-full bg-BlueHomz text-white rounded-md text-[14px] font-[500] flex justify-center items-center"
                >
                  {submitting ? <LoadingFormII /> : isEditing ? "Save Changes" : "Schedule Review"}
                </button>
              </div>
            </form>
          </div>
        </CustomizedModal>
      )}

      {confirm && (
        <ConfirmModal
          header="Rent Review Scheduled"
          body="The tenant has been notified. Their rent will switch automatically on the effective date, unless there's an outstanding balance."
          button="Okay"
          returnHome={() => setConfirm(false)}
        />
      )}
    </div>
  );
};

export default RentReviewPanel;