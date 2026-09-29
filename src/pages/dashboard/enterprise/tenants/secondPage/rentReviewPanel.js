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

import {
  previewRentReviewLetter,
  createRentReview,
  updateRentReview,
  cancelRentReview,
  updateRentReviewBranding,
} from "@/api/rentReviewService";

const DEFAULT_REASON =
  "Annual rent review in line with current market rates for similar properties in the area.";

const RentReviewPanel = ({ tenantId, rentInfo }) => {
  const {
    data,
    loading,
    fetchData,
    getActiveReview,
  } = useRentReviewTenant();

  const activeReview = getActiveReview();

  const [showForm, setShowForm] = useState(false);

  // "fields" -> "letter": only the create flow goes through the letter step.
  // Editing an existing scheduled review stays on "fields".
  const [formStep, setFormStep] = useState("fields");

  const [newRent, setNewRent] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [reason, setReason] = useState("");
  const [letterBody, setLetterBody] = useState("");

  const [branding, setBranding] = useState({
    letterHeader: null,
    signature: null,
  });

  const [letterHeaderFile, setLetterHeaderFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (tenantId) {
      fetchData(tenantId);
    }
  }, [tenantId]);

  const isEditing =
    !!activeReview && activeReview.status === "scheduled";

  const openForm = () => {
    if (isEditing) {
      setNewRent(activeReview.newRent || "");

      setEffectiveDate(
        activeReview.effectiveDate
          ? new Date(activeReview.effectiveDate)
          : null
      );

      setReason(activeReview.reason || DEFAULT_REASON);
    } else {
      setNewRent("");
      setEffectiveDate(null);
      setReason(DEFAULT_REASON);
    }

    setLetterBody("");
    setLetterHeaderFile(null);
    setSignatureFile(null);

    setBranding({
      letterHeader: null,
      signature: null,
    });

    setFormStep("fields");
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const validateFields = () => {
    if (!newRent || !effectiveDate) {
      setError("New rent amount and effective date are required");

      toast.error(
        "New rent amount and effective date are required"
      );

      return false;
    }

    if (!reason || !reason.trim()) {
      setError("A reason for the rent review is required");

      toast.error(
        "A reason for the rent review is required"
      );

      return false;
    }

    return true;
  };

  // Editing an existing review:
  // no letter step, just save the fields directly.
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (submitting || !validateFields()) {
      return;
    }

    setSubmitting(true);

    const {
      success,
      error: apiError,
    } = await updateRentReview(activeReview._id, {
      newRent: processNumber(newRent),
      effectiveDate,
      reason,
    });

    setSubmitting(false);

    if (success) {
      setShowForm(false);
      setConfirm(true);
      fetchData(tenantId);
    } else {
      const message =
        apiError?.msg || "Could not save rent review";

      setError(message);
      toast.error(message);
    }
  };

  // Creating a new review:
  // generate the letter from the fields, then move to the letter step.
  const handleGenerateLetter = async (e) => {
    e.preventDefault();

    if (submitting || !validateFields()) {
      return;
    }

    setSubmitting(true);

    const {
      success,
      data: previewData,
      error: apiError,
    } = await previewRentReviewLetter(tenantId, {
      newRent: processNumber(newRent),
      effectiveDate,
      reason,
    });

    setSubmitting(false);

    if (success) {
      setLetterBody(previewData?.letterBody || "");

      setBranding({
        letterHeader: previewData?.letterHeader || null,
        signature: previewData?.signature || null,
      });

      setFormStep("letter");
      setError(null);
    } else {
      const message =
        apiError?.msg || "Could not generate the letter";

      setError(message);
      toast.error(message);
    }
  };

  const handleBackToFields = () => {
    setFormStep("fields");
    setError(null);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    if (!letterBody || !letterBody.trim()) {
      setError("The letter cannot be empty");
      toast.error("The letter cannot be empty");
      return;
    }

    setSubmitting(true);

    // Save any new letterhead/signature first so the backend
    // uses them when it sends the letter.
    if (letterHeaderFile || signatureFile) {
      const brandingResult =
        await updateRentReviewBranding({
          letterHeader: letterHeaderFile,
          signature: signatureFile,
        });

      if (!brandingResult.success) {
        setSubmitting(false);

        const message =
          brandingResult.error?.msg ||
          brandingResult.error?.message ||
          "Could not upload the letter header/signature";

        setError(message);
        toast.error(message);

        return;
      }

      setBranding({
        letterHeader:
          brandingResult.data?.rentReviewLetterHeader ||
          branding.letterHeader,

        signature:
          brandingResult.data?.rentReviewLetterSignature ||
          branding.signature,
      });
    }

    const {
      success,
      error: apiError,
    } = await createRentReview(tenantId, {
      newRent: processNumber(newRent),
      effectiveDate,
      reason,
      letterBody,
    });

    setSubmitting(false);

    if (success) {
      setShowForm(false);
      setConfirm(true);
      fetchData(tenantId);
    } else {
      const message =
        apiError?.msg ||
        "Could not schedule rent review";

      setError(message);
      toast.error(message);
    }
  };

  const handleCancelReview = async () => {
    if (!activeReview) {
      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);

    const {
      success,
      error: apiError,
    } = await cancelRentReview(
      activeReview._id,
      "Cancelled by manager"
    );

    setSubmitting(false);

    if (success) {
      toast.success("Rent review cancelled");
      fetchData(tenantId);
    } else {
      toast.error(
        apiError?.msg || "Could not cancel rent review"
      );
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
                ).toLocaleString()} takes effect (was due ${moment(
                  activeReview.effectiveDate
                ).format("DD MMM YYYY")}).`
              : `Rent review scheduled for ${moment(
                  activeReview.effectiveDate
                ).format(
                  "DD MMM YYYY"
                )} — ₦${Number(
                  activeReview.newRent
                ).toLocaleString()}`}
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

      {showForm && formStep === "fields" && (
        <CustomizedModal
          isOpen={showForm}
          onRequestClose={closeForm}
        >
          <div className="bg-white rounded-md w-full max-w-[480px] p-6">
            <h2 className="text-[18px] font-[700] text-BlackHomz mb-4">
              {isEditing ? "Edit Rent Review" : "Review Rent"}
            </h2>

            <form
              onSubmit={
                isEditing
                  ? handleUpdateSubmit
                  : handleGenerateLetter
              }
              className="flex flex-col gap-4"
            >
              {currentRent && (
                <p className="text-[13px] text-GrayHomz2">
                  Current rent: ₦
                  {Number(currentRent).toLocaleString()}
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
                  Effective Date{" "}
                  <span className="text-error">*</span>
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
                <label className="text-[14px] font-[500]">
                  Reason{" "}
                  <span className="text-error">*</span>
                </label>

                <textarea
                  className="px-4 py-2 border rounded-md w-full text-[14px] placeholder:text-GrayHomz2"
                  rows={3}
                  placeholder="Why is this rent being reviewed?"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setError(null);
                  }}
                />
              </div>

              {error && (
                <span className="text-[12px] text-error italic">
                  {error}
                </span>
              )}

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
                  {submitting ? (
                    <LoadingFormII />
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Next: Preview Letter"
                  )}
                </button>
              </div>
            </form>
          </div>
        </CustomizedModal>
      )}

      {showForm && formStep === "letter" && (
        <CustomizedModal
          isOpen={showForm}
          onRequestClose={closeForm}
        >
          <div className="bg-white rounded-md w-full max-w-[640px] p-6">
            <h2 className="text-[18px] font-[700] text-BlackHomz mb-2">
              Review the Letter
            </h2>

            <p className="text-[13px] text-GrayHomz2 mb-4">
              This is what will be sent to the tenant. Edit
              anything you'd like to change before sending.
            </p>

            <form
              onSubmit={handleSend}
              className="flex flex-col gap-4"
            >
              <textarea
                className="px-4 py-3 border rounded-md w-full text-[14px] font-mono leading-relaxed"
                rows={18}
                value={letterBody}
                onChange={(e) => {
                  setLetterBody(e.target.value);
                  setError(null);
                }}
              />

              <div className="border rounded-md p-4 flex flex-col gap-4">
                <div>
                  <p className="text-[14px] font-[600] text-BlackHomz">
                    Company letterhead
                  </p>

                  <p className="text-[12px] text-GrayHomz2 mt-1">
                    Upload the company header that should appear
                    at the top of the letter. PNG or JPG, max 5MB.
                  </p>

                  {branding.letterHeader?.url &&
                    !letterHeaderFile && (
                      <img
                        src={branding.letterHeader.url}
                        alt="Current company letterhead"
                        className="mt-3 max-h-[90px] max-w-full object-contain border rounded-md"
                      />
                    )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="mt-3 text-[12px]"
                    onChange={(e) =>
                      setLetterHeaderFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  {letterHeaderFile && (
                    <p className="text-[12px] text-GrayHomz2 mt-1">
                      {letterHeaderFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-[14px] font-[600] text-BlackHomz">
                    Signature
                  </p>

                  <p className="text-[12px] text-GrayHomz2 mt-1">
                    Upload the signature to place at the end of
                    the letter. PNG or JPG, max 5MB.
                  </p>

                  {branding.signature?.url &&
                    !signatureFile && (
                      <img
                        src={branding.signature.url}
                        alt="Current signature"
                        className="mt-3 max-h-[80px] max-w-[220px] object-contain border rounded-md"
                      />
                    )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="mt-3 text-[12px]"
                    onChange={(e) =>
                      setSignatureFile(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                  {signatureFile && (
                    <p className="text-[12px] text-GrayHomz2 mt-1">
                      {signatureFile.name}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <span className="text-[12px] text-error italic">
                  {error}
                </span>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleBackToFields}
                  className="h-[44px] w-full border rounded-md text-[14px] font-[500]"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="h-[44px] w-full bg-BlueHomz text-white rounded-md text-[14px] font-[500] flex justify-center items-center"
                >
                  {submitting ? (
                    <LoadingFormII />
                  ) : (
                    "Send & Schedule Review"
                  )}
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