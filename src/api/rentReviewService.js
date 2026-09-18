import api from "@/utils/api";

// Matches backend routes/rentReview.routes.ts mounted at /rentReview (see backend delivery notes)

export const createRentReview = async (tenantId, payload) => {
  try {
    const response = await api.post(`/rentReview/${tenantId}`, payload);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const getRentReviewsByTenant = async (tenantId) => {
  try {
    const response = await api.get(`/rentReview/tenant/${tenantId}`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const getUpcomingRentReviews = async () => {
  try {
    const response = await api.get(`/rentReview`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const updateRentReview = async (id, payload) => {
  try {
    const response = await api.patch(`/rentReview/${id}`, payload);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const cancelRentReview = async (id, cancelReason) => {
  try {
    const response = await api.patch(`/rentReview/${id}/cancel`, { cancelReason });
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};