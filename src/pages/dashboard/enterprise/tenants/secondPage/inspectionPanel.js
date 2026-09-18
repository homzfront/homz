"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/confirmModal";
import CustomizedModal from "@/components/mainmenu/CustomizedModal";
import LoadingFormII from "@/components/mainmenu/loadingFormII";
import DateIcon from "@/components/icons/date";
import useInspectionTenant from "@/store/enterpriseStore/inspection";
import {
  createInspection,
  rescheduleInspection,
  completeInspection,
  cancelInspection,
} from "@/api/inspectionService";

const statusStyles = {
  scheduled: "bg-whiteblue text-BlueHomz",
  completed: "bg-[#ECFDF3] text-[#027A48]",
  cancelled: "bg-[#F2F4F7] text-GrayHomz2",
  rescheduled: "bg-whiteblue text-BlueHomz",
};

// New "Inspection" tab on the tenant profile (spec §3.5) — date+time input, reminder status,
// and inspection history.
const InspectionPanel = ({ tenantId }) => {
  const { data, loading, fetchData, getScheduledInspection } = useInspectionTenant();
  const scheduled = getScheduledInspection();

  const [showForm, setShowForm] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [inspectionDate, setInspectionDate] = useState(null);
  const [inspectionTime, setInspectionTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [completeNotes, setCompleteNotes] = useState("");

  useEffect(() => {
    if (tenantId) fetchData(tenantId);
  }, [tenantId]);

  const openForm = (reschedule = false) => {
    setIsReschedule(reschedule);
    if (reschedule && scheduled) {
      setInspectionDate(scheduled.inspectionDate ? new Date(scheduled.inspectionDate) : null);
      setInspectionTime(scheduled.inspectionTime || "");
    } else {
      setInspectionDate(null);
      setInspectionTime("");
    }
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!inspectionDate || !inspectionTime) {
      setError("Both an inspection date and time are required");
      toast.error("Both an inspection date and time are required");
      return;
    }

    setSubmitting(true);
    const payload = { inspectionDate, inspectionTime };

    const { success, error: apiError } =
      isReschedule && scheduled
        ? await rescheduleInspection(scheduled._id, payload)
        : await createInspection(tenantId, payload);

    setSubmitting(false);

    if (success) {
      setShowForm(false);
      setConfirm({
        header: isReschedule ? "Inspection Rescheduled" : "Inspection Scheduled",
        body: "The tenant will get a reminder 72 hours before the inspection date.",
      });
      fetchData(tenantId);
    } else {
      const message = apiError?.msg || "Could not save inspection";
      setError(message);
      toast.error(message);
    }
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    if (!scheduled || submitting) return;
    setSubmitting(true);
    const { success, data: updated, error: apiError } = await completeInspection(scheduled._id, completeNotes);
    setSubmitting(false);
    if (success) {
      setShowCompleteForm(false);
      setCompleteNotes("");
      const nextDate = updated?.nextInspectionDate
        ? moment(updated.nextInspectionDate).format("DD MMM YYYY")
        : null;
      setConfirm({
        header: "Inspection Completed",
        body: nextDate
          ? `Marked as completed. The next inspection cycle is suggested for ${nextDate}.`
          : "Marked as completed.",
      });
      fetchData(tenantId);
    } else {
      toast.error(apiError?.msg || "Could not mark inspection completed");
    }
  };

  const handleCancel = async () => {
    if (!scheduled || submitting) return;
    setSubmitting(true);
    const { success, error: apiError } = await cancelInspection(scheduled._id, "Cancelled by manager");
    setSubmitting(false);
    if (success) {
      toast.success("Inspection cancelled");
      fetchData(tenantId);
    } else {
      toast.error(apiError?.msg || "Could not cancel inspection");
    }
  };

  const history = (data || []).filter((inspection) => inspection.status !== "scheduled");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-[700] text-BlackHomz">Inspection</h2>
        {!scheduled && (
          <button
            onClick={() => openForm(false)}
            className="h-[40px] px-4 border border-BlueHomz text-BlueHomz rounded-md text-[14px] font-[500]"
          >
            Schedule Inspection
          </button>
        )}
      </div>

      {loading && <p className="text-[14px] text-GrayHomz2">Loading...</p>}

      {scheduled && (
        <div className="rounded-md px-4 py-3 bg-whiteblue text-BlueHomz text-[14px] font-[500] flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>
            Inspection scheduled for {moment(scheduled.inspectionDate).format("DD MMM YYYY")} at{" "}
            {scheduled.inspectionTime}
            {scheduled.reminderSent ? " — reminder sent" : ""}
          </span>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => openForm(true)} className="text-[13px] font-[600] underline">
              Reschedule
            </button>
            <button
              onClick={() => setShowCompleteForm(true)}
              className="text-[13px] font-[600] underline"
            >
              Mark Completed
            </button>
            <button onClick={handleCancel} className="text-[13px] font-[600] underline text-error">
              Cancel
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] font-[600] text-BlackHomz mt-2">History</h3>
          {history.map((inspection) => (
            <div
              key={inspection._id}
              className="flex items-center justify-between border rounded-md px-4 py-3 text-[14px]"
            >
              <div>
                <p className="font-[500] text-BlackHomz">
                  {moment(inspection.inspectionDate).format("DD MMM YYYY")} at {inspection.inspectionTime}
                </p>
                {inspection.notes && <p className="text-[13px] text-GrayHomz2">{inspection.notes}</p>}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[12px] font-[600] capitalize ${
                  statusStyles[inspection.status] || "bg-[#F2F4F7] text-GrayHomz2"
                }`}
              >
                {inspection.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <CustomizedModal isOpen={showForm} onRequestClose={closeForm}>
          <div className="bg-white rounded-md w-full max-w-[480px] p-6">
            <h2 className="text-[18px] font-[700] text-BlackHomz mb-4">
              {isReschedule ? "Reschedule Inspection" : "Schedule Inspection"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500]">
                  Inspection Date <span className="text-error">*</span>
                </label>
                <div className="relative w-full rounded-md border">
                  <DatePicker
                    selected={inspectionDate}
                    onChange={(date) => {
                      setInspectionDate(date);
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
                  Inspection Time <span className="text-error">*</span>
                </label>
                <input
                  type="time"
                  value={inspectionTime}
                  onChange={(e) => {
                    setInspectionTime(e.target.value);
                    setError(null);
                  }}
                  className="w-full h-[41px] px-4 border rounded-md text-[14px]"
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
                  {submitting ? <LoadingFormII /> : isReschedule ? "Save Changes" : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </CustomizedModal>
      )}

      {showCompleteForm && (
        <CustomizedModal isOpen={showCompleteForm} onRequestClose={() => setShowCompleteForm(false)}>
          <div className="bg-white rounded-md w-full max-w-[480px] p-6">
            <h2 className="text-[18px] font-[700] text-BlackHomz mb-4">Mark Inspection Completed</h2>
            <form onSubmit={handleComplete} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-[500]">Notes (optional)</label>
                <textarea
                  className="px-4 py-2 border rounded-md w-full text-[14px] placeholder:text-GrayHomz2"
                  rows={3}
                  placeholder="Findings from the inspection"
                  value={completeNotes}
                  onChange={(e) => setCompleteNotes(e.target.value)}
                />
              </div>
              <p className="text-[12px] text-GrayHomz2">
                The next inspection will be automatically suggested 6 months from today.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCompleteForm(false)}
                  className="h-[44px] w-full border rounded-md text-[14px] font-[500]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[44px] w-full bg-BlueHomz text-white rounded-md text-[14px] font-[500] flex justify-center items-center"
                >
                  {submitting ? <LoadingFormII /> : "Confirm Completed"}
                </button>
              </div>
            </form>
          </div>
        </CustomizedModal>
      )}

      {confirm && (
        <ConfirmModal
          header={confirm.header}
          body={confirm.body}
          button="Okay"
          returnHome={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

export default InspectionPanel;