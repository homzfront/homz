"use client";
import React, { useEffect } from "react";
import moment from "moment";
import useInspectionTenant from "@/store/enterpriseStore/inspection";

const statusStyles = {
  scheduled: "bg-whiteblue text-BlueHomz",
  completed: "bg-[#ECFDF3] text-[#027A48]",
  cancelled: "bg-[#F2F4F7] text-GrayHomz2",
  rescheduled: "bg-whiteblue text-BlueHomz",
};

// READ-ONLY. Routine inspections are scheduled for the whole PROPERTY (from the property's own
// page, see estates/estateInfo/components/propertyInspectionPanel.js), so this tab only shows
// what is planned / was done at this tenant's property.
const InspectionPanel = ({ tenantId }) => {
  const { data, loading, fetchData, getScheduledInspection } = useInspectionTenant();
  const scheduled = getScheduledInspection();

  useEffect(() => {
    if (tenantId) fetchData(tenantId);
  }, [tenantId]);

  const history = (data || []).filter((inspection) => inspection.status !== "scheduled");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-[16px] font-[700] text-BlackHomz">Routine Inspection</h2>
        <p className="text-[13px] text-GrayHomz2 mt-1">
          Routine inspections are scheduled for the whole property. To schedule or change one, open the
          property's page.
        </p>
      </div>

      {loading && <p className="text-[14px] text-GrayHomz2">Loading...</p>}

      {!loading && !scheduled && history.length === 0 && (
        <p className="text-[14px] text-GrayHomz2">
          No routine inspection has been scheduled for this property yet.
        </p>
      )}

      {scheduled && (
        <div className="rounded-md px-4 py-3 bg-whiteblue text-BlueHomz text-[14px] font-[500]">
          Routine inspection scheduled for {moment(scheduled.inspectionDate).format("DD MMM YYYY")} at{" "}
          {scheduled.inspectionTime}
          {scheduled.reminderSent ? " — reminder sent" : ""}
        </div>
      )}

      {history.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-[14px] font-[600] text-BlackHomz mt-2">History</h3>
          {history.map((inspection) => (
            <div
              key={inspection._id}
              className="flex items-center justify-between gap-3 border rounded-md px-4 py-3 text-[14px]"
            >
              <div className="min-w-0">
                <p className="font-[500] text-BlackHomz">
                  {moment(inspection.inspectionDate).format("DD MMM YYYY")} at {inspection.inspectionTime}
                </p>
                {inspection.notes && <p className="text-[13px] text-GrayHomz2 break-words">{inspection.notes}</p>}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[12px] font-[600] capitalize shrink-0 ${
                  statusStyles[inspection.status] || "bg-[#F2F4F7] text-GrayHomz2"
                }`}
              >
                {inspection.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InspectionPanel;