import api from "@/utils/api";

// Matches backend routes/inspection.routes.ts mounted at /inspection.
//
// Inspections belong to a PROPERTY (estate), not a tenant: scheduling and listing go through
// the estate. Every action also returns `tenantsNotified` (how many tenants were emailed) so the
// UI can tell the manager exactly who was told.

export const createInspection = async (estateId, payload) => {
  try {
    const response = await api.post(`/inspection/estate/${estateId}`, payload);
    return {
      success: true,
      data: response?.data.data,
      tenantsNotified: response?.data.tenantsNotified,
    };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const getInspectionsByEstate = async (estateId) => {
  try {
    const response = await api.get(`/inspection/estate/${estateId}`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

// Read-only: the tenant profile shows the inspections of the tenant's property.
export const getInspectionsByTenant = async (tenantId) => {
  try {
    const response = await api.get(`/inspection/tenant/${tenantId}`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const getUpcomingInspections = async () => {
  try {
    const response = await api.get(`/inspection`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const getPropertiesWithoutScheduledInspection = async () => {
  try {
    const response = await api.get(`/inspection/unscheduled-properties`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const rescheduleInspection = async (id, payload) => {
  try {
    const response = await api.patch(`/inspection/${id}`, payload);
    return {
      success: true,
      data: response?.data.data,
      tenantsNotified: response?.data.tenantsNotified,
    };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const completeInspection = async (id, notes) => {
  try {
    const response = await api.patch(`/inspection/${id}/complete`, { notes });
    return {
      success: true,
      data: response?.data.data,
      tenantsNotified: response?.data.tenantsNotified,
    };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const cancelInspection = async (id, cancelReason) => {
  try {
    const response = await api.patch(`/inspection/${id}/cancel`, { cancelReason });
    return {
      success: true,
      data: response?.data.data,
      tenantsNotified: response?.data.tenantsNotified,
    };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};