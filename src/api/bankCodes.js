import api from "@/utils/api";

export const bankCodes= async () => {
    try {
      const response = await api.get(`/bank/codes`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error wallet:", error);
      throw error;
    }
  };