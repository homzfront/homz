import api from "@/utils/api";


export const getDigestSettings = async () => {
  try {
    const response = await api.get(`/digest/settings`);
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};

export const updateDigestSettings = async (digestOptOut) => {
  try {
    const response = await api.patch(`/digest/settings`, { digestOptOut });
    return { success: true, data: response?.data.data };
  } catch (error) {
    return { success: false, error: error?.response?.data };
  }
};