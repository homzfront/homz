import api from "@/utils/api";


export const tenantNotificationReceive = async () => {
    try {
      const response = await api.get(`/notifications/tenant/receiver`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }
  };

  export const updateTenantNoti = async (id) => {
    try {
        const response = await api.get(`/notifications/tenant/${id}`);
        console.log(response);
        return response.data;
      } catch (error) {
        console.error("Error getting notifications:", error);
        throw error;
      }
    };
  
  