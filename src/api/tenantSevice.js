import api from "@/utils/api";

export const fetchSpecificTenant = async (id) => {
    try {
      const response = await api.get(`/tenants/${id}`);
      return response.data
    } catch (error) {
      console.error('Error fetching estates:', error);
      throw error;
    }
  };

