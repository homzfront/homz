import api from "@/utils/api";

export const chooseState = async () => {
    try {
      const response = await api.get(`/state`);
      console.log(response);
      return { success: true, data: response?.data };
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data };
    }
  }


  export const chooseArea = async (state) => {
    console.log(state)
    try {
      const response = await api.post(`/state/area`, {
        state: state,
      });
      console.log(response);
      return { success: true, data: response };
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data };
    }
  }