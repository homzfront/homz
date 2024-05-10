import api from "@/utils/api";

export const listingMe = async () => {
    try {
      const response = await api.get("/listingProperty/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  };