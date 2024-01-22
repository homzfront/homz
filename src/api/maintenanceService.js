import api from "@/utils/api";

export const maintenanceByTenant = async (data) => {
    try {
      const response = await api.post(`/maintenances`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error fetching estates:', error);
      throw error;
    }
  };

  export const maintenanceAllByTenant = async (id) => {
    try {
      const response = await api.post(`/maintenances/tenant/${id}`);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error fetching estates:', error);
      throw error;
    }
  };


