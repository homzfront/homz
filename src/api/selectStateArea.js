import api from "@/utils/api";

export const chooseState = async () => {
    try {
      const response = await api.get(`/state`);
      return { success: true, data: response?.data };
    } catch (error) {
      return { success: false, error: error?.response.data };
    }
  }


  export const chooseArea = async (state) => {
    try {
      const response = await api.post(`/state/area`, {
        state: state,
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error?.response.data };
    }
  }