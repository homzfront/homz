import api from "@/utils/api";

// Matches backend routes/inspection.routes.ts mounted at /inspection

export const createInspection = async (tenantId, payload) => {
  try {
    const response = await api.post(`/inspection/${tenantId}`, payload);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

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
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const completeInspection = async (id, notes) => {
  try {
    const response = await api.patch(`/inspection/${id}/complete`, { notes });
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const cancelInspection = async (id, cancelReason) => {
  try {
    const response = await api.patch(`/inspection/${id}/cancel`, { cancelReason });
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};